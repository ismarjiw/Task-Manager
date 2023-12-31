from model import db, Task
from flask import json
from datetime import *
from sqlalchemy import desc


def create_task(title, description, due_date):
    """Create and return a new task."""

    task = Task(title=title, description=description, due_date=due_date)

    return task

def get_task_by_id(task_id):
    """Return task by id"""

    return Task.query.get(task_id)

def get_tasks():
    """Return all tasks"""

    return Task.query.all()