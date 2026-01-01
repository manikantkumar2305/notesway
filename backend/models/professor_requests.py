from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProfessorRequestInDB(BaseModel):
    """Professor access request document."""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    userId: str
    email: str
    name: str
    collegeId: str
    status: str = Field(default="pending")
    requestedAt: datetime
    reviewedAt: datetime | None = None
    reviewedBy: str | None = None
    reviewComments: str | None = None
