import fastapi as fa

from .views import password_router

router = fa.APIRouter(prefix="/auth", tags=["Auth"])
router.include_router(password_router)
