from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProfessorRequestCreate(BaseModel):
    message: str | None = None


class ProfessorRequestOut(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    userId: str
    email: str
    name: str
    collegeId: str
    status: str
    requestedAt: datetime
    reviewedAt: datetime | None = None
    reviewedBy: str | None = None
    reviewComments: str | None = None


class ProfessorRequestList(BaseModel):
    requests: list[ProfessorRequestOut]
    total: int
