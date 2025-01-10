from app.deps.get_db import get_db
import fastapi as fa
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials, HTTPBearer
from jwt import InvalidTokenError
from starlette import status

from app import db as db_config
from app import schemas
from app.firebase import firebase_auth_integration
from app.services import users_service
from app.exceptions import UnauthorizedError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(
    db: db_config.DefaultDBSessionClass = fa.Depends(get_db),
    creds: HTTPAuthorizationCredentials = fa.Depends(
        HTTPBearer(auto_error=False)
    ),
) -> schemas.User | None:
    credentials_exception = fa.HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not creds:
        raise UnauthorizedError
    try:
        firebase_user_data = await firebase_auth_integration.adecode_token(creds.credentials)
        user = await users_service.get_user_by_firebase_uid(
            db,
            firebase_uid=firebase_user_data.firebase_uid
        )
    except InvalidTokenError:
        raise credentials_exception

    result = None
    if user:
        result = schemas.User.from_orm(user)

    return result
