import smtplib
import logging
from email.message import EmailMessage
from core.config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)


def send_otp_email(to_email: str, otp: str) -> None:
    try:
        msg = EmailMessage()
        msg["From"] = settings.email_from
        msg["To"] = to_email
        msg["Subject"] = "Reset your Notesway password"

        msg.set_content(
            f"""
Hi,

Your Notesway password reset code is:

{otp}

This code expires in {settings.otp_expiry_minutes} minutes.

If you didn’t request this, you can ignore this email.

— Notesway Team
"""
        )

        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_pass)
            server.send_message(msg)

    except Exception as e:
        logger.error(
            f"Failed to send OTP email to {to_email}",
            exc_info=e
        )

