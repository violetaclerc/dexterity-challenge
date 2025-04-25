import { TaskProvider } from './context/TaskContext'
import TaskManager from './components/TaskManager/TaskManager'
import './App.css'

function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  )
}

export default App
