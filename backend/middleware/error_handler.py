import logging
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("sharevault.api")


async def http_error_handler(request: Request, exc: StarletteHTTPException):
    payload = exc.detail if isinstance(exc.detail, dict) else {"code": "error", "message": str(exc.detail)}
    logger.error("HTTP error", extra={"path": request.url.path, "method": request.method, "status": exc.status_code, "detail": payload})
    return JSONResponse(status_code=exc.status_code, content=payload)


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning("Validation error", extra={"path": request.url.path, "errors": exc.errors()})
    return JSONResponse(
        status_code=422,
        content={"code": "validation_error", "message": "Validation failed", "details": exc.errors()},
    )
