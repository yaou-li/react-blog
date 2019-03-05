# coding=utf-8
def get_pagination(params, default_page=1, default_size=10):
    current = int(params.get('page', default_page))
    size = int(params.get('size', default_size))
    return current, size

def page_format(pagination):
    if not pagination:
        return {
            'page_size':    10,
            'total_page':   1,
            'current_page': 1
        }
    else:
        return {
            'size':    pagination.per_page,
            'total':   pagination.pages,
            'current': pagination.page,
            'count': pagination.total
        }

def get_param(params, key, typ, nullable=False, default=None):
    try:
        val = params.get(key)
        if val is None and nullable:
            return default
        elif val is None:
            return None
        elif val == '' and typ != str and typ != unicode:
            return default
        return typ(val)
    except Exception as e:
        raise e