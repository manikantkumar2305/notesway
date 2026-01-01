from fastapi import HTTPException, status


def http_error(status_code: int, message: str, code: str = "error", details: dict | None = None) -> HTTPException:
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

    return http_error(status.HTTP_400_BAD_REQUEST, message, code="bad_request", details=details)
