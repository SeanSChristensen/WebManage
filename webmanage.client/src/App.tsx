import { useEffect, useState, useCallback } from 'react';
import { TaskView } from './components/TaskView';
import type { Task } from './types/Task';
import './App.css';
import { apiFetchTasks } from './service/api';
import { sortTasksByName } from './types/Task'; 

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortOrder, setSortOrder] = useState("none");

       const setTasksFromAPI = useCallback(async () => {
            const data = await apiFetchTasks();
            await setTasks(data);
            if(sortOrder === "alphabetical"){ 
              await setTasks(prev => sortTasksByName(prev));
            }
       },[sortOrder])

    useEffect(() => {
       setTasksFromAPI();
       const interval = setInterval(setTasksFromAPI, 5000);
       return () => clearInterval(interval);
    }, [setTasksFromAPI]);

    
    
    useEffect(() => {
        if(sortOrder === "alphabetical"){
            setTasks(prev => sortTasksByName(prev));
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