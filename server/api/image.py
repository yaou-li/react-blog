import os
import uuid
from datetime import datetime
from flask import Blueprint, request, g
from models.Image import Image
from common.json import json_wrapper
from database import db
from user import auth_token
from common.util import get_pagination, page_format
from config import IMG_DIR

image = Blueprint('image', __name__, template_folder='templates')

@image.route('/image', methods=['POST'])
@auth_token.login_required
def save_image():
    params = request.args or request.json or request.form
    image_file = request.files['image']
    
    date = datetime.today().strftime('%Y-%m-%d')
    file_name = '{}-{}.jpeg'.format(date, uuid.uuid4())
    file_path = os.path.join(IMG_DIR, file_name)

    image_file.save(file_path)
    image = Image(
        url=file_path
    )
    db.session.add(image)
    db.session.commit()
    return json_wrapper(data=image.get_info())
