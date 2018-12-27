from flask import Blueprint, render_template, request, g
from models.Article import Article
from models.User import User
from common.json import json_wrapper
from database import db
from user import auth_token
from common.util import get_pagination, page_format

article = Blueprint('article', __name__, template_folder='templates')

@article.route('/article', methods=['GET'])
def get_article_list():
    params = request.args or request.json or request.form
    current, size = get_pagination(params)
    pagination = Article.query.paginate(current, size, False)
    return json_wrapper(data=[article.get_info() for article in pagination.items], page=page_format(pagination))

@article.route('/article/<int:id>', methods=['GET'])
def get_article(id):
    article = Article.query.get(id)
    if not article:
        pass
    return json_wrapper(data=article.get_info())


@article.route('/article', methods=['POST'])
@auth_token.login_required
def save_article():
    params = request.args or request.json or request.form
    title = params.get('title')
    content = params.get('content')
    article = Article(
        title=title,
        content=content,
        user_id=g.user.id
    )
    db.session.add(article)
    db.session.commit()
    return json_wrapper(data=article.get_info())


@article.route('/article/<int:id>', methods=['PUT'])
@auth_token.login_required
def update_article(id):
    params = request.args or request.json or request.form
    title = params.get('title')
    content = params.get('content')
    article = Article.query.get(id)
    if not article:
        pass

    data = {
        "title": title,
        "content": content
    }
    article.update(**data)
    db.session.commit()
    return json_wrapper(data=article.get_info())