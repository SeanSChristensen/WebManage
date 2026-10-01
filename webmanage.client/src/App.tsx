import { useEffect, useState } from 'react';
import { TaskView } from './components/TaskView';

import type { Task } from './types/Task';
import './App.css';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5222/getwindowedprocesses');
            if (response.ok) {
                const data = await response.json();

                console.log(data)
                setTasks(data);
            }
        }
        fetchData();
    }, []);


    return (
        <div>
            <h1 id="tableLabel">Tasks</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TaskView tasks={tasks} />
        </div>
    );
}

export default App;