# coding=utf-8
import time
import json

from database import db

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text)
    desc = db.Column(db.String(255))
    like_count = db.Column(db.Integer, default=0)
    share_count = db.Column(db.Integer, default=0)
    update_time = db.Column(db.Integer, nullable=False, default=time.time, onupdate=time.time)

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    def get_info(self):
        info = {
            'id': self.id,
            'title': self.title,
            'desc': self.desc,
            'content': self.content,
            'author': self.user_id,
            'time': self.update_time
        }
        return info

    def __repr__(self):
        return '<Article %r>' % self.name
