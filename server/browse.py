from flask import Blueprint, render_template

browse = Blueprint('browse', __name__)

@browse.route('/')
def index():
    return render_template('index.html')

@browse.route('/profile')
def profile():
    return render_template('profile.html')