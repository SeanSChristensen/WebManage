import { useEffect, useState, useCallback, useMemo } from 'react';
import { TaskView } from './components/TaskView';
import { VolumeView } from './components/VolumeView';
import type { Task } from './types/Task';
import type { Volume } from './types/Volume';
import './App.css';
import { apiFetchTasks,apiFetchVolumes } from './service/api';
import { sortTasks } from './types/Task'; 

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortOrder, setSortOrder] = useState("none");
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [totalCpuUsage,setTotalCpuUsage] = useState(0);

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

    useEffect(() => {
      async function fetchingVolumes(){
      const data = await apiFetchVolumes();
      await setVolumes(data);
      }

      fetchingVolumes();
    }, []);



     const setCpuFromApi = async () => {
       const response = await fetch('http://localhost:5222/cpu');
       const data = await response.json();
       setTotalCpuUsage(data);
     }

    useEffect(() => {
       setCpuFromApi();
       const interval = setInterval(setCpuFromApi, 10000);
       return () => clearInterval(interval);
    }, []);





    return (
        <div>
            <h1 id="tableLabel">Total CPU usage</h1>
            <p>{totalCpuUsage}</p>
            <h1 id="tableLabel">Tasks</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TaskView tasks={sortedTasks} setSortingHook={setSortOrder} />
            <VolumeView volumes={volumes} />
        </div>
    );
}

export default App;