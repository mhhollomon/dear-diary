from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_user

from models import User, UserType, UserStatus

from infra import db, bcrypt

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    # login code goes here
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    with db :
        user = User.select().where(User.email==email).get_or_none()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not bcrypt.check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if the user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return redirect(url_for('browse.profile'))

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():

    # Need to validate the form
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    with db :
        user = User.select().where(User.email == email).get_or_none()

        if user :
            return redirect(url_for('auth.signup'))
        
        new_user = User(user_type=UserType.select().where(UserType.name == 'User').get(), 
                        user_status=UserStatus.select().where(UserStatus.name == 'Active').get(),
                        user_name=name,
                        email=email,
                        password=bcrypt.generate_password_hash(password).decode('utf-8')
                        )
        
        print(f"new user: {new_user}")
        new_user.save(force_insert = True)
        db.commit()

    return redirect(url_for('auth.login'))

@auth.route('/logout')
def logout():
    return render_template('logout.html')