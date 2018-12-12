from flask import Blueprint, render_template, request, g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from models.User import User
from common.json import json_wrapper
from database import db

auth = HTTPBasicAuth()
auth_token = HTTPTokenAuth(scheme='Token')
user = Blueprint('user', __name__, template_folder='templates')

# @user.route('/user/add', methods=['GET'])
# def create_user():
#     params = request.args
#     name = params.get('username')
#     password = params.get('password')
#     phone = params.get('phone')
#     email = params.get('email')
#     user = User.query.filter_by(name=name).first()
    
#     if user:
#         return json_wrapper(data={message: 'user name existed'})

#     user = User(
#         password=password,
#         name=name,
#         phone=phone,
#         email=email
#     )
#     db.session.add(user)
#     db.session.commit()

#     return json_wrapper(data=user.get_info())

@user.route('/user/<int:id>', methods=['GET'])
def search_user(id):
    user = User.query.get(id)
    return json_wrapper(data=user.get_info())


@user.route('/user/login', methods=['GET','POST'])
def login_user():
    params = request.form or request.args
    password = params.get('password')
    name = params.get('name')
    user = User.query.filter_by(name=name).first()
    if (user.check_password(password)):
        return json_wrapper(data=user.get_info())
    else:
        return json_wrapper(data={})

@user.route('/token/refresh', methods=['GET','POST'])
@auth_token.login_required
def check_token():
    token = g.user.generate_auth_token()
    return json_wrapper(data={ 'token': token.decode('ascii') })

@auth_token.verify_token
def verify_token(token):
    # first try to authenticate by token
    user = User.verify_auth_token(token)
    if not user:
        return False
    g.user = user
    return True

@user.route('/login', methods=['GET','POST'])
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return json_wrapper(data={ 'token': token.decode('ascii') })


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(name = username_or_token).first()
        if not user or not user.check_password(password):
            return False
    g.user = user
    return True