import logging
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from core.config import get_settings
from database import close_mongo, connect_to_mongo
from middleware import cors, error_handler
from routers import admin, colleges, files, professor_requests, users
from auth import routes as auth_routes

settings = get_settings()
logging.basicConfig(level=getattr(logging, settings.log_level.upper(), logging.INFO))

app = FastAPI(title=settings.app_name, version="1.0.0")

# Middlewares
cors.add_cors(app)

# Exception handlers
app.add_exception_handler(StarletteHTTPException, error_handler.http_error_handler)
app.add_exception_handler(RequestValidationError, error_handler.validation_exception_handler)

# Routers
app.include_router(auth_routes.router)
app.include_router(users.router)
app.include_router(files.router)
app.include_router(professor_requests.router)
app.include_router(admin.router)
app.include_router(colleges.router)


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo()


@app.get("/health")
async def health():
    return {"status": "ok"}
