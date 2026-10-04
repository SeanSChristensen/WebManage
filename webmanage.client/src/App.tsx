import { useEffect, useState } from 'react';
import { TaskView } from './components/TaskView';

import type { Task } from './types/Task';
import './App.css';
import { apiFetchTasks } from './service/api';
import { sortTasksByName } from './types/Task'; 

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortOrder, setSortOrder] = useState("none");

       const setTasksFromAPI = async () => {
            const data = await apiFetchTasks();
            setTasks(data);
       }

    useEffect(() => {
       setTasksFromAPI();

       const interval = setInterval(setTasksFromAPI, 5000);
       return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if(sortOrder === "alphabetical") {
        setTasks(sortTasksByName(tasks));
      }
    }, [sortOrder]);


    return (
        <div>
            <h1 id="tableLabel">Tasks</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TaskView tasks={tasks} />
            <button onClick={setTasksFromAPI}>Refresh</button>
            <label for="taskName">Task Name:</label>
            <select name="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="none">None</option>
                <option value="alphabetical">Alphabetical</option>
            </select>
        </div>
    );
}

export default App;