from os import getenv
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_apidoc_extend import ApiDoc
if (getenv("FLASK_ENV") == 'development'):
    from flask_cors import CORS

from config import config_selector
from main.database import db, migrate
from main.resources.user_resource import UsersList, User, UserGitHubProjects, UserRegister, UserLogin, UserLogout, TokenRefresh, UserTasks
from main.models.user_model import UserModel
from main.blacklist import BLACKLIST


def create_app():
    API_URL_PREFIX = "/api"
    configs = config_selector[getenv("FLASK_ENV")]

    if (getenv("FLASK_ENV") == 'development'):
        app = Flask(__name__)
    if (getenv("FLASK_ENV") == 'production'):
        app = Flask(__name__, static_folder='../public', static_url_path='/')

    app.config.from_object(configs)

    # pour que le front puisse envoyer ses requêtes fetch à l'api, cette problématique ne se pose que pour l'environnement de dév
    if (getenv("FLASK_ENV") == 'development'):
        CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)

    # pour créer un point d'entrée pour la documentation de l'Api
    ApiDoc(app=app, input_path='main/resources', url_path='/api/docs')

    api = Api(app, API_URL_PREFIX)

    app.config['JWT_SECRET_KEY'] = getenv("SECRET_KEY")
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

    jwt = JWTManager(app)

    @jwt.additional_claims_loader
    def add_claims_to_access_token(identity):
        if UserModel.find_by_id(identity).is_admin():
            return {'is_admin': True}
        return {'is_admin': False}

    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        print(jwt_payload)
        return jwt_payload['jti'] in BLACKLIST

    # The following callbacks are used for customizing jwt response/error messages.
    # The original ones may not be in a very pretty format (opinionated)
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify(
            description='The token has expired.',
            error='token_expired'
        ), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):  # we have to keep the argument here, since it's passed in by the caller internally
        return jsonify({
            'message': 'Signature verification failed.',
            'error': 'invalid_token'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "description": "Request does not contain an access token.",
            'error': 'authorization_required'
        }), 401

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return jsonify({
            "description": "The token is not fresh.",
            'error': 'fresh_token_required'
        }), 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "description": "The token has been revoked.",
            'error': 'token_revoked'
        }), 401

    api.add_resource(UserRegister, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(UserLogout, '/logout')
    api.add_resource(User, '/users/<int:id>')
    api.add_resource(UserTasks, '/users/<int:id>/tasks')
    api.add_resource(UserGitHubProjects, '/users/<int:id>/projects')
    api.add_resource(UsersList, '/users')
    api.add_resource(TokenRefresh, '/refresh')

    """
    @app.before_first_request
    def create_tables():
        db.create_all()
    """
    
    # pour définir le point d'entrée de l'application sur le front React
    if (getenv("FLASK_ENV") == 'production'):
        @app.route('/')
        def index():
            return app.send_static_file('index.html')

    return app
