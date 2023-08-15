"""Server for task management app."""

# from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from flask_cors import CORS
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """View homepage."""

    return render_template('index.html')

@app.route("/tasks", methods=["GET"])
def all_tasks():
    """View all tasks."""

    tasks = crud.get_tasks()

    return jsonify(tasks)

@app.route("/tasks/<task_id>")
def show_task(task_id):
    """Show details on a particular task."""
    
    task = crud.get_task_by_id(task_id)

    return jsonify(task)

@app.route("/tasks", methods=["POST"])
def create_task():
    """Create a new task."""

    data = request.json
    title = data.get("title")
    description = data.get("description")

    task = crud.create_task(title=title, description=description)
    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"})

if __name__ == "__main__":
    connect_to_db(app, "tasks")
    app.run(host="0.0.0.0", port=5173)