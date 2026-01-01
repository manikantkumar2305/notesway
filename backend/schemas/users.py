from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    name: str
    email: EmailStr
    role: str = Field(default="student")
    collegeId: str
    photo: str | None = None


class UserOut(UserBase):
    id: str | None = Field(default=None, alias="_id")
    isActive: bool
    createdAt: datetime
    updatedAt: datetime


class UserListResponse(BaseModel):
    users: list[UserOut]
    total: int


class UserUpdateRequest(BaseModel):
    name: str | None = None
    photo: str | None = None


class AvatarPresignRequest(BaseModel):
    filename: str
    mimeType: str
    size: int


class AvatarPresignResponse(BaseModel):
    uploadUrl: str
    key: str
    expiresIn: int
