# coding=utf-8
import time
import json

from database import db

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255))
    update_time = db.Column(db.Integer, nullable=False, default=time.time, onupdate=time.time)

    def __init__(self, **kwargs):
        self.update(**kwargs)

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    def __repr__(self):
        return '<Image %r>' % self.name
