import { useEffect, useState } from 'react';
import { TaskView } from './components/TaskView';

import type { Task } from './types/Task';
import './App.css';
import { apiFetchTasks } from './service/api';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

       const setTasksFromAPI = async () => {
       const data = await apiFetchTasks();
       setTasks(data);
       }

    useEffect(() => {
       setTasksFromAPI();
    }, []);


    return (
        <div>
            <h1 id="tableLabel">Tasks</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TaskView tasks={tasks} />
            <button onClick={setTasksFromAPI}>Refresh</button>
        </div>
    );
}

export default App;