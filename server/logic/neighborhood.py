from database import db
from common.util import get_param

def handle_district_monthly_avg(n_list):
    districts = {} # district dict
    for row in n_list:
        districts[row.id] = {
            'district_id': row.id,
            'district_name': row.name,
            'records': []
        } if row.id not in districts else districts[row.id]

        districts[row.id]['records'].append({
            'price': int(row.avg_price),
            'date': row.update_date
        })

    return [districts.values()]