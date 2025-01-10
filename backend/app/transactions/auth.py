"""
Auth transactions.
"""

from pydantic import EmailStr

from app import constants
from app import db as db_config
from app import exceptions as ex
from app import schemas
from app.firebase import firebase_auth_integration
from app.services import auth_service, users_service


class AuthTransactions:
    @staticmethod
    async def authenticate_user_with_email_and_password(
        db: db_config.DefaultDBSessionClass,
        email: EmailStr,
        password: str,
    ) -> schemas.Token:
        user = await users_service.get_user_by_email(db=db, email=email)
        if not user:
            raise ex.NotFoundError

        authenticated = await auth_service.check_password(
            db, user_id=user.id, raw_password=password
        )
        if not authenticated:
            raise ex.AuthorizationFailed

        firebase_user = await firebase_auth_integration.aget_user_by_email(
            email
        )
        if not firebase_user:
            firebase_user = await firebase_auth_integration.acreate_user(
                email=email,
                password=password,
            )

        if not user.firebase_uid:
            user.firebase_uid = firebase_user.uid
            db.add(user)

        await db.commit()

        token = await firebase_auth_integration.acreate_custom_token(
            uid=firebase_user.uid,
            payload=schemas.TokenData(
                user_id=user.id,
                firebase_uid=user.firebase_uid,
                email=user.email,
            ),
        )
        return token

    @staticmethod
    async def register_user_with_email_and_password(
        db: db_config.DefaultDBSessionClass,
        email: EmailStr,
        password: str,
    ) -> schemas.Token:
        user = await users_service.get_user_by_email(db=db, email=email)
        if user:
            raise ex.GeneralException(
                detail="User with such email already exist."
            )

        firebase_user = await firebase_auth_integration.aget_user_by_email(
            email=email
        )
        if not firebase_user:
            firebase_user = await firebase_auth_integration.acreate_user(
                email=email,
                password=password,
            )

        password_salt = await auth_service.gen_salt()
        hashed_password = await auth_service.hash_password(
            password=password,
            salt=password_salt.decode(constants.ENCODINGS.utf_8),
        )
        create_user_data = schemas.CreateUser(
            hashed_password=hashed_password,
            email=email,
            firebase_uid=str(firebase_user.uid),
            password_salt=password_salt,
        )
        user = await users_service.create_user(
            db, create_user_data=create_user_data
        )

        await db.commit()

        await db.close()
        token = await firebase_auth_integration.acreate_custom_token(
            uid=firebase_user.uid,
            payload=schemas.TokenData(
                user_id=user.id,
                email=user.email,
                firebase_uid=user.firebase_uid,
            ),
        )
        return token
