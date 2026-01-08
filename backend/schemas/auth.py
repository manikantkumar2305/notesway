from pydantic import BaseModel, EmailStr, Field

from schemas.colleges import CollegeOut
from schemas.users import UserOut


class RegisterCollegeRequest(BaseModel):
    collegeCode: str = Field(alias="collegeCode")
    collegeName: str
    adminName: str
    adminEmail: EmailStr
    password: str
    location: str | None = None
    website: str | None = None


class RegisterUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    collegeCode: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = Field(default="bearer")


class AuthResponse(BaseModel):
    token: TokenResponse
    user: UserOut
    college: CollegeOut | None = None


class RefreshRequest(BaseModel):
    refresh_token: str


class LogoutResponse(BaseModel):
    success: bool


class MeResponse(BaseModel):
    user: UserOut


# ----------------------------------------------------------------------
# FORGOT / RESET PASSWORD SCHEMAS (ADDED — NO EXISTING CHANGES)
# ----------------------------------------------------------------------

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyOtpRequest(BaseModel):
    email: EmailStr
    otp: str = Field(
        min_length=4,
        max_length=4,
        description="4-digit reset code sent to email",
    )


class VerifyOtpResponse(BaseModel):
    reset_token: str


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str


class GenericMessageResponse(BaseModel):
    message: str

