import os
import sys
script_dir = os.path.dirname(__file__)
api_dir = os.path.join(script_dir, '..')
sys.path.append(api_dir)
from main import create_app  # noqa: E402
from main.database import db  # noqa: E402


def db_fixture():
    app = create_app()
    with app.app_context():
        db.drop_all()
        # db.create_all()


if __name__ == "__main__":
    db_fixture()
