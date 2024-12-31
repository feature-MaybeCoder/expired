"""
Auth service.
"""
import bcrypt

from app import constants
from app import db as db_config
from app.dals import user_dal


class AuthService:

    @staticmethod
    async def _clean_hashed_password(password: str) -> str:
        return password.replace(" ", "", len(password))

    async def check_password(
        self,
        db: db_config.DefaultDBSessionClass,
        user_id: int,
        raw_password: str,
    ):
        user = await user_dal.get_user_by_id(db=db, user_id=user_id)
        hashed_password = bcrypt.hashpw(
            raw_password.encode("utf-8"),
            salt=user.password_salt.encode("utf-8"),
        )
        cleaned_users_password = await self._clean_hashed_password(
            password=user.password
        )
        return (
            hashed_password.decode(constants.ENCODINGS.utf_8) == cleaned_users_password
        )

    @staticmethod
    async def gen_salt():
        return bcrypt.gensalt()

    async def hash_password(
        self, password: str, salt: str = bcrypt.gensalt()
    ) -> str:
        hashed_password = bcrypt.hashpw(
            password.encode(constants.ENCODINGS.utf_8),
            salt=salt.encode(constants.ENCODINGS.utf_8),
        )

        return await self._clean_hashed_password(
            hashed_password.decode(constants.ENCODINGS.utf_8)
        )


# $2b$12$UIrbc0pwjTZm2HCUdE51auOwA4xvVnyJMWkYV9zzIJG1c2oK0ByY2
#
