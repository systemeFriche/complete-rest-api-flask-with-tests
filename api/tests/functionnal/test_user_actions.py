from tests.utils import user_data


def test_user_login(client, new_user_in_db):
    """
    GIVEN a Flask application
    WHEN the '/login' page is requested (POST)
    THEN check that the response is valid
    """

    response = client.post('/api/login', headers={'Content-Type': 'application/json'}, json={'email': user_data["email"], 'password': user_data["password"]})
    json_data = response.get_json()

    assert response.status_code == 200
    assert "access_token" in json_data.keys()
    assert "refresh_token" in json_data.keys()
    assert json_data["user_id"] == 1


# def test_home_page_with_fixture(test_client):
#     """
#     GIVEN a Flask application configured for testing
#     WHEN the '/' page is requested (GET)
#     THEN check that the response is valid
#     """
#     response = test_client.get('/')
#     assert response.status_code == 200
#     assert b"Welcome to the" in response.data
#     assert b"Flask User Management Example!" in response.data
#     assert b"Need an account?" in response.data
#     assert b"Existing user?" in response.data
