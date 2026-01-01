import mimetypes
from pathlib import Path
from typing import Any

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
    ".docx": {"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    ".pptx": {"application/vnd.openxmlformats-officedocument.presentationml.presentation"},
}

# =========================
# S3 CLIENT
# =========================

def _client():
    """
    Create and return an S3 client.
    Supports AWS S3 and S3-compatible services (MinIO / LocalStack).
    """
    kwargs = {
        "service_name": "s3",
        "aws_access_key_id": settings.aws_access_key_id,
        "aws_secret_access_key": settings.aws_secret_access_key,
        "region_name": settings.aws_s3_region,
        "config": Config(s3={"addressing_style": "virtual"}),
    }

    if settings.aws_s3_endpoint:
        kwargs["endpoint_url"] = settings.aws_s3_endpoint

    return boto3.client(**kwargs)

# =========================
# UPLOAD HELPERS
# =========================

def generate_upload_key(college_id: str, file_id: str, filename: str) -> str:
    """
    Generate a consistent S3 key for uploaded files.
    """
    return f"{college_id}/{file_id}/original/{filename}"


def presign_put(key: str, mime_type: str, size: int) -> dict[str, Any]:
    """
    Generate a presigned URL for uploading a file directly to S3.
    """
    validate_upload_metadata(key=key, mime_type=mime_type, size=size)

    client = _client()
    url = client.generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": settings.aws_s3_bucket,
            "Key": key,
            "ContentType": mime_type,
        },
        ExpiresIn=PRESIGN_EXPIRY_SECONDS,
    )

    return {
        "uploadUrl": url,
        "key": key,
        "expiresIn": PRESIGN_EXPIRY_SECONDS,
    }

# =========================
# DOWNLOAD HELPERS
# =========================

def presign_get(key: str) -> str:
    """
    Generate a presigned URL for downloading a file from S3.
    """
    client = _client()
    return client.generate_presigned_url(
        ClientMethod="get_object",
        Params={
            "Bucket": settings.aws_s3_bucket,
            "Key": key,
        },
        ExpiresIn=PRESIGN_EXPIRY_SECONDS,
    )

# =========================
# DELETE / MOVE HELPERS
# =========================

def move_object(old_key: str, new_key: str) -> None:
    """
    Move an object inside the same S3 bucket.
    Used for soft delete (move to `deleted/` prefix).
    """
    client = _client()

    # Copy object to new key
    client.copy_object(
        Bucket=settings.aws_s3_bucket,
        CopySource={
            "Bucket": settings.aws_s3_bucket,
            "Key": old_key,
        },
        Key=new_key,
    )

    # Delete original object
    client.delete_object(
        Bucket=settings.aws_s3_bucket,
        Key=old_key,
    )


def delete_object(key: str) -> None:
    """
    Permanently delete an object from S3.
    Use ONLY for admin or hard delete.
    """
    client = _client()
    client.delete_object(
        Bucket=settings.aws_s3_bucket,
        Key=key,
    )

# =========================
# VALIDATION
# =========================

def validate_upload_metadata(*, key: str, mime_type: str, size: int) -> None:
    """
    Validate file size, extension, and MIME type
    before issuing presigned URLs.
    """

    if size <= 0 or size > MAX_FILE_SIZE_BYTES:
        raise security.bad_request("Only files up to 10MB are allowed")

    extension = Path(key).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise security.bad_request("Only pdf, docx, and pptx files are allowed")

    allowed_mimes = ALLOWED_MIME_TYPES.get(extension, set())
    if mime_type not in allowed_mimes:
        raise security.bad_request("Invalid MIME type for the given file extension")

    guessed_type, _ = mimetypes.guess_type(key)
    if guessed_type and guessed_type != mime_type:
        raise security.bad_request("MIME type mismatch")
