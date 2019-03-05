from flask import Blueprint, render_template, request
from common.json import json_wrapper
from logic.neighborhood import handle_district_monthly_avg
from database import db
from models.Neighborhood import Neighborhood
from models.District import District
from sqlalchemy.sql import func
import json

neighborhood = Blueprint('neighborhood', __name__, template_folder='templates')

@neighborhood.route('/neighborhood', methods=['GET'])
def search_neighborhood():
    params = request.args or request.get_json() or request.form
    type = params.get('type')
    if type == 'district_monthly_avg':
        n_list = Neighborhood.query.join(District, District.id==Neighborhood.district_id) \
                    .with_entities(District.id, District.name, func.round(func.avg(Neighborhood.price)).label('avg_price'), func.date_format(func.from_unixtime(Neighborhood.update_time), '%Y-%m').label('update_date')) \
                    .filter(Neighborhood.price > 0) \
                    .group_by(District.id, 'update_date').all()

        result = handle_district_monthly_avg(n_list)

    return json_wrapper(data=result)