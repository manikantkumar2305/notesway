from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class CollegeInDB(BaseModel):
    """College document stored in MongoDB."""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    code: str
    name: str
    location: str | None = None
    website: str | None = None
    adminEmail: str | None = None
    phoneNumber: str | None = None
    registrationCodes: list[str] = Field(default_factory=list)
    createdAt: datetime
    updatedAt: datetime
