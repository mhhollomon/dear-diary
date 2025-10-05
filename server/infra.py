from flask import Flask
from flask_bcrypt import Bcrypt

from peewee import SqliteDatabase

from flask_login import LoginManager

flask_app = Flask(__name__)
bcrypt = Bcrypt(flask_app)

db = SqliteDatabase(None)

login_manager = LoginManager()
login_manager.login_view = "auth.login" # type: ignore
login_manager.session_protection = "strong"
login_manager.init_app(flask_app)
