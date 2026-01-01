from typing import Iterable
from fastapi import Depends
from starlette import status

from auth.dependencies import get_current_user
from core import security


class Role:
    ADMIN = "admin"
    PROFESSOR = "professor"
    STUDENT = "student"


def require_role(roles: str | Iterable[str]):
    """Dependency to enforce role-based access control."""

    allowed = {roles} if isinstance(roles, str) else set(roles)

    async def _checker(user=Depends(get_current_user)):
        if user["role"] not in allowed:
            raise security.http_error(
                status_code=status.HTTP_403_FORBIDDEN,
                message="Insufficient role",
                code="forbidden",
            )
        return user

    return _checker


def ensure_same_college(user: dict, college_id: str):
    """Raise if user is trying to access another college's data."""

    if user.get("collegeId") != college_id:
        raise security.forbidden("Cross-college access denied")
