"""
Auth schemas.
"""

from pydantic import EmailStr

from .base import Model


class Token(Model):
    access_token: str
    token_type: str


class TokenData(Model):
    user_id: int
    firebase_uid: str
    email: EmailStr
    username: str | None = None


class PasswordEmailAuthImport(Model):
    email: EmailStr
    raw_password: str
