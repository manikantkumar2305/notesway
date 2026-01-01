from bson import ObjectId
from fastapi import Depends, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from starlette import status

from auth.jwt import decode_token
from core import security
from database import get_db


bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Security(bearer_scheme),
    db=Depends(get_db),
):
    """Resolve the current user from the Authorization header."""

    if credentials is None:
        raise security.http_error(status.HTTP_401_UNAUTHORIZED, "Missing credentials", code="unauthorized")

    payload = decode_token(credentials.credentials)
    if payload.get("type") != "access":
        raise security.http_error(status.HTTP_401_UNAUTHORIZED, "Invalid access token", code="unauthorized")

    user_id = payload.get("sub")
    user = await db.get_collection("users").find_one({"_id": ObjectId(user_id)})
    if not user or not user.get("isActive", True):
        raise security.http_error(status.HTTP_401_UNAUTHORIZED, "User not active", code="unauthorized")

    if user.get("tokenVersion", 0) != payload.get("token_version", 0):
        raise security.http_error(status.HTTP_401_UNAUTHORIZED, "Token revoked", code="unauthorized")

    return user
