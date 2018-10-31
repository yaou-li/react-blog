# coding=utf-8
import time
import json
from config import SECRET_KEY

from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255))
    avatar = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(30))
    last_login = db.Column(db.Integer, nullable=False, default=time.time)
    update_time = db.Column(db.Integer, nullable=False, default=time.time, onupdate=time.time)

    def __init__(self, **kwargs):
        self.update(**kwargs)

    def update(self, **kwargs):
        if 'password' in kwargs:
            raw = kwargs.pop('password')
            self.password = generate_password_hash(raw)
        for k, v in kwargs.items():
            setattr(self, k, v)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def get_info(self):
        info = {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar,
            'email': self.email,
            'phone': self.phone
        }
        return info

    def generate_auth_token(self, expiration = 600):
        s = Serializer(SECRET_KEY, expires_in = expiration)
        return s.dumps({ 'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user

    def __repr__(self):
        return '<User %r>' % self.name
