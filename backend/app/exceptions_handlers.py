import fastapi as fa


async def handle_exceptions(
    _: fa.Request, exc: Exception
) -> fa.responses.JSONResponse:
    """
    Handle exceptions.
    """
    return fa.responses.JSONResponse(
        status_code=500,
        content={
            "message": "Oops, something went wrong",
            "detail": f"{type(exc).__name__}: {str(exc)}",
        },
    )
