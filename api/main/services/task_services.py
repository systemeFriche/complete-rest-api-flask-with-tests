#                     -*- Service Exemple -*-
#
#   Here you can provide logic to operate the data that you want to
# send to the client and the data that you will persist at your database.

from main.models.task_model import TaskModel
from main.models.user_task_model import user_task


class TaskService():
    @staticmethod
    def get_user_tasks(id):
        query_user_role = TaskModel.query.join(user_task).filter((user_task.c.user_id == id)).all()
        return query_user_role
