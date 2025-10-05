from datetime import datetime, timezone

from peewee import Model, IntegerField, TextField, DateTimeField, ForeignKeyField, AutoField

from nanoid import generate

from infra import db, login_manager

ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def generate_str_id() -> str:
    return generate(ID_ALPHABET, size=10)

def generate_int_id() -> int: 
    import random
    return random.getrandbits(32)

def get_current_datetime() -> str:
    return datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

class Base(Model):
    class Meta:
        database = db
        strict_tables = True
    
class UserType(Base):

    user_type_id = AutoField()
    name    = TextField()

class UserStatus(Base):

    user_status_id = AutoField()
    name    = TextField()

class User(Base):

    user_id     = IntegerField(primary_key=True,default=generate_int_id)
    alt_id      = TextField(default=generate_str_id, unique=True)

    user_type   = ForeignKeyField(UserType, backref="utype", null=False)
    user_status = ForeignKeyField(UserStatus, backref="status", null=False)
    user_name   = TextField(unique=True)
    email       = TextField()
    password    = TextField()
    date_created = TextField(default=get_current_datetime)

    def is_active(self):
        return self.user_status.name == "Active"
    
    def is_anonymous(self):
        return False
    
    def is_authenticated(self):
        return True
    
    def get_id(self) -> str:
        return str(self.alt_id)
    
    def __str__(self):
        return f"User[id={self.user_id}, alt_id={self.alt_id}, user_name={self.user_name}," + \
            f" user_type={self.user_type.name}, user_status={self.user_status.name}, email={self.email}," + \
            f" date_created={self.date_created}]"
    
@login_manager.user_loader
def load_user(user_id :str):
    return User.select().where(User.alt_id == user_id).get_or_none()

class Collection(Base):
    coll_id = AutoField()
    name    = TextField()

