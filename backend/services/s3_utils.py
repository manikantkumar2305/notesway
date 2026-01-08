from pathlib import Path
from typing import Any
from uuid import uuid4
import mimetypes

import boto3
from botocore.client import Config

from core.config import get_settings
from core import security

settings = get_settings()

# =========================
# CONFIGURATION
# =========================

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
PRESIGN_EXPIRY_SECONDS = 3600  # 1 hour

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".pptx"}
ALLOWED_MIME_TYPES = {
    ".pdf": {"application/pdf"},
    ".docx": {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    ".pptx": {
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    },
}

# =========================
# S3 CLIENT
# =========================

def _client():
    return boto3.client(
        service_name="s3",
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=settings.aws_s3_region,
        config=Config(s3={"addressing_style": "virtual"}),
    )

# =========================
# HELPERS
# =========================

def generate_upload_key(college_id: str, file_id: str, filename: str) -> str:
    return f"{college_id}/{file_id}/original/{filename}"

# =========================
# VALIDATION
# =========================

def validate_upload_metadata(*, key: str, mime_type: str, size: int) -> None:
    if size <= 0 or size > MAX_FILE_SIZE_BYTES:
        raise security.bad_request("Only files up to 10MB are allowed")

    extension = Path(key).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise security.bad_request("Only pdf, docx, pptx allowed")

    allowed_mimes = ALLOWED_MIME_TYPES.get(extension, set())
    if mime_type not in allowed_mimes:
        raise security.bad_request("Invalid MIME type")

    guessed_type, _ = mimetypes.guess_type(key)
    if guessed_type and guessed_type != mime_type:
        raise security.bad_request("MIME type mismatch")

# =========================
# PRESIGN UPLOAD
# =========================

def presign_put(
    *,
    college_id: str,
    filename: str,
    mime_type: str,
    size: int,
) -> dict[str, Any]:

    file_id = uuid4().hex
    key = generate_upload_key(college_id, file_id, filename)

    validate_upload_metadata(
        key=key,
        mime_type=mime_type,
        size=size,
    )

    content_type = mime_type.strip().lower()

    client = _client()
    url = client.generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": settings.aws_s3_bucket,
            "Key": key,
            "ContentType": content_type,
        },
        ExpiresIn=PRESIGN_EXPIRY_SECONDS,
    )

    return {
        "uploadUrl": url,
        "key": key,
        "expiresIn": PRESIGN_EXPIRY_SECONDS,
    }

# =========================
# PRESIGN DOWNLOAD (FINAL FIX)
# =========================

def presign_get(key: str) -> str:
    client = _client()

    filename = Path(key).name
    extension = Path(key).suffix.lower()
    mime_type = next(
        iter(ALLOWED_MIME_TYPES.get(extension, {"application/octet-stream"}))
    )

    return client.generate_presigned_url(
        ClientMethod="get_object",
        Params={
            "Bucket": settings.aws_s3_bucket,
            "Key": key,
            "ResponseContentType": mime_type,
            # 🔒 FORCE DOWNLOAD FOR ALL FILE TYPES
            "ResponseContentDisposition": f'attachment; filename="{filename}"',
        },
        ExpiresIn=PRESIGN_EXPIRY_SECONDS,
    )

# ======================================
# MOVE OBJECT
# ======================================

def move_object(old_key: str, new_key: str) -> None:
    client = _client()

    # Copy object
    client.copy_object(
        Bucket=settings.aws_s3_bucket,
        CopySource={
            "Bucket": settings.aws_s3_bucket,
            "Key": old_key,
        },
        Key=new_key,
    )

    # Delete original
    client.delete_object(
        Bucket=settings.aws_s3_bucket,
        Key=old_key,
    )

