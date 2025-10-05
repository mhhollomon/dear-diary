from typing import List
from infra import db

from models import UserType, UserStatus

USER_TYPES : List[str] = ["User", "Admin"]
USER_STATUSES : List[str] = ["Active", "Inactive", "Deleted"]

def update_user_types() -> None :
    with db :
        type_count = UserType.select().count()
        if type_count == 0 :
            for type in USER_TYPES :
                UserType.create(name=type)
            db.commit()

def update_user_statuses() -> None :
    with db :
        type_count = UserStatus.select().count()
        if type_count == 0 :
            for type in USER_STATUSES :
                UserStatus.create(name=type)
            db.commit()
