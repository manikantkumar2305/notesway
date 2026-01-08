from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class FileInDB(BaseModel):
    """File metadata stored in MongoDB."""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    title: str
    key: str
    subject: str | None = None
    unit: str | None = None
    topic: str | None = None
    description: str | None = None
    keywords: list[str] = Field(default_factory=list)
    uploaderRole: str
    uploaderName: str
    uploaderId: str
    collegeId: str
    yearSemester: str | None = None
    s3Url: str | None = None
    downloadUrl: str | None = None
    fileSize: int
    mimeType: str
    downloadCount: int = Field(default=0)
    sharedWith: list[str] = Field(default_factory=list)
    isPublic: bool = Field(default=False)
    isDeleted: bool = Field(default=False)
    createdAt: datetime
    updatedAt: datetime
