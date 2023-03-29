from main.utils import AES_CIPHER_TOKEN, check_password
from tests.utils import user_data


def test_new_user(new_user):
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the username, email, hashed_password, access and crypted github token
    """
    assert new_user.username == user_data["username"]
    assert new_user.email == user_data["email"]
    assert new_user.password != user_data["password"]
    assert check_password(user_data["password"], new_user.password)
    assert new_user.access == user_data["access"]
    assert AES_CIPHER_TOKEN.decrypt(new_user.gitHubToken) == user_data["gitHubToken"]


""" def test_create_user(database):
    data = {
        "username": "fguntz",
        "email": "fabien.guntz@univ-lemans.fr",
        "password": "toto",
        "access": 2,
        "gitHubToken": "ghp_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
    user1 = UserModel(**data)
    database.session.add(user1)
    database.session.commit()

    user = UserModel.query.first()

    assert (user.email == data["email"] and user.username == data["username"] and
            check_password(data["password"], user.password) and user.access == data["access"] and
            AES_CIPHER_TOKEN.decrypt(user.gitHubToken) == data["gitHubToken"]) """
