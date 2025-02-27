import fastapi as fa
from starlette.middleware.cors import CORSMiddleware

from app.api import router
from app.config import settings
from app.exceptions_handlers import handle_exceptions
from app.firebase import init_firebase_app

init_firebase_app(settings.FIREBASE_CERTS)

fa_app = fa.FastAPI()
fa_app.include_router(router)
fa_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
fa_app.add_exception_handler(Exception, handle_exceptions)
