from pydantic import EmailStr

from .base import Model as BaseModel


class FirebaseUser(BaseModel):
    uid: str
    email: EmailStr
