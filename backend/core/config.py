from functools import lru_cache
from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field(default="ShareVault API")
    api_prefix: str = Field(default="/api")
    host: str = Field(default="0.0.0.0")
    port: int = Field(default=8000)
    env: str = Field(default="development")
    log_level: str = Field(default="INFO")

    mongodb_uri: str = Field(validation_alias=AliasChoices("MONGO_URI", "MONGODB_URI"))
    mongodb_db: str = Field(default="sharevault", validation_alias=AliasChoices("MONGODB_DB", "MONGO_DB"))

    jwt_secret: str = Field(..., alias="JWT_SECRET")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(default=7, alias="REFRESH_TOKEN_EXPIRE_DAYS")

    bcrypt_rounds: int = Field(default=12, alias="BCRYPT_ROUNDS")

    aws_access_key_id: str = Field(..., alias="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: str = Field(..., alias="AWS_SECRET_ACCESS_KEY")
    aws_s3_bucket: str = Field(..., validation_alias=AliasChoices("S3_BUCKET_NAME", "AWS_S3_BUCKET"))
    aws_s3_region: str = Field(default="us-east-1", validation_alias=AliasChoices("AWS_REGION", "AWS_S3_REGION"))
    aws_s3_endpoint: str | None = Field(default=None, alias="AWS_S3_ENDPOINT")

    # Allow both CRA (3000) and Vite (5173) dev servers by default
    cors_origins: str = Field(default="http://localhost:3000,http://localhost:5173", alias="CORS_ORIGINS")

    session_timeout_minutes: int = Field(default=30, alias="SESSION_TIMEOUT_MINUTES")


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance to avoid re-parsing env."""

    return Settings()