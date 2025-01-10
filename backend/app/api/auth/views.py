import fastapi as fa

from app import db as db_config
from app import deps, schemas
from app.transactions import auth_transactions


router = fa.APIRouter(prefix="/auth", tags=["Auth"])
password_router = fa.APIRouter(
    prefix="/password",
)


@password_router.post("/authenticate")
async def password_auth(
    body: schemas.PasswordEmailAuthImport,
    db: db_config.DefaultDBSessionClass = fa.Depends(deps.get_db),
) -> schemas.Token:

    return await auth_transactions.authenticate_user_with_email_and_password(
        db, email=body.email, password=body.raw_password
    )


@password_router.post("/register")
async def password_registration(
    body: schemas.PasswordEmailAuthImport,
    db: db_config.DefaultDBSessionClass = fa.Depends(deps.get_db),
) -> schemas.Token:

    return await auth_transactions.register_user_with_email_and_password(
        db, email=body.email, password=body.raw_password
    )
