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
