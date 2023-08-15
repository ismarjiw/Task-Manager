import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Tasks from './components/Tasks'
import TaskDetails from './components/TaskDetails'
import CreateTask from './components/CreateTask'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:task_id" element={<TaskDetails />} />
        <Route path="/create-task" element={<CreateTask />} />
      </Routes>
    </Router>
  )
}

export default App
