import os

config = {}

MYSQL_USER = config.get('MYSQL_USER', 'root')
MYSQL_PASS = config.get('MYSQL_PASS', 'root')
MYSQL_HOST = config.get('MYSQL_HOST', '127.0.0.1')
MYSQL_PORT = int(config.get('MYSQL_PORT', 3306))
MYSQL_DB = config.get('MYSQL_DB', 'blog')

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_PORT, MYSQL_DB)
SQLALCHEMY_TRACK_MODIFICATIONS = True

# prefix for api path
URL_PREFIX = '/api'

# used for calc api token
SECRET_KEY = 'abc'

# used for CORS origin
FRONT_HOST = 'http://localhost:3000'

# token valid duration
TOKEN_EXPIRATION_TIME = 60 * 60

# root directory for image
ROOT_DIR = config.get('ROOT_DIR', os.path.abspath(os.path.dirname(__file__)))
IMG_DIR = config.get('IMG_DIR', os.path.join(ROOT_DIR,'/static/img'))