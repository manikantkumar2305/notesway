from fastapi import APIRouter, Depends, Path, Query, status

from auth.dependencies import get_current_user
from core import rbac, security
from database import get_db
from schemas.users import AvatarPresignRequest, AvatarPresignResponse, UserListResponse, UserOut, UserUpdateRequest
from services import s3_utils, user_service

router = APIRouter(prefix="/api/users", tags=["users"])


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


@router.get("/me", response_model=UserOut)
async def get_me(current_user=Depends(get_current_user)):
    return _serialize_user(current_user)


@router.put("/me", response_model=UserOut)
async def update_me(payload: UserUpdateRequest, current_user=Depends(get_current_user), db=Depends(get_db)):
    # Allow explicit nulls (e.g., remove photo). Do not drop None values.
    update_data = payload.model_dump(exclude_unset=True, exclude_none=False)
    updated = await user_service.update_profile(db, str(current_user["_id"]), data=update_data)
    return _serialize_user(updated)


@router.post("/avatar/presign", response_model=AvatarPresignResponse)
async def presign_avatar(payload: AvatarPresignRequest, current_user=Depends(get_current_user)):
    key = f"avatars/{current_user['collegeId']}/{current_user['_id']}/{payload.filename}"
    result = s3_utils.presign_put(key, payload.mimeType, payload.size)
    return AvatarPresignResponse(**result)


@router.get("/faculty", response_model=UserListResponse)
async def list_faculty(current_user=Depends(get_current_user), db=Depends(get_db)):
    """Return admins and professors in the same college as the current user."""
    users, _ = await user_service.list_users(db, current_user["collegeId"], skip=0, limit=200)
    faculty = [u for u in users if u.get("role") in (rbac.Role.ADMIN, rbac.Role.PROFESSOR)]
    return UserListResponse(users=[_serialize_user(u) for u in faculty], total=len(faculty))


@router.get("/college", response_model=UserListResponse)
async def list_college_users(current_user=Depends(get_current_user), db=Depends(get_db)):
    """Return all users in the current user's college (role-scoped listing)."""
    users, total = await user_service.list_users(db, current_user["collegeId"], skip=0, limit=500)
    return UserListResponse(users=[_serialize_user(u) for u in users], total=total)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str = Path(...), current_user=Depends(get_current_user), db=Depends(get_db)):
    target = await user_service.get_by_id(db, user_id)
    if not target:
        raise security.not_found("User not found")
    # Ensure same college
    if target.get("collegeId") != current_user["collegeId"]:
        raise security.forbidden("Cannot delete users from another college")

    # Prevent deleting your own account
    if str(current_user["_id"]) == str(user_id):
        raise security.forbidden("You cannot delete your own account")

    # Admin can delete anyone; professor can delete students only
    if current_user["role"] == rbac.Role.PROFESSOR and target.get("role") != rbac.Role.STUDENT:
        raise security.forbidden("Professors can delete students only")
    if current_user["role"] not in (rbac.Role.ADMIN, rbac.Role.PROFESSOR):
        raise security.forbidden("Not authorized to delete users")

    await user_service.delete_user(db, user_id)
    return


@router.get("/{user_id}", response_model=UserOut, dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])
async def get_user_by_id(user_id: str = Path(...), current_user=Depends(get_current_user), db=Depends(get_db)):
    user = await user_service.get_by_id(db, user_id)
    if not user:
        raise security.not_found("User not found")
    rbac.ensure_same_college(current_user, user["collegeId"])
    return _serialize_user(user)


@router.get("", response_model=UserListResponse, dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    users, total = await user_service.list_users(db, current_user["collegeId"], skip=skip, limit=limit)
    return UserListResponse(users=[_serialize_user(u) for u in users], total=total)
