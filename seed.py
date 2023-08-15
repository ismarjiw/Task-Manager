"""Script to seed database."""

import os
from random import choice, randint
from datetime import datetime

import crud
from model import Task, connect_to_db, db
import server

os.system("dropdb tasks")
os.system('createdb tasks')

connect_to_db(server.app, "tasks")
db.create_all()

task1 = Task (
                title = 'Target',
                description = 'Buy more toilet paper'
            )
task2 = Task (
                title = 'Whole Foods',
                description = 'Buy wine'
            )
task3 = Task (
                title = "Trader Joe's",
                description = 'Buy bagel seasoning'
            )

db.session.add_all([task1, task2, task3])
db.session.commit()