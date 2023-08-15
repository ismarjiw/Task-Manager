// src/components/Home.js

import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Task Manager</h1>
            <Link to="/tasks">Go to Task page</Link>
        </div>
    )
}

