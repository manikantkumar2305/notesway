from fastapi import APIRouter, Depends, status

from auth import hashing, jwt
from auth.dependencies import get_current_user
from core import security
from database import get_db
from schemas import auth as auth_schema
from schemas.users import UserOut
from schemas.colleges import CollegeOut
from services import user_service, college_service
from utils import time_utils

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ---------------- SERIALIZERS ---------------- #

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


def _serialize_college(college: dict | None) -> CollegeOut | None:
    if not college:
        return None
    return CollegeOut(
        _id=str(college["_id"]),
        code=college["code"],
        name=college["name"],
        location=college.get("location"),
        website=college.get("website"),
        adminEmail=college.get("adminEmail"),
        phoneNumber=college.get("phoneNumber"),
        registrationCodes=college.get("registrationCodes", []),
        createdAt=college["createdAt"],
        updatedAt=college["updatedAt"],
    )


def _tokens(user: dict) -> auth_schema.TokenResponse:
    access = jwt.create_access_token(user)
    refresh = jwt.create_refresh_token(user)
    return auth_schema.TokenResponse(
        access_token=access,
        refresh_token=refresh,
    )


# ---------------- REGISTER COLLEGE ---------------- #

@router.post(
    "/register-college",
    response_model=auth_schema.AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register_college(
    payload: auth_schema.RegisterCollegeRequest,
    db=Depends(get_db),
):
    existing = await college_service.get_by_code(db, payload.collegeCode)
    if existing:
        raise security.bad_request("College code already exists")

    college = await college_service.create_college(
        db,
        code=payload.collegeCode,
        name=payload.collegeName,
        location=payload.location,
        website=payload.website,
        admin_email=payload.adminEmail,
    )

    user = await user_service.create_user(
        db,
        name=payload.adminName,
        email=payload.adminEmail,
        password=payload.password,
        role="admin",
        college_id=str(college["_id"]),
    )

    token = _tokens(user)

    return auth_schema.AuthResponse(
        token=token,
        user=_serialize_user(user),
        college=_serialize_college(college),
    )


# ---------------- REGISTER STUDENT ---------------- #

@router.post(
    "/register",
    response_model=auth_schema.AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register_user(
    payload: auth_schema.RegisterUserRequest,
    db=Depends(get_db),
):
    college = await college_service.get_by_code(db, payload.collegeCode)
    if not college:
        raise security.bad_request("Invalid college code")

    if await user_service.get_by_email(db, payload.email):
        raise security.bad_request("User already exists")

    user = await user_service.create_user(
        db,
        name=payload.name,
        email=payload.email,
        password=payload.password,
        role="student",
        college_id=str(college["_id"]),
    )

    token = _tokens(user)

    return auth_schema.AuthResponse(
        token=token,
        user=_serialize_user(user),
        college=_serialize_college(college),
    )


# ---------------- LOGIN ---------------- #

@router.post("/login", response_model=auth_schema.AuthResponse)
async def login(payload: auth_schema.LoginRequest, db=Depends(get_db)):
    user = await user_service.get_by_email(db, payload.email)

    if not user or not hashing.verify_password(
        payload.password, user["password"]
    ):
        raise security.http_error(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid credentials",
        )

    await db.get_collection("users").update_one(
        {"_id": user["_id"]},
        {"$set": {"lastLogin": time_utils.now_utc()}},
    )

    token = _tokens(user)
    college = await college_service.get_by_id(db, user["collegeId"])

    return auth_schema.AuthResponse(
        token=token,
        user=_serialize_user(user),
        college=_serialize_college(college),
    )


# ---------------- REFRESH ---------------- #

@router.post("/refresh", response_model=auth_schema.TokenResponse)
async def refresh_tokens(
    payload: auth_schema.RefreshRequest,
    db=Depends(get_db),
):
    decoded = jwt.decode_token(payload.refresh_token)

    if decoded.get("type") != "refresh":
        raise security.http_error(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid refresh token",
        )

    user = await user_service.get_by_id(db, decoded.get("sub"))
    if not user or not user.get("isActive", True):
        raise security.http_error(
            status.HTTP_401_UNAUTHORIZED,
            "User not found or inactive",
        )

    if user.get("tokenVersion", 0) != decoded.get("token_version", 0):
        raise security.http_error(
            status.HTTP_401_UNAUTHORIZED,
            "Token revoked",
        )

    new_version = user.get("tokenVersion", 0) + 1
    await db.get_collection("users").update_one(
        {"_id": user["_id"]},
        {"$set": {"tokenVersion": new_version}},
    )

    user["tokenVersion"] = new_version
    return _tokens(user)


# ---------------- ME ---------------- #

@router.get("/me", response_model=auth_schema.MeResponse)
async def me(current_user=Depends(get_current_user)):
    return auth_schema.MeResponse(user=_serialize_user(current_user))


# ---------------- LOGOUT ---------------- #

@router.post("/logout", response_model=auth_schema.LogoutResponse)
async def logout(
    current_user=Depends(get_current_user),
    db=Depends(get_db),
):
    await user_service.increment_token_version(
        db, str(current_user["_id"])
    )
    return auth_schema.LogoutResponse(success=True)

