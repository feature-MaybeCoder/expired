from typing import Optional, List

from pydantic import EmailStr

from .base import Model as BaseModel


class FirebaseUser(BaseModel):
    uid: str
    email: EmailStr


class FirebaseIdentity(BaseModel):
    email: List[EmailStr]


class FirebaseData(BaseModel):
    identities: FirebaseIdentity
    sign_in_provider: str


class FirebaseUserData(BaseModel):
    user_id: str
    firebase_uid: str
    email: EmailStr
    username: Optional[str]
    iss: str
    aud: str
    auth_time: int
    sub: str
    iat: int
    exp: int
    email_verified: bool
    firebase: FirebaseData
    uid: str