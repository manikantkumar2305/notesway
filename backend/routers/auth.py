from fastapi import APIRouter, BackgroundTasks, HTTPException, Depends
from datetime import datetime, timedelta

from database import get_db
from schemas.auth import (
    ForgotPasswordRequest,
    VerifyOtpRequest,
    ResetPasswordRequest,
)
from utils.otp import generate_otp
from core.security import hash_str, hash_password, generate_reset_token
from services.email_service import send_otp_email
from core.config import get_settings

settings = get_settings()

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/forgot-password")
async def forgot_password(
    data: ForgotPasswordRequest,
    bg: BackgroundTasks,
    db=Depends(get_db),
):
    users_collection = db.get_collection("users")
    password_resets_collection = db.get_collection("password_resets")

    email = data.email.lower()
    user = await users_collection.find_one({"email": email, "isActive": True})

    if user:
        otp = generate_otp()

        await password_resets_collection.delete_many({"email": email})

        await password_resets_collection.insert_one(
            {
                "email": email,
                "otp_hash": hash_str(otp),
                "otp_used": False,
                "attempts": 0,
                "expires_at": datetime.utcnow()
                + timedelta(minutes=settings.otp_expiry_minutes),
                "created_at": datetime.utcnow(),
            }
        )

        # ✅ Send email in background (production-safe)
        try:
            bg.add_task(send_otp_email, email, otp)
        except Exception:
            pass

    return {"message": "If the account exists, a reset code has been sent."}


@router.post("/verify-otp")
async def verify_otp(
    data: VerifyOtpRequest,
    db=Depends(get_db),
):
    password_resets_collection = db.get_collection("password_resets")

    reset = await password_resets_collection.find_one(
        {"email": data.email.lower()}
    )

    if not reset or reset["expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired code")

    if reset["otp_used"] or reset["attempts"] >= settings.max_otp_attempts:
        raise HTTPException(status_code=400, detail="Invalid or expired code")

    if reset["otp_hash"] != hash_str(data.otp):
        await password_resets_collection.update_one(
            {"_id": reset["_id"]},
            {"$inc": {"attempts": 1}},
        )
        raise HTTPException(status_code=400, detail="Invalid or expired code")

    reset_token = generate_reset_token()

    await password_resets_collection.update_one(
        {"_id": reset["_id"]},
        {
            "$set": {
                "otp_used": True,
                "reset_token": hash_str(reset_token),
            }
        },
    )

    return {"reset_token": reset_token}


@router.post("/reset-password")
async def reset_password(
    data: ResetPasswordRequest,
    db=Depends(get_db),
):
    users_collection = db.get_collection("users")
    password_resets_collection = db.get_collection("password_resets")

    reset = await password_resets_collection.find_one(
        {"email": data.email.lower()}
    )

    if not reset or reset.get("reset_token") != hash_str(data.reset_token):
        raise HTTPException(status_code=400, detail="Invalid reset token")

    await users_collection.update_one(
        {"email": data.email.lower()},
        {"$set": {"password": hash_password(data.new_password)}},
    )

    await password_resets_collection.delete_one({"_id": reset["_id"]})

    return {"message": "Password reset successful"}

