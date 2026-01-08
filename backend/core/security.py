from fastapi import HTTPException, status
import hashlib
import secrets
from passlib.hash import bcrypt


def http_error(
    status_code: int,
    message: str,
    code: str = "error",
    details: dict | None = None,
) -> HTTPException:
    """Construct a structured HTTPException payload."""

    return HTTPException(
        status_code=status_code,
        detail={"code": code, "message": message, "details": details},
    )


def unauthorized(message: str = "Unauthorized") -> HTTPException:
    """Return a 401 error."""
    return http_error(status.HTTP_401_UNAUTHORIZED, message, code="unauthorized")


def forbidden(message: str = "Forbidden") -> HTTPException:
    """Return a 403 error."""
    return http_error(status.HTTP_403_FORBIDDEN, message, code="forbidden")


def not_found(message: str = "Not found") -> HTTPException:
    """Return a 404 error."""
    return http_error(status.HTTP_404_NOT_FOUND, message, code="not_found")


def bad_request(message: str = "Bad request", details: dict | None = None) -> HTTPException:
    """Return a 400 error."""
    return http_error(
        status.HTTP_400_BAD_REQUEST,
        message,
        code="bad_request",
        details=details,
    )


# ----------------------------------------------------------------------
# PASSWORD / TOKEN HELPERS (ADDED — REQUIRED BY FORGOT / RESET FLOW)
# ----------------------------------------------------------------------

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return bcrypt.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against a bcrypt hash."""
    return bcrypt.verify(password, hashed)


def hash_str(value: str) -> str:
    """SHA-256 hash for OTPs and reset tokens."""
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def generate_reset_token() -> str:
    """Generate a cryptographically secure reset token."""
    return secrets.token_urlsafe(48)


# ----------------------------------------------------------------------
# FORGOT / RESET PASSWORD ERRORS
# ----------------------------------------------------------------------

def invalid_or_expired_code() -> HTTPException:
    return http_error(
        status.HTTP_400_BAD_REQUEST,
        message="Invalid or expired reset code",
        code="invalid_reset_code",
    )


def invalid_or_expired_token() -> HTTPException:
    return http_error(
        status.HTTP_400_BAD_REQUEST,
        message="Invalid or expired reset token",
        code="invalid_reset_token",
    )


def too_many_attempts() -> HTTPException:
    return http_error(
        status.HTTP_429_TOO_MANY_REQUESTS,
        message="Too many attempts. Please try again later.",
        code="too_many_attempts",
    )

