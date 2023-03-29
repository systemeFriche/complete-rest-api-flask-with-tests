import pytest
from flask.testing import FlaskClient

from main import create_app
from main.database import db
from main.models.user_model import UserModel
from tests.utils import user_data


@pytest.fixture
def flask_app():
    app = create_app()
    app.config['TESTING'] = True
    with app.app_context():
        yield app


@pytest.fixture()
def client(flask_app):
    app = flask_app
    ctx = flask_app.test_request_context()
    ctx.push()
    app.test_client_class = FlaskClient
    return app.test_client()


@pytest.fixture()
def database(flask_app):
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
    yield db


@pytest.fixture()
def new_user():
    user = UserModel(**user_data)
    return user


@pytest.fixture()
def new_user_in_db(database):
    user = UserModel(**user_data)
    database.session.add(user)
    database.session.commit()
    return user
