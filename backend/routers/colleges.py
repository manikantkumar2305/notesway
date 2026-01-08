from fastapi import APIRouter, Depends, Path

from database import get_db
from schemas.colleges import CollegeOut
from services import college_service
from core import security

router = APIRouter(prefix="/api/colleges", tags=["colleges"])


def _serialize(college: dict) -> CollegeOut:
    return CollegeOut(**{**college, "_id": str(college["_id"])})


@router.get("/{code}", response_model=CollegeOut)
async def get_college(code: str = Path(...), db=Depends(get_db)):
    college = await college_service.get_by_code(db, code)
    if not college:
        raise security.not_found("College not found")
    return _serialize(college)
