# coding=utf-8

from flask import jsonify

def json_wrapper(data='', page='', code=0):
    res = {
        'code': code,
        'data': data,
        'page': page
    }
    return jsonify(res)