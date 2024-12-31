import logging
from typing import Generator

from app import db as db_config
from sqlalchemy.exc import SQLAlchemyError

LOGGER = logging.getLogger(__name__)
DB_ERROR_TEXT = "Session rollback because of exception: %s."


async def get_db() -> Generator[db_config.DefaultDBSessionClass, None, None]:
    """
    Get DB session instance.
    """
    try:
        async with db_config.sessions_maker() as db:
            return db
    except SQLAlchemyError as e:
        LOGGER.exception(DB_ERROR_TEXT, e)
        await db.rollback()
    finally:
        await db.close()
