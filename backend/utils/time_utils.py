from datetime import datetime, timedelta, timezone


def now_utc() -> datetime:
    """Return current UTC time aware datetime."""

    return datetime.now(timezone.utc)


def add_minutes(dt: datetime, minutes: int) -> datetime:
    """Return datetime plus given minutes."""

    return dt + timedelta(minutes=minutes)


def add_days(dt: datetime, days: int) -> datetime:
    """Return datetime plus given days."""

    return dt + timedelta(days=days)
