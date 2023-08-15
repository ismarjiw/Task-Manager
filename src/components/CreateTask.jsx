import { useState } from 'react';

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e) {
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

            if (!response.ok) {
                console.error('Error creating task:', response.statusText);
                setErrorMessage('An error occurred. Please try again later.');
                return;
            }

            const responseJson = await response.json();
            console.log('Response JSON:', responseJson);

            if (response.ok) {
                console.log('Task created successfully');
                setSuccessMessage('Task created successfully');
                setTitle('');
                setDescription('');
            } else {
                console.error('Error creating task');
                setErrorMessage('Error creating task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div>
            <h1>Create New Task</h1>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input id="title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" />
                </label>
                <br />
                <label>
                    Description:
                    <input id="description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Description"/>
                </label>
                <br />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}
