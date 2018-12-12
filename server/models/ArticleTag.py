# coding=utf-8
import time
import json

from database import db

class ArticleTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artcile_id = db.Column(db.Integer, db.ForeignKey('article.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    update_time = db.Column(db.Integer, nullable=False, default=time.time, onupdate=time.time)

    def __init__(self, **kwargs):
        self.update(**kwargs)

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    def __repr__(self):
        return '<ArticleTag %r>' % self.id