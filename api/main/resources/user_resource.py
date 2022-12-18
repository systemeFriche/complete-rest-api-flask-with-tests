from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    get_jwt_identity,
)

# TODO : revoir toutes les réponses des requêtes
# si OK : status = ok et data = data
# si NOK : status = nok et message = erreur

from main.models.user_model import UserModel
from main.services.user_services import UserService
from main.services.task_services import TaskService
# from main.utils import safe_str_cmp
from main.utils import check_password
from main.blacklist import BLACKLIST

_user_parser = reqparse.RequestParser()
_user_parser.add_argument('email',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )
_user_parser.add_argument('username',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )
_user_parser.add_argument('password',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )
_user_parser.add_argument('access',
                          type=int,
                          required=True,
                          help="This field cannot be blank."
                          )
_user_parser.add_argument('gitHubToken',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )

_user_parser_login = reqparse.RequestParser()
_user_parser_login.add_argument('email',
                                type=str,
                                required=True,
                                help="This field cannot be blank."
                                )
_user_parser_login.add_argument('password',
                                type=str,
                                required=True,
                                help="This field cannot be blank."
                                )


class User(Resource):
    @jwt_required()
    def get(self, id):
        """
        @api {get} /api/users/:id Get data of a specific user
        @apiName GetInfos
        @apiGroup MyApp
        @apiParam {Number} id user id
        @apiSuccess {Object} user infos of the specific user
        @apiSuccess {Number} user.id user id
        @apiSuccess {String} user.username user username
        @apiSuccess {String} user.mail user email
        @apiSuccess {String} user.password user hidden password
        @apiSuccess {Number} user.access user privilege
        @apiSuccessExample {json} Success
            HTTP/1.1 200 OK
            {
                "user": {
                    "id": 1,
                    "username": "Toto",
                    "mail": "toto@mel.fr",
                    "password": "*********",
                    "access": 0
                }
            }
            @apiError {String} message return message
            @apiErrorExample {json} List error
            HTTP/1.1 404
            {
                message: "User with the id '2' doesn't exist."
            }   
            @apiErrorExample {json} List error
            HTTP/1.1 401
            {
                message: "Admin privilege required or must be the user '2'"
            }                
             ""
        """
        user_id = get_jwt_identity()
        claims = get_jwt()
        if not user_id == id and not claims['is_admin']:
            return {'message': "Admin privilege required or must be the user '{}'".format(id)}, 401  # noqa E501
        user = UserModel.find_by_id(id)
        if user:
            return {"user": user.to_json()}, 200
        return {"message": "User with the id '{}' doesn't exist.".format(id)}, 404  # noqa E501

    def delete(self, id):
        user = UserModel.find_by_id(id)

        if user:
            try:
                user.delete_from_db()
            except Exception:
                return {"message": "Problem during suppression process."}, 500
            return {"message": "User deleted successfully."}, 200

        return {"message": "User with the id '{}' doesn't exist.".format(id)}, 404  # noqa E501


class UserRegister(Resource):
    def post(self):
        result = UserService.create_user_with_post_method(_user_parser.parse_args())
        return {"message": result['message']}, result['code']


class UserLogin(Resource):
    @classmethod
    def post(cls):
        data = _user_parser_login.parse_args()
        user = UserModel.find_by_email(data['email'])
        # if user and safe_str_cmp(user.password, data['password']):
        if user and check_password(data['password'], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'user_id': user.id
                    }, 200
        return {'message': 'Invalid credentials'}, 401


class UserGitHubProjects(Resource):
    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        claims = get_jwt()
        if not user_id == id and not claims['is_admin']:
            return {'message': "You must be the user '{}'".format(id)}, 401  # noqa E501
        user = UserModel.find_by_id(id)
        if user:
            return {"projects": user.get_github_projects()}, 200
        return {"message": "User with the id '{}' doesn't exist.".format(id)}, 404  # noqa E501


class UserLogout(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti']
        BLACKLIST.add(jti)
        return {'message': 'Successfully logged out.'}, 200


class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200


class UsersList(Resource):
    def post(self):
        result = UserService.create_user_with_post_method(_user_parser.parse_args())
        print(result)
        if result['code'] == 201:
            return {"message": result['message'], "user_id": result['user_id']}, result['code']
        elif result['code'] == 400:
            return {"message": result['message']}, result['code']
        elif result['code'] == 500:
            return {"message": result['message']}, result['code']

    def get(self):
        users = UserService.get_all()
        return {'users': [user.to_json() for user in users]}, 200


class UserTasks(Resource):
    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        claims = get_jwt()
        if not user_id == id and not claims['is_admin']:
            return {'message': "Admin privilege required or must be the user '{}'".format(id)}, 401  # noqa E501
        tasks = TaskService.get_user_tasks(id)
        if tasks:
            return {"tasks": [task.to_json() for task in tasks]}, 200
        else: 
            return {"tasks": []}, 200
