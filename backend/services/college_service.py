from datetime import datetime, timezone
import re
from bson import ObjectId

from utils import id_utils


async def get_by_code(db, code: str) -> dict | None:
    """Case-insensitive lookup for college code."""
    cleaned = (code or "").strip()
    if not cleaned:
        return None
    return await db.get_collection("colleges").find_one({"code": {"$regex": f"^{re.escape(cleaned)}$", "$options": "i"}})


async def get_by_id(db, college_id: str) -> dict | None:
    return await db.get_collection("colleges").find_one({"_id": ObjectId(college_id)})


async def create_college(db, *, code: str, name: str, location: str | None = None, website: str | None = None, admin_email: str | None = None) -> dict:
    now = datetime.now(timezone.utc)
    normalized_code = (code or "").strip()
    doc = {
        "_id": id_utils.generate_object_id(),
        "code": normalized_code,
        "name": name,
        "location": location,
        "website": website,
        "adminEmail": admin_email,
        "phoneNumber": None,
        "registrationCodes": [],
        "createdAt": now,
        "updatedAt": now,
    }
    await db.get_collection("colleges").insert_one(doc)
    return doc
