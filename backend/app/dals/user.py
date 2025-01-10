import sqlalchemy as sa
from app import db as db_config
from app import models, schemas
from app.repos.user import user_db_repo
from pydantic import EmailStr

from .base import BaseDal


class UserDal(BaseDal):
    @staticmethod
    async def create_user(
        db: db_config.DefaultDBSessionClass,
        create_user_data: schemas.CreateUser,
    ) -> schemas.User:

        user = models.User()
        user.password = create_user_data.hashed_password
        user.email = create_user_data.email
        user.firebase_uid = create_user_data.firebase_uid
        user.password_salt = create_user_data.password_salt

        db.add(user)
        await db.commit()
        await db.refresh(user)
        return schemas.User.from_orm(user)

    @staticmethod
    async def update_user(
        db: db_config.DefaultDBSessionClass, user_id: int, **update_kwargs
    ):
        await user_db_repo.update(db, obj_id=user_id, **update_kwargs)

    @staticmethod
    async def get_user_by_id(
        db: db_config.DefaultDBSessionClass, user_id: int
    ):
        return await user_db_repo.get(db, obj_id=user_id)

    @staticmethod
    async def get_user_by_firebase_uid(
        db: db_config.DefaultDBSessionClass, firebase_uid: str
    ) -> schemas.User | None:
        query = sa.select(models.User).where(
            models.User.firebase_uid == firebase_uid
        )
        user_orm = await db.execute(query)
        user_orm = user_orm.scalar()

        if user_orm is None:
            return user_orm

        return schemas.User.from_orm(user_orm)

    @staticmethod
    async def get_user_by_email(
        db: db_config.DefaultDBSessionClass, email: EmailStr
    ) -> schemas.User | None:
        query = sa.select(models.User).where(models.User.email == email)
        user_orm = await db.execute(query)
        user_orm = user_orm.scalar()

        if user_orm is None:
            return user_orm

        return schemas.User.from_orm(user_orm)
