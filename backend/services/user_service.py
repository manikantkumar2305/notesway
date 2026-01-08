from datetime import datetime, timezone
from typing import Any
from bson import ObjectId

from auth import hashing
from utils import id_utils, time_utils


async def get_by_email(db, email: str) -> dict | None:
    return await db.get_collection("users").find_one(
        {"email": email.lower()}
    )


async def get_by_id(db, user_id: str) -> dict | None:
    return await db.get_collection("users").find_one(
        {"_id": ObjectId(user_id)}
    )


async def create_user(
    db,
    *,
    name: str,
    email: str,
    password: str,
    role: str,
    college_id: str,
) -> dict:
    """
    Create a new user (simple version – no email verification).
    """

    now = time_utils.now_utc()

    doc = {
        "_id": id_utils.generate_object_id(),
        "name": name,
        "email": email.lower(),
        "password": hashing.hash_password(password),
        "role": role,
        "collegeId": college_id,
        "photo": None,
        "isActive": True,
        "tokenVersion": 0,
        "createdAt": now,
        "updatedAt": now,
        "lastLogin": None,
    }

    await db.get_collection("users").insert_one(doc)
    return doc


async def list_users(
    db,
    college_id: str,
    skip: int = 0,
    limit: int = 20,
):
    cursor = (
        db.get_collection("users")
        .find({"collegeId": college_id})
        .skip(skip)
        .limit(limit)
        .sort("createdAt", -1)
    )

    users = await cursor.to_list(length=limit)
    total = await db.get_collection("users").count_documents(
        {"collegeId": college_id}
    )

    return users, total


async def update_profile(
    db,
    user_id: str,
    data: dict[str, Any],
) -> dict | None:
    data["updatedAt"] = datetime.now(timezone.utc)

    await db.get_collection("users").update_one(
        {"_id": ObjectId(user_id)},
        {"$set": data},
    )

    return await get_by_id(db, user_id)


async def increment_token_version(db, user_id: str) -> None:
    await db.get_collection("users").update_one(
        {"_id": ObjectId(user_id)},
        {
            "$inc": {"tokenVersion": 1},
            "$set": {"updatedAt": datetime.now(timezone.utc)},
        },
    )


async def delete_user(db, user_id: str) -> None:
    await db.get_collection("users").delete_one(
        {"_id": ObjectId(user_id)}
    )

