from flask import Blueprint, request

demo = Blueprint('demo', __name__, template_folder='templates')

@demo.route('/demo/<int:id>', methods=['GET'])
def search_demo(id):
    return '{}'.format(id)