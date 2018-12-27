# coding=utf-8
import math
from flask import abort
from sqlalchemy import func
from flask_sqlalchemy import SQLAlchemy, Pagination, BaseQuery

def paginate(self, page, per_page=20, error_out=False):
    if error_out and page < 1:
        abort(404)

    statement = self.statement.with_only_columns([func.count()]).order_by(None)
    if 'GROUP BY' in str(statement):
        titems = self.session.execute(statement)
        total = titems.rowcount
    else:
        total = self.session.execute(
            self.statement.with_only_columns([func.count()]).order_by(None)
        ).scalar()

    if total > 0:
        # total = min(1000 * per_page, total)
        page = min(int(math.ceil(float(total) / float(per_page))), page)
        page = max(page, 1)
        items = self.limit(per_page).offset((page - 1) * per_page).all()
    else:
        page = 1
        items = []
    return Pagination(self, page, per_page, total, items)

BaseQuery.paginate = paginate
db = SQLAlchemy()