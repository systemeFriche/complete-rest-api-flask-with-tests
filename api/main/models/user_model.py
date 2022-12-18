import requests
from main.database import db
from main.models.user_task_model import user_task
from main.models.task_model import TaskModel
from main.utils import AES_CIPHER_TOKEN, get_hashed_password

ACCESS = {
    'guest': 0,
    'user': 1,
    'admin': 2
}

url_gitHub = "https://api.github.com"


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)
    access = db.Column(db.Integer, nullable=False)
    tasks = db.relationship(TaskModel, secondary=user_task, backref='users')
    gitHubToken = db.Column(db.String(88), unique=True, nullable=True)

    def __init__(self, username, password, email, access, gitHubToken):
        self.username = username
        # TODO: ici il faudrait appliquer un hash sur le password
        self.password = get_hashed_password(password)
        self.email = email
        self.access = access
        self.gitHubToken = AES_CIPHER_TOKEN.encrypt(gitHubToken)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def short_to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'access': self.access
        }

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': '*********',
            'access': self.access,
            'gitHubToken': '*********'
        }

    def get_github_projects(self):
        url_data = url_gitHub + "/orgs/IUT-LAVAL-MMI/repos"
        bearer_token = "Bearer " + AES_CIPHER_TOKEN.decrypt(self.gitHubToken)
        response = requests.get(url_data, headers={'Content-Type': 'application/json', 'Authorization': bearer_token})
        if response.status_code == 200:
            data = response.json()
            data_filter = [dict(project) for project in data if project['private']]
            return data_filter
        else:
            return None

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def is_admin(self):
        if self.access == ACCESS['admin']:
            return True
        return False

    def is_guest(self):
        if self.access == ACCESS['guest']:
            return True
        return False
