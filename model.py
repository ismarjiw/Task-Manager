"""Models for task management app"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Task(db.Model):
    """Task class"""

    __tablename__ = "tasks"

    task_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300))
    due_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='To Do')

    def __repr__(self):
        return f'<Task task_id={self.task_id} title={self.title} description={self.description}>'


def connect_to_db(app, db_name):
    """Connect to database"""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to the db!")

if __name__ == "__main__":
    from server import app
    connect_to_db(app, "tasks")