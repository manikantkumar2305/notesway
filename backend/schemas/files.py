from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class FilePresignRequest(BaseModel):
    filename: str
    mimeType: str
    size: int


class FilePresignResponse(BaseModel):
    uploadUrl: str
    key: str
    fileId: str
    expiresIn: int


class FileCreateRequest(BaseModel):
    fileId: str
    title: str
    subject: str | None = None
    unit: str | None = None
    topic: str | None = None
    description: str | None = None
    keywords: list[str] = Field(default_factory=list)
    yearSemester: str | None = None
    fileSize: int
    mimeType: str
    key: str


class FileUpdateRequest(BaseModel):
    title: str | None = None
    subject: str | None = None
    unit: str | None = None
    topic: str | None = None
    description: str | None = None
    keywords: list[str] | None = None
    yearSemester: str | None = None
    isPublic: bool | None = None


class FileOut(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    title: str
    subject: str | None
    unit: str | None
    topic: str | None
    description: str | None
    keywords: list[str]
    key: str
    uploaderRole: str
    uploaderName: str
    uploaderId: str
    collegeId: str
    yearSemester: str | None
    s3Url: str | None
    downloadUrl: str | None
    fileSize: int
    mimeType: str
    downloadCount: int
    sharedWith: list[str]
    isPublic: bool
    isDeleted: bool
    createdAt: datetime
    updatedAt: datetime


class FileListResponse(BaseModel):
    files: list[FileOut]
    total: int
