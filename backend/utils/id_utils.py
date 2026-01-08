from bson import ObjectId


def generate_object_id() -> ObjectId:
    """Generate a new MongoDB ObjectId."""

    return ObjectId()


def to_object_id(value: str | ObjectId) -> ObjectId:
    """Convert string to ObjectId if needed."""

    if isinstance(value, ObjectId):
        return value
    if not ObjectId.is_valid(value):
        raise ValueError("Invalid object id")
    return ObjectId(value)


def object_id_str(value: ObjectId | str | None) -> str | None:
    """Convert ObjectId to hex string for JSON responses."""

    if value is None:
        return None
    return str(value)
