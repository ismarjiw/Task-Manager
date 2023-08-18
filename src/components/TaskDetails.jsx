import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TaskDetails() {
    const { task_id } = useParams();
    const [task, setTask] = useState(null);

    const baseUrl = "http://localhost:5000"
    
    useEffect(() => {
        async function fetchTaskDetails() {
            try {
                const response = await fetch(`${baseUrl}/tasks/${task_id}`); 
                const data = await response.json();
                console.log(data)
                setTask(data[0]);
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        }

        fetchTaskDetails();
    }, [task_id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.due_date || "Not specified"}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}

