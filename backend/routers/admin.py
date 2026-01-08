from fastapi import APIRouter, Depends, Path

from auth.dependencies import get_current_user
from core import rbac, security
from database import get_db
from schemas.users import UserListResponse, UserOut
from services import file_service, user_service

router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])


def _serialize_user(user: dict) -> UserOut:
    return UserOut(
        _id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        role=user["role"],
        collegeId=user["collegeId"],
        photo=user.get("photo"),
        isActive=user.get("isActive", True),
        createdAt=user["createdAt"],
        updatedAt=user["updatedAt"],
    )


@router.get("/stats")
async def stats(current_user=Depends(get_current_user), db=Depends(get_db)):
    college_id = current_user["collegeId"]
    user_count = await db.get_collection("users").count_documents({"collegeId": college_id})
    file_count = await db.get_collection("files").count_documents({"collegeId": college_id, "isDeleted": False})
    storage = await file_service.storage_stats(db, college_id)
    return {
        "totalUsers": user_count,
        "totalFiles": file_count,
        "storageUsageBytes": storage.get("totalSize", 0),
    }


@router.get("/users", response_model=UserListResponse)
async def admin_users(current_user=Depends(get_current_user), db=Depends(get_db)):
    users, total = await user_service.list_users(db, current_user["collegeId"], skip=0, limit=200)
    return UserListResponse(users=[_serialize_user(u) for u in users], total=total)


@router.post("/users/{user_id}/promote", response_model=UserOut)
async def promote_user(user_id: str = Path(...), current_user=Depends(get_current_user), db=Depends(get_db)):
    user = await user_service.get_by_id(db, user_id)
    if not user:
        raise security.not_found("User not found")
    rbac.ensure_same_college(current_user, user["collegeId"])
    updated = await user_service.update_profile(db, user_id, {"role": rbac.Role.ADMIN})
    return _serialize_user(updated)


@router.get("/storage")
async def storage(current_user=Depends(get_current_user), db=Depends(get_db)):
    stats = await file_service.storage_stats(db, current_user["collegeId"])
    return {"totalSize": stats["totalSize"], "fileCount": stats["fileCount"]}
