"""
A user model.
"""

import sqlalchemy as sa
from app.models.base import BaseModel
from sqlalchemy_utils.types.email import EmailType


class User(BaseModel):
    id = sa.Column(sa.BigInteger, primary_key=True)
    email = sa.Column(EmailType, nullable=False)
    firebase_uid = sa.Column(sa.CHAR(length=40), default=None, nullable=True)
    password = sa.Column(sa.CHAR(length=200), nullable=True)
    password_salt = sa.Column(sa.CHAR(length=200), nullable=True)
