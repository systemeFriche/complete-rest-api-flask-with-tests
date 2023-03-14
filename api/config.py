from os import getenv
from dotenv import load_dotenv
# import subprocess

load_dotenv()

# When deploying to Heroku the DATABASE_URL is set to 'postgres://',
# but since SQLAlquemy version 1.4 the connection uri must start with 'postgresql://'.
# This logic is suppost to fix that.
# uri = getenv("SQLALCHEMY_DATABASE_URI")
# if uri and uri.startswith("postgres://"):
#    uri = uri.replace("postgres://", "postgresql://", 1)

# Get Database configurations
# plus besoin
# user = getenv("POSTGRES_USER")
# password = getenv("POSTGRES_PASSWORD")
# hostname = getenv("POSTGRES_HOSTNAME")
# port = getenv("POSTGRES_PORT")
# database = getenv("APPLICATION_DB")
# SQLALCHEMY_DATABASE_URI = getenv("SQLALCHEMY_DATABASE_URI")


class Config:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = True
    FLASK_RUN_HOST = getenv("FLASK_RUN_HOST")
    FLASK_RUN_PORT = getenv("FLASK_RUN_PORT")
    DEBUG = getenv("FLASK_DEBUG")
    JWT_SECRET_KEY = getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = getenv("SQLALCHEMY_DATABASE_URI")


class DevelopmentConfig(Config):
    JSON_SORT_KEYS = False
    DEBUG = True


class ProductionConfig(Config):
    FLASK_ENV = 'production'
    FLASK_RUN_HOST = getenv("FLASK_RUN_HOST")
    FLASK_RUN_PORT = getenv("FLASK_RUN_PORT")


class TestingConfig(Config):
    # SQLALCHEMY_DATABASE_URI = "sqlite:///test_db.sqlite3"
    TESTING = True


config_selector = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}
