import { useEffect, useState, useCallback, useMemo } from 'react';
import { TaskView } from './components/TaskView';
import type { Task } from './types/Task';
import './App.css';
import { apiFetchTasks } from './service/api';
import { sortTasks } from './types/Task'; 

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortOrder, setSortOrder] = useState("none");

    const sortedTasks = useMemo(() => {
        return sortTasks(tasks, sortOrder);
    }, [tasks, sortOrder]);

       const setTasksFromAPI = useCallback(async () => {
            const data = await apiFetchTasks();
            await setTasks(data);
       },[sortOrder])

    useEffect(() => {
       setTasksFromAPI();
       const interval = setInterval(setTasksFromAPI, 10000);
       return () => clearInterval(interval);
    }, [setTasksFromAPI]);

    return (
        <div>
            <h1 id="tableLabel">Tasks</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TaskView tasks={sortedTasks} setSortingHook={setSortOrder} />
        </div>
    );
}

export default App;