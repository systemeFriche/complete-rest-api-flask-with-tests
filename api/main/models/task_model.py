from main.database import db


class TaskModel(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=True)

    def __init__(self, title, content):
        self.title = title
        self.content = content

    def __repr__(self):
        return '<Task {}>'.format(self.title)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content
        }

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
