from main.models.user_model import UserModel


def test__create_user(database):
    data = {"email": "some.email@server.com", "username": "Toto", "password": "mdp"}
    user1 = UserModel(**data)
    database.session.add(user1)
    database.session.commit()

    user = UserModel.query.first()

    assert user.email == data["email"] and user.username == data["username"] and user.password == data["password"]
