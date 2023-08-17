"""Server for task management app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from datetime import datetime
from flask_cors import CORS
from model import connect_to_db, db
import crud

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

app.secret_key = "dev"

@app.route('/')
def homepage():
    """View homepage."""

    return render_template('index.html')

@app.route("/tasks", methods=["GET"])
def all_tasks():
    """View all tasks."""

    tasks = crud.get_tasks()
    tasks_json = [{"id": task.task_id, "title": task.title, "status": task.status} for task in tasks]

    return jsonify(tasks_json)

@app.route("/tasks/<task_id>")
def show_task(task_id):
    """Show details on a particular task."""
    
    task = crud.get_task_by_id(task_id)
    print(task)
    task_json = [{"id": task.task_id, "title": task.title, "description": task.description, "due_date": task.due_date, "status": task.status}]

    return jsonify(task_json)

@app.route("/tasks", methods=["POST"])
def create_task():
    """Create a new task."""

    data = request.json
    print(data)
    title = data.get("title")
    description = data.get("description")
    due_date_str = data.get("dueDate")
    due_date_datetime = datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M")

    task = crud.create_task(title=title, description=description, due_date=due_date_datetime)
    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"})

if __name__ == "__main__":
    connect_to_db(app, "tasks")
    app.run(host="0.0.0.0", port=5000)