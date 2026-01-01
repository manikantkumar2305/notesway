from fastapi import APIRouter, Depends, Path, status

from auth.dependencies import get_current_user
from core import rbac, security
from database import get_db
from schemas.professor_requests import ProfessorRequestCreate, ProfessorRequestList, ProfessorRequestOut
from services import professor_request_service

router = APIRouter(prefix="/api/professor-requests", tags=["professor_requests"])


def _serialize(doc: dict) -> ProfessorRequestOut:
    return ProfessorRequestOut(
        **{
            **doc,
            "_id": str(doc["_id"]),
            "userId": str(doc.get("userId")),
            "reviewedBy": str(doc.get("reviewedBy")) if doc.get("reviewedBy") else None,
        }
    )


@router.post("", response_model=ProfessorRequestOut, status_code=status.HTTP_201_CREATED)
async def create_request(payload: ProfessorRequestCreate, current_user=Depends(get_current_user), db=Depends(get_db)):
    if current_user["role"] != rbac.Role.STUDENT:
        raise security.forbidden("Only students can request professor access")
    doc = await professor_request_service.create_request(db, user=current_user, message=payload.message)
    return _serialize(doc)


@router.get("", response_model=ProfessorRequestList, dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])
async def list_requests(current_user=Depends(get_current_user), db=Depends(get_db)):
    requests, total = await professor_request_service.list_requests(db, college_id=current_user["collegeId"], status_filter="pending")
    return ProfessorRequestList(requests=[_serialize(r) for r in requests], total=total)


@router.post("/{request_id}/approve", response_model=ProfessorRequestOut, dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])
async def approve_request(request_id: str = Path(...), current_user=Depends(get_current_user), db=Depends(get_db)):
    updated = await professor_request_service.update_status(db, request_id, status_value="approved", admin_user=current_user)
    if not updated:
        raise security.not_found("Request not found")
    return _serialize(updated)


@router.post("/{request_id}/reject", response_model=ProfessorRequestOut, dependencies=[Depends(rbac.require_role(rbac.Role.ADMIN))])
async def reject_request(request_id: str = Path(...), current_user=Depends(get_current_user), db=Depends(get_db)):
    updated = await professor_request_service.update_status(db, request_id, status_value="rejected", admin_user=current_user)
    if not updated:
        raise security.not_found("Request not found")
    return _serialize(updated)
