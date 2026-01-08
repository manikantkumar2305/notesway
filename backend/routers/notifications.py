from fastapi import APIRouter

router = APIRouter(
    prefix="/api/notifications",
    tags=["Notifications"]
)

@router.get("")
async def get_notifications():
    """
    Dummy notifications endpoint.
    Returns empty list for now.
    """
    return []
