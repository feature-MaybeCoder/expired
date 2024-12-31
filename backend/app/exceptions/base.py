from typing import Optional

import fastapi as fa


class BaseCustomHTTPException(fa.HTTPException):
    message: str
    detail: str
    status_code: int

    def __init__(
        self,
        *,
        status_code: Optional[int] = None,
        message: Optional[str] = None,
        detail: Optional[str] = None,
    ):
        if status_code:
            self.status_code = status_code
        if message is not None:
            self.message = message
        if detail is not None:
            self.detail = detail
