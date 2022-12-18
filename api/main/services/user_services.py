#                     -*- Service Exemple -*-
#
#   Here you can provide logic to operate the data that you want to
# send to the client and the data that you will persist at your database.


from main.database import db
from main.models.user_model import UserModel


class UserService():

    @staticmethod
    def create_user_with_post_method(data):
        print(data)
        if UserModel.find_by_email(data['email']):
            return {"message": "User with that email already exists.", "code": 400}  # noqa E501
        user = UserModel(**data)
        try:
            db.session.add(user)
            db.session.commit()
        except Exception:
            return {"message": "Problem during creation process.", "code": 500}

        return {"message": "User created successfully.", "user_id": user.id, "code": 201}

    @staticmethod
    def get_all():
        return UserModel.query.all()
