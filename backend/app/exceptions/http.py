from .base import BaseCustomHTTPException


class GeneralException(BaseCustomHTTPException):
    message = "Something went wrong."
    detail = "Something went wrong.."
    status_code = 400


class NotFoundError(BaseCustomHTTPException):
    message = "Not found."
    detail = "Nothing matching query was found"
    status_code = 404


class UnauthorizedError(BaseCustomHTTPException):
    message = "Unauthorized."
    detail = "Unauthorized."
    status_code = 403
