import { useEffect, useState } from 'react'

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    const baseUrl = "http://localhost:5000"
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch(`${baseUrl}/tasks`);
                const data = await response.json();
                console.log('Fetched tasks:', data);
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>All Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title} : {task.status}</li>
                ))}
            </ul>
        </div>
    );
}
