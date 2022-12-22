import os
import sys
script_dir = os.path.dirname(__file__)
api_dir = os.path.join(script_dir, '..')
sys.path.append(api_dir)
import json  # noqa: E402
from main import create_app  # noqa: E402
from main.database import db  # noqa: E402
from main.models.user_model import UserModel  # noqa: E402
from main.models.task_model import TaskModel  # noqa: E402

with open(api_dir+"/datafixtures/data.json") as file:
    users_raw = file.read()
users = json.loads(users_raw)


def db_fixture():
    # pas besoin des deux lignes suivantes c'est exécuté au préalable dans le script bash db_import_data.sh
    # db.drop_all()
    # db.create_all()
    app = create_app()
    with app.app_context():
        # création des utilisateurs
        users_array = []
        for user in users:
            users_array.append(UserModel(**user))
        db.session.add_all(users_array)
        # création des tâches
        task1 = TaskModel(title='My First Task', content='This is the content of my First Task')
        task2 = TaskModel(title='My Second Task', content='This is the content of my Second Task')
        task3 = TaskModel(title='My Third Task', content='This is the content of my Third Task')
        user2 = UserModel.find_by_id(2)
        user2.tasks.append(task1)
        user2.tasks.append(task2)
        user2.tasks.append(task3)

        db.session.add_all([task1, task2, task3] + users_array)
        db.session.commit()


if __name__ == "__main__":
    db_fixture()
