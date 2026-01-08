from datetime import datetime, timezone
from typing import Any

from bson import ObjectId

from core import security
from services import s3_utils


# =========================
# CREATE FILE RECORD
# =========================

async def create_file_record(db, *, user: dict, payload: dict[str, Any]) -> dict:
    now = datetime.now(timezone.utc)

    doc = {
        "_id": ObjectId(),  # ✅ FIX: backend generates Mongo ID
        "title": payload["title"],
        "subject": payload.get("subject"),
        "unit": payload.get("unit"),
        "topic": payload.get("topic"),
        "description": payload.get("description"),
        "keywords": payload.get("keywords", []),
        "uploaderRole": user["role"],
        "uploaderName": user["name"],
        "uploaderId": ObjectId(user["_id"]),
        "collegeId": user["collegeId"],
        "yearSemester": payload.get("yearSemester"),
        "key": payload["key"],  # ✅ important
        "s3Url": f"s3://{s3_utils.settings.aws_s3_bucket}/{payload['key']}",
        "downloadUrl": None,
        "fileSize": payload["fileSize"],
        "mimeType": payload["mimeType"],
        "downloadCount": 0,
        "sharedWith": [],
        "isPublic": False,
        "isDeleted": False,
        "createdAt": now,
        "updatedAt": now,
        "deletedAt": None,
    }

    await db.get_collection("files").insert_one(doc)
    return doc


# =========================
# LIST FILES
# =========================

async def list_files(
    db,
    *,
    college_id: str,
    skip: int = 0,
    limit: int = 20,
) -> tuple[list[dict], int]:

    query = {"collegeId": college_id, "isDeleted": False}

    cursor = (
        db.get_collection("files")
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort("createdAt", -1)
    )

    results = await cursor.to_list(length=limit)
    total = await db.get_collection("files").count_documents(query)

    return results, total


# =========================
# SEARCH FILES
# =========================

async def search_files(
    db,
    *,
    college_id: str,
    q: str | None,
    subject: str | None,
    uploader: str | None,
    limit: int = 20,
):
    query: dict[str, Any] = {
        "collegeId": college_id,
        "isDeleted": False,
    }

    if q:
        query["$text"] = {"$search": q}

    if subject:
        query["subject"] = subject

    if uploader:
        query["uploaderName"] = {"$regex": uploader, "$options": "i"}

    cursor = (
        db.get_collection("files")
        .find(query)
        .limit(limit)
        .sort("createdAt", -1)
    )

    results = await cursor.to_list(length=limit)
    total = await db.get_collection("files").count_documents(query)

    return results, total


# =========================
# GET SINGLE FILE
# =========================

async def get_file(
    db,
    file_id: str,
    *,
    college_id: str,
) -> dict | None:

    if not ObjectId.is_valid(file_id):
        raise security.bad_request("Invalid file id")

    return await db.get_collection("files").find_one(
        {
            "_id": ObjectId(file_id),
            "collegeId": college_id,
            "isDeleted": False,
        }
    )


# =========================
# UPDATE FILE METADATA
# =========================

async def update_file(
    db,
    file_id: str,
    *,
    college_id: str,
    updates: dict[str, Any],
) -> dict | None:

    if not ObjectId.is_valid(file_id):
        raise security.bad_request("Invalid file id")

    updates = {k: v for k, v in updates.items() if v is not None}

    if not updates:
        return await get_file(db, file_id, college_id=college_id)

    updates["updatedAt"] = datetime.now(timezone.utc)

    await db.get_collection("files").update_one(
        {"_id": ObjectId(file_id), "collegeId": college_id},
        {"$set": updates},
    )

    return await get_file(db, file_id, college_id=college_id)


# =========================
# SOFT DELETE (WITH S3 MOVE)
# =========================

async def soft_delete(
    db,
    file_id: str,
    *,
    college_id: str,
) -> None:

    if not ObjectId.is_valid(file_id):
        raise security.bad_request("Invalid file id")

    file_doc = await db.get_collection("files").find_one(
        {
            "_id": ObjectId(file_id),
            "collegeId": college_id,
            "isDeleted": False,
        }
    )

    if not file_doc:
        return

    old_key = file_doc["key"]
    new_key = f"deleted/{old_key}"

    # Move file in S3
    s3_utils.move_object(old_key, new_key)

    await db.get_collection("files").update_one(
        {"_id": ObjectId(file_id)},
        {
            "$set": {
                "isDeleted": True,
                "updatedAt": datetime.now(timezone.utc),
                "deletedAt": datetime.now(timezone.utc),
                "key": new_key,
                "s3Url": f"s3://{s3_utils.settings.aws_s3_bucket}/{new_key}",
            }
        },
    )


# =========================
# DOWNLOAD COUNT
# =========================

async def increment_download(db, file_id: str):
    if not ObjectId.is_valid(file_id):
        return

    await db.get_collection("files").update_one(
        {"_id": ObjectId(file_id)},
        {"$inc": {"downloadCount": 1}},
    )


# =========================
# STORAGE STATS
# =========================

async def storage_stats(db, college_id: str) -> dict:
    pipeline = [
        {"$match": {"collegeId": college_id, "isDeleted": False}},
        {
            "$group": {
                "_id": None,
                "totalSize": {"$sum": "$fileSize"},
                "fileCount": {"$sum": 1},
            }
        },
    ]

    agg = await db.get_collection("files").aggregate(pipeline).to_list(length=1)

    if not agg:
        return {"totalSize": 0, "fileCount": 0}

    return {
        "totalSize": agg[0].get("totalSize", 0),
        "fileCount": agg[0].get("fileCount", 0),
    }

