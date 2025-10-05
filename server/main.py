from dotenv import load_dotenv
from typing import Any, Dict
import os


from infra import flask_app, db
from models import *
from static_data import update_user_statuses, update_user_types

##----------------------------
## Configuration code
##----------------------------
load_dotenv()
CONFIG = {
    "SECRET_KEY": os.getenv("SECRET_KEY"),
    "DB_NAME": os.getenv("DB_NAME"),
}




if __name__ == "__main__":

    from browse import browse as browse_blueprint
    flask_app.register_blueprint(browse_blueprint)

    from auth import auth as auth_blueprint
    flask_app.register_blueprint(auth_blueprint)

    db_name = CONFIG["DB_NAME"]
    if db_name is None:
        raise Exception("DB_NAME must be set")
    
    secret_key = CONFIG["SECRET_KEY"]
    if secret_key is None:
        raise Exception("SECRET_KEY must be set")
    
    flask_app.secret_key = secret_key
    
    db_name = './' + db_name

    print(f"opening database {db_name}")

    db.init(db_name, pragmas={'foreign_keys': 1} )

    with db :
        db.create_tables([User, UserType, UserStatus, Collection])

    update_user_types()
    update_user_statuses()

    is_prod = os.getenv("FLASK_ENV") == "production"

    options : Dict[str, Any] = {}

    prefix : str | None = os.getenv("WAITRESS_PREFIX")

    if is_prod and prefix :
        options["url_prefix"] = prefix

    listen = os.getenv("WAITRESS_LISTEN")

    if listen:
        if is_prod:
            if listen.startswith("/"):
                options["unix_socket"] = listen
                options["unix_socket_perms"] = '660'
            else :
                options["listen"] = listen
        else :
            # flask_app.run() doesn't support listen, so split
            # into host and port.
            (host, port) = listen.split(":")
            options["host"] = host
            options["port"] = port
    print(f"startup options = {options}")

    if is_prod:
        from waitress import serve
        serve(flask_app, **options)
    else :
        flask_app.run(debug=True, **options)