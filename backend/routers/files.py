from bson import ObjectId
from fastapi import APIRouter, Depends, Path, Query, status, HTTPException

from auth.dependencies import get_current_user
from core import rbac, security
from database import get_db
from schemas.files import (
    FileCreateRequest,
    FileListResponse,
    FileOut,
    FilePresignRequest,
    FilePresignResponse,
    FileUpdateRequest,
)
from services import file_service, s3_utils

router = APIRouter(prefix="/api/files", tags=["files"])

UPLOAD_ROLES = {
    rbac.Role.ADMIN,
    rbac.Role.PROFESSOR,
    rbac.Role.STUDENT,
}


def _serialize(file_doc):
    return FileOut(
        **{
            **file_doc,
            "_id": str(file_doc["_id"]),
            "uploaderId": str(file_doc["uploaderId"]),
        }
    )


# =========================
# PRESIGN UPLOAD
# =========================

@router.post("/presign", response_model=FilePresignResponse)
async def presign_upload(
    payload: FilePresignRequest,
    current_user=Depends(get_current_user),
):
    if current_user["role"] not in UPLOAD_ROLES:
        raise security.forbidden("Not authorized to upload files")

    result = s3_utils.presign_put(
        college_id=current_user["collegeId"],
        filename=payload.filename,
        mime_type=payload.mimeType,
        size=payload.size,
    )

    return FilePresignResponse(
        uploadUrl=result["uploadUrl"],
        key=result["key"],
        fileId=result["key"].split("/")[1],
        expiresIn=result["expiresIn"],
    )


# =========================
# CREATE FILE RECORD
# =========================

@router.post("", response_model=FileOut, status_code=status.HTTP_201_CREATED)
async def create_file(
    payload: FileCreateRequest,
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    if current_user["role"] not in UPLOAD_ROLES:
        raise security.forbidden("Not authorized to upload files")

    if payload.key.split("/")[0] != current_user["collegeId"]:
        raise security.forbidden("Invalid college scope for file")

    s3_utils.validate_upload_metadata(
        key=payload.key,
        mime_type=payload.mimeType,
        size=payload.fileSize,
    )

    file_doc = await file_service.create_file_record(
        db,
        user=current_user,
        payload=payload.model_dump(),
    )

    return _serialize(file_doc)


# =========================
# LIST FILES
# =========================

@router.get("", response_model=FileListResponse)
async def list_files(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    files, total = await file_service.list_files(
        db,
        college_id=current_user["collegeId"],
        skip=skip,
        limit=limit,
    )

    return FileListResponse(
        files=[_serialize(f) for f in files],
        total=total,
    )


# =========================
# SEARCH FILES (SAFE + FIXED)
# =========================

@router.get("/search", response_model=FileListResponse)
async def search_files(
    q: str | None = Query(default=None),
    subject: str | None = Query(default=None),
    uploader: str | None = Query(default=None),
    limit: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    """
    Supports searching by:
    - title
    - description
    - keywords
    - uploader name
    - uploader email
    - uploader id
    """

    try:
        files, total = await file_service.search_files(
            db,
            college_id=current_user["collegeId"],
            q=q,
            subject=subject,
            uploader=uploader,
            limit=limit,
        )

        return FileListResponse(
            files=[_serialize(f) for f in files],
            total=total,
        )

    except Exception as e:
        # 🔥 THIS PREVENTS 503
        print("SEARCH ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail="Search failed"
        )


# =========================
# GET FILE
# =========================

@router.get("/{file_id}", response_model=FileOut)
async def get_file(
    file_id: str = Path(...),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    file_doc = await file_service.get_file(
        db,
        file_id,
        college_id=current_user["collegeId"],
    )
    if not file_doc:
        raise security.not_found("File not found")

    return _serialize(file_doc)


# =========================
# DOWNLOAD FILE
# =========================

@router.get("/{file_id}/download")
async def download_file(
    file_id: str = Path(...),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    file_doc = await file_service.get_file(
        db,
        file_id,
        college_id=current_user["collegeId"],
    )
    if not file_doc:
        raise security.not_found("File not found")

    url = s3_utils.presign_get(file_doc["key"])
    await file_service.increment_download(db, file_id)

    return {
        "url": url,
        "expiresIn": s3_utils.PRESIGN_EXPIRY_SECONDS,
    }


# =========================
# UPDATE FILE
# =========================

@router.put("/{file_id}", response_model=FileOut)
async def update_file(
    payload: FileUpdateRequest,
    file_id: str = Path(...),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    file_doc = await file_service.get_file(
        db,
        file_id,
        college_id=current_user["collegeId"],
    )
    if not file_doc:
        raise security.not_found("File not found")

    if (
        current_user["role"] not in [rbac.Role.ADMIN, rbac.Role.PROFESSOR]
        and str(file_doc["uploaderId"]) != str(current_user["_id"])
    ):
        raise security.forbidden("Only owner or admin can update")

    updated = await file_service.update_file(
        db,
        file_id,
        college_id=current_user["collegeId"],
        updates=payload.model_dump(exclude_none=True),
    )

    return _serialize(updated)


# =========================
# DELETE FILE
# =========================

@router.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_file(
    file_id: str = Path(...),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    file_doc = await file_service.get_file(
        db,
        file_id,
        college_id=current_user["collegeId"],
    )
    if not file_doc:
        raise security.not_found("File not found")

    if (
        current_user["role"] not in [rbac.Role.ADMIN, rbac.Role.PROFESSOR]
        and str(file_doc["uploaderId"]) != str(current_user["_id"])
    ):
        raise security.forbidden("Only owner or admin can delete")

    await file_service.soft_delete(
        db,
        file_id,
        college_id=current_user["collegeId"],
    )

    return

