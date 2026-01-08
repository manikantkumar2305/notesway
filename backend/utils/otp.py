import secrets
import string
from core.config import get_settings

settings = get_settings()


def generate_otp() -> str:
    return "".join(
        secrets.choice(string.digits)
        for _ in range(settings.otp_length)
    )

