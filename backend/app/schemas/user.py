"""
User scheme.
"""

from pydantic import EmailStr

from .base import Model as BaseModel


class User(BaseModel):
    id: int
    firebase_uid: str

    email: EmailStr


class CreateUser(BaseModel):
    firebase_uid: str
    email: EmailStr
    hashed_password: str
    password_salt: str
