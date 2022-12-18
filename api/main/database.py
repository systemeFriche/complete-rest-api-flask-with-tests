from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

'''
def init_app(app: Flask):

    db.init_app(app)
    migrate.init_app(app, db)


    app.db = db
    # to push an application context when creating the tables.
    app.app_context().push()
    with app.app_context():
        db.create_all()
    # db.create_all()
'''
