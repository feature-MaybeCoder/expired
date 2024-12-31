from app import models

from .base import DbRepo


class UserDbRepo(DbRepo[models.User]):
    pass


user_db_repo = UserDbRepo(model=models.User)
