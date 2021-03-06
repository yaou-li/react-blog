from flask import Flask
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from database import db
from api import modules
from config import FRONT_HOST
import config
import time
import json
import os
import sys

app = Flask('app')
CORS(app, origins=[FRONT_HOST], supports_credentials=True)
mysql = MySQL()
app.config.from_object(config)

db.app = app
db.init_app(app)

for module in modules:
    app.register_blueprint(module, url_prefix=config.URL_PREFIX)

mysql.init_app(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


from models.District import District
from models.Neighborhood import Neighborhood
from models.Vendor import Vendor
from models.User import User
from models.Article import Article
from models.Comment import Comment
from models.Image import Image 
from models.Tag import Tag
from models.ArticleTag import ArticleTag

@app.teardown_appcontext
def after_request(error):
    db.session.close()

@manager.command
def create_db():
	db.create_all()
	db.session.commit()

@manager.command
def upgrade_db(sql=False):
    if not os.path.exists('migrations'):
        print ' ---------- init migrate ----------'
        os.system("python {} db init".format(sys.argv[0]))
    print ' ---------- migrate ----------'
    if os.system("python {} db migrate".format(sys.argv[0])):
        print 'failed to upgrade database'
    else:
        print ' ---------- upgrade ----------'
        db.session.execute('SET GLOBAL FOREIGN_KEY_CHECKS = 0')
        os.system("python {} db upgrade {}".format(sys.argv[0], '--sql' if sql else ''))
        db.session.execute('SET GLOBAL FOREIGN_KEY_CHECKS = 1')

@manager.command
def start():
    app.run(debug=True, host='0.0.0.0', port=8010)

if __name__ == "__main__":
    manager.run()