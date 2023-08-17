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
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
