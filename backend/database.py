from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING, DESCENDING
from core.config import get_settings

settings = get_settings()

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None


async def get_db() -> AsyncIOMotorDatabase:
    """FastAPI dependency to provide a database handle."""
    if _db is None:
        raise RuntimeError("Database is not initialized")
    return _db


async def connect_to_mongo() -> None:
    """Initialize MongoDB connection and indexes."""
    global _client, _db
    # Use settings.mongodb_uri (should be set in backend/.env)
    _client = AsyncIOMotorClient(settings.mongodb_uri)
    _db = _client[settings.mongodb_db]
    await _ensure_indexes()


async def close_mongo() -> None:
    """Close MongoDB connection."""
    if _client:
        _client.close()


async def _ensure_indexes() -> None:
    """Create required indexes for collections."""

    if _db is None:
        return

    # USERS COLLECTION
    users = _db.get_collection("users")
    # unique index on email
    await users.create_index("email", unique=True)
    # simple indexes
    await users.create_index([("collegeId", ASCENDING)])
    await users.create_index([("role", ASCENDING)])
    await users.create_index([("createdAt", DESCENDING)])

    # COLLEGES COLLECTION
    colleges = _db.get_collection("colleges")
    await colleges.create_index([("code", ASCENDING)], unique=True)
    await colleges.create_index([("name", ASCENDING)])

    # FILES COLLECTION
    files = _db.get_collection("files")
    await files.create_index([("collegeId", ASCENDING)])
    await files.create_index([("uploaderId", ASCENDING)])
    await files.create_index([("keywords", ASCENDING)])
    await files.create_index([("subject", ASCENDING)])
    # createdAt index (descending for latest-first queries)
    await files.create_index([("createdAt", DESCENDING)])

    # Full-text search index — use try/except to avoid failing if index already exists
    try:
        await files.create_index(
            [("title", "text"), ("description", "text"), ("keywords", "text")],
            name="files_text_idx",
        )
    except Exception:
        # harmless if index already exists or not supported by the current tier
        pass

    # PROFESSOR REQUESTS COLLECTION
    professor_requests = _db.get_collection("professor_requests")
    await professor_requests.create_index([("collegeId", ASCENDING)])
    await professor_requests.create_index([("status", ASCENDING)])
    await professor_requests.create_index([("requestedAt", DESCENDING)])

    # PASSWORD RESETS COLLECTION (FORGOT / RESET PASSWORD)
    password_resets = _db.get_collection("password_resets")

    # Lookup by email (OTP verification step)
    await password_resets.create_index([("email", ASCENDING)])

    # Expiry index for automatic cleanup (TTL)
    # MongoDB will delete documents automatically when expiresAt < now
    await password_resets.create_index(
        [("expires_at", ASCENDING)],
        expireAfterSeconds=0,
    )

    # Latest reset request first
    await password_resets.create_index([("created_at", DESCENDING)])

