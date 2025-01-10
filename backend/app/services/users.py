"""
Users service.
"""
from app import db as db_config
from app import schemas
from app.dals import user_dal
from pydantic import EmailStr


class UsersService:
    @staticmethod
    async def get_user_by_email(
        db: db_config.DefaultDBSessionClass,
        email: EmailStr,
    ) -> schemas.User | None:
        user = await user_dal.get_user_by_email(db, email=email)

        return user

    @staticmethod
    async def get_user_by_firebase_uid(
        db: db_config.DefaultDBSessionClass,
        firebase_uid: str,
    ) -> schemas.User | None:
        user = await user_dal.get_user_by_firebase_uid(db, firebase_uid=firebase_uid)

        return user

    @staticmethod
    async def create_user(
        db: db_config.DefaultDBSessionClass,
        create_user_data: schemas.CreateUser,
    ):
        return await user_dal.create_user(db, create_user_data)
