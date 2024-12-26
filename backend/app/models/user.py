"""
A user model.
"""

import sqlalchemy as sa

from app.models.base import BaseModel


class User(BaseModel):
    id = sa.Column(sa.BigInteger, primary_key=True)