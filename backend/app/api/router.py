import fastapi as fa

from . import auth, users

# Define root api router
router = fa.APIRouter(prefix="/api")

# Versioned routers
v1_router = fa.APIRouter(prefix="/v1")
v1_router.include_router(users.router)
v1_router.include_router(auth.router)

router.include_router(v1_router)
