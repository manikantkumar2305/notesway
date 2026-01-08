from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class CollegeCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    code: str
    name: str
    location: str | None = None
    website: str | None = None
    adminEmail: str | None = None
    phoneNumber: str | None = None
    registrationCodes: list[str] = Field(default_factory=list)


class CollegeOut(CollegeCreate):
    id: str | None = Field(default=None, alias="_id")
    createdAt: datetime
    updatedAt: datetime
