from flask import Blueprint, render_template, request

neighborhood = Blueprint('neighborhood', __name__, template_folder='templates')

@neighborhood.route('/neighborhood/search', methods=['GET'])
def search_neighborhood():
    params = request.args
    
    return params.get('name')