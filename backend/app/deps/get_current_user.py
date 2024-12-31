from typing import Annotated

import fastapi as fa
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from starlette import status

from app import db as db_config
from app import schemas
from app.firebase import firebase_auth_integration
from app.services import users_service

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(
    db: db_config.DefaultDBSessionClass,
    token: Annotated[str, fa.Depends(oauth2_scheme)],
):
    credentials_exception = fa.HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = await firebase_auth_integration.adecode_token(token)
        print(payload)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception

    return await users_service.get_user_by_firebase_uuid(
        db, uuid=payload.get("firebase_uuid")
    )
