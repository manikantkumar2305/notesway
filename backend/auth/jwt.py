from datetime import datetime, timedelta, timezone
from uuid import uuid4
import jwt
from fastapi import HTTPException, status

from core.config import get_settings

settings = get_settings()


def _create_token(data: dict, expires_delta: timedelta, token_type: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        **data,
        "type": token_type,
        "iat": int(now.timestamp()),
        "exp": int((now + expires_delta).timestamp()),
        "jti": str(uuid4()),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.algorithm)


def create_access_token(user: dict) -> str:
    return _create_token(
        {
            "sub": str(user["_id"]),
            "role": user["role"],
            "collegeId": user["collegeId"],
            "token_version": user.get("tokenVersion", 0),
        },
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
        token_type="access",
    )


def create_refresh_token(user: dict) -> str:
    return _create_token(
        {
            "sub": str(user["_id"]),
            "role": user["role"],
            "collegeId": user["collegeId"],
            "token_version": user.get("tokenVersion", 0),
        },
        expires_delta=timedelta(days=settings.refresh_token_expire_days),
        token_type="refresh",
    )


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[settings.algorithm])
    except jwt.ExpiredSignatureError as exc:  # pragma: no cover - runtime path
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": "token_expired", "message": "Token expired"}) from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": "token_invalid", "message": "Invalid token"}) from exc
