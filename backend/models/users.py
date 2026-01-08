from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, EmailStr


class UserInDB(BaseModel):
    """User document stored in MongoDB."""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    name: str
    email: EmailStr
    password: str
    role: str = Field(default="student")
    collegeId: str
    photo: str | None = None

    isActive: bool = Field(default=True)
    tokenVersion: int = Field(default=0)
    createdAt: datetime
    updatedAt: datetime
    lastLogin: datetime | None = None


class UserPublic(BaseModel):
    """Public representation of a user."""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    name: str
    email: EmailStr
    role: str
    collegeId: str
    photo: str | None = None
    isActive: bool
    createdAt: datetime
    updatedAt: datetime

