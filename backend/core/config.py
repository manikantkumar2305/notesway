from functools import lru_cache
from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="ShareVault API")
    api_prefix: str = Field(default="/api")
    host: str = Field(default="0.0.0.0")
    port: int = Field(default=8000)
    env: str = Field(default="development")
    log_level: str = Field(default="INFO")

    # ---------- DATABASE ----------
    mongodb_uri: str = Field(
        validation_alias=AliasChoices("MONGO_URI", "MONGODB_URI"),
    )
    mongodb_db: str = Field(
        default="sharevault",
        validation_alias=AliasChoices("MONGO_DB", "MONGODB_DB"),
    )

    # ---------- AUTH ----------
    jwt_secret: str = Field(..., alias="JWT_SECRET")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")

    access_token_expire_minutes: int = Field(
        default=60,
        alias="ACCESS_TOKEN_EXPIRE_MINUTES",
    )
    refresh_token_expire_days: int = Field(
        default=7,
        alias="REFRESH_TOKEN_EXPIRE_DAYS",
    )

    bcrypt_rounds: int = Field(default=12, alias="BCRYPT_ROUNDS")

    # ---------- AWS ----------
    aws_access_key_id: str | None = Field(
        default=None,
        alias="AWS_ACCESS_KEY_ID",
    )
    aws_secret_access_key: str | None = Field(
        default=None,
        alias="AWS_SECRET_ACCESS_KEY",
    )
    aws_s3_bucket: str | None = Field(
        default=None,
        validation_alias=AliasChoices("S3_BUCKET", "AWS_S3_BUCKET"),
    )
    aws_s3_region: str = Field(
        default="us-east-1",
        validation_alias=AliasChoices("AWS_REGION", "AWS_S3_REGION"),
    )
    aws_s3_endpoint: str | None = Field(
        default=None,
        alias="AWS_S3_ENDPOINT",
    )

    # ---------- CORS ----------
    cors_origins: str = Field(
        default="http://localhost:3000,http://localhost:5173",
        alias="CORS_ORIGINS",
    )

    session_timeout_minutes: int = Field(
        default=30,
        alias="SESSION_TIMEOUT_MINUTES",
    )

    # ---------- EMAIL (FORGOT PASSWORD / OTP) ----------
    smtp_host: str = Field(
        default="smtp.gmail.com",
        alias="SMTP_HOST",
    )
    smtp_port: int = Field(
        default=587,
        alias="SMTP_PORT",
    )
    smtp_user: str = Field(
        ...,
        alias="SMTP_USER",
    )
    smtp_pass: str = Field(
        ...,
        alias="SMTP_PASS",
    )
    email_from: str = Field(
        ...,
        alias="EMAIL_FROM",
    )

    # ---------- PASSWORD RESET / OTP ----------
    otp_length: int = Field(
        default=4,
        alias="OTP_LENGTH",
    )
    otp_expiry_minutes: int = Field(
        default=15,
        alias="OTP_EXPIRY_MINUTES",
    )
    max_otp_attempts: int = Field(
        default=5,
        alias="MAX_OTP_ATTEMPTS",
    )
    reset_token_expiry_minutes: int = Field(
        default=15,
        alias="RESET_TOKEN_EXPIRY_MINUTES",
    )


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance to avoid re-parsing env."""
    return Settings()

