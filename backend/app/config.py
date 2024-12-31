"""
A module with app config
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Database
    DB_URI: str

    # Firebase
    FIREBASE_CERTS: dict


settings = Settings()
