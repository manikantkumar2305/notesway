from datetime import datetime, timezone
from bson import ObjectId

from core import security


async def create_request(db, *, user: dict, message: str | None = None) -> dict:
    existing = await db.get_collection("professor_requests").find_one({"userId": user["_id"], "status": "pending"})
    if existing:
        # Make this idempotent: return the existing pending request instead of erroring.
        return existing

    now = datetime.now(timezone.utc)
    doc = {
        "userId": user["_id"],
        "email": user["email"],
        "name": user["name"],
        "collegeId": user["collegeId"],
        "status": "pending",
        "requestedAt": now,
        "reviewedAt": None,
        "reviewedBy": None,
        "reviewComments": message,
    }
    await db.get_collection("professor_requests").insert_one(doc)
    return doc


async def list_requests(db, college_id: str, status_filter: str | None = None) -> tuple[list[dict], int]:
    query: dict = {"collegeId": college_id}
    if status_filter:
        query["status"] = status_filter
    cursor = db.get_collection("professor_requests").find(query).sort("requestedAt", -1)
    results = await cursor.to_list(length=100)
    total = await db.get_collection("professor_requests").count_documents(query)
    return results, total


async def update_status(db, request_id: str, *, status_value: str, admin_user: dict, comments: str | None = None) -> dict | None:
    now = datetime.now(timezone.utc)
    await db.get_collection("professor_requests").update_one(
        {"_id": ObjectId(request_id), "collegeId": admin_user["collegeId"]},
        {
            "$set": {
                "status": status_value,
                "reviewedAt": now,
                "reviewedBy": admin_user["_id"],
                "reviewComments": comments,
            }
        },
    )
    updated = await db.get_collection("professor_requests").find_one({"_id": ObjectId(request_id)})

    if updated and status_value == "approved":
        await db.get_collection("users").update_one(
            {"_id": updated["userId"]},
            {"$set": {"role": "professor", "updatedAt": now}},
        )
    return updated
