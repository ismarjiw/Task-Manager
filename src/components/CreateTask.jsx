import { useState } from 'react';

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = { title, description };

        try {
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                console.log('Task created successfully');
                // Add any additional logic here, such as updating task list
            } else {
                console.error('Error creating task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h1>Create New Task</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}
