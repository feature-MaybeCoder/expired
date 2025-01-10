"""
Firebase auth integration
"""

import asyncio
from concurrent.futures import ThreadPoolExecutor

from firebase_admin import auth as fba_auth
from pydantic import EmailStr

from app import constants, schemas


class FirebaseAuthIntegration:
    @staticmethod
    def create_user(email: str, password: str) -> schemas.FirebaseUser:
        user = fba_auth.create_user(email=email, password=password)

        return schemas.FirebaseUser(
            uid=user.uid,
            email=user.email,
        )

    async def acreate_user(
        self, email: str, password: str
    ) -> schemas.FirebaseUser:
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            user = await loop.run_in_executor(
                pool, self.create_user, email, password
            )

        return user

    @staticmethod
    def get_user_by_email(
        email: EmailStr,
    ) -> schemas.FirebaseUser | None:
        user = fba_auth.get_user_by_email(email=email)
        if user is None:
            return user

        return schemas.FirebaseUser(
            uid=user.uid,
            email=user.email,
        )

    async def aget_user_by_email(
        self, email: EmailStr
    ) -> schemas.FirebaseUser | None:
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            user = await loop.run_in_executor(
                pool,
                self.get_user_by_email,
                email,
            )
        return user

    def decode_token(self, token: str) -> schemas.FirebaseUserData:
        token_data = fba_auth.verify_id_token(id_token=token, check_revoked=True)
        return schemas.FirebaseUserData(**token_data)

    async def adecode_token(self, token: str) -> schemas.FirebaseUserData:
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            firebase_user_data = await loop.run_in_executor(
                pool,
                self.decode_token,
                token,
            )
        return firebase_user_data

    def create_custom_token(
        self, uid: str, payload: schemas.TokenData
    ) -> bytes:
        payload_dict = payload.dict()
        return fba_auth.create_custom_token(
            uid=uid, developer_claims=payload_dict
        )

    async def acreate_custom_token(
        self, uid: str, payload: schemas.TokenData
    ) -> schemas.Token:
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            custom_token = await loop.run_in_executor(
                pool, self.create_custom_token, uid, payload
            )
        return schemas.Token(
            access_token=custom_token.decode(constants.ENCODINGS.utf_8),
            token_type=constants.TOKEN_TYPES.custom,
        )
