import { useEffect, useState, useCallback, useMemo } from 'react';
import { TaskView } from './components/TaskView';
import { VolumeView } from './components/VolumeView';
import { StorageView } from './components/storageView';
import type { Task } from './types/Task';
import type { Volume } from './types/Volume';
import type { storageDrive } from './types/storageDrive';
import './App.css';
import { apiFetchTasks,apiFetchVolumes } from './service/api';
import { sortTasks } from './types/Task'; 

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortOrder, setSortOrder] = useState("none");
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [totalCpuUsage,setTotalCpuUsage] = useState(0);
    const [totalRamUsage,setTotalRamUsage] = useState(0);

    const [drives, setDrives] = useState<storageDrive[]>([]);

    useEffect(() => {
      async function getStorage(){
       const response = await fetch('http://localhost:5222/driveInfo');
       const data = await response.json();
       setDrives(data);
      }

      getStorage();
    },[])

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

     const setRamFromApi = async () => {
       const response = await fetch('http://localhost:5222/ram');
       const data = await response.json();
       setTotalRamUsage(data);
     }

    useEffect(() => {
       setRamFromApi();
       const interval = setInterval(setRamFromApi, 10000);
       return () => clearInterval(interval);
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
        <div className="terminal">
            <div className="starfield" aria-hidden="true">
                <div className="stars stars-sm"></div>
                <div className="stars stars-md"></div>
                <div className="stars stars-lg"></div>
            </div>
            <div className="scanlines" aria-hidden="true"></div>

            <header className="term-window term-header">
                <div className="term-titlebar">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-amber"></span>
                    <span className="dot dot-green"></span>
                    <span className="term-titlebar-text">webmanage@localhost: ~/system</span>
                </div>
                <h1 className="term-title" data-text="WEBMANAGE // SYSTEM CONSOLE">WEBMANAGE // SYSTEM CONSOLE</h1>
                <p className="term-prompt">
                    <span className="prompt-user">root@deepspace</span>:<span className="prompt-path">~</span>$ status --live<span className="cursor">&#9608;</span>
                </p>
            </header>

            <section className="panel-grid">
                <div className="panel stat-panel">
                    <h2 className="panel-title">CPU_LOAD</h2>
                    <p className="stat-value">{Math.trunc(totalCpuUsage)}<span className="stat-unit">%</span></p>
                    <div className="meter"><div className="meter-fill" style={{ width: `${Math.min(100, Math.trunc(totalCpuUsage))}%` }}></div></div>
                </div>
                <div className="panel stat-panel">
                    <h2 className="panel-title">MEMORY_LOAD</h2>
                    <p className="stat-value">{Math.trunc(totalRamUsage)}<span className="stat-unit">%</span></p>
                    <div className="meter"><div className="meter-fill" style={{ width: `${Math.min(100, Math.trunc(totalRamUsage))}%` }}></div></div>
                </div>
            </section>

            <section className="panel">
                <h2 className="panel-title" id="tableLabel">ACTIVE_PROCESSES</h2>
                <p className="panel-subtitle">// click NAME, CPU or RAM to sort &middot; refresh interval 10s</p>
                <TaskView tasks={sortedTasks} setSortingHook={setSortOrder} />
            </section>

            <section className="panel-grid">
                <div className="panel">
                    <h2 className="panel-title">AUDIO_MIXER</h2>
                    <VolumeView volumes={volumes} />
                </div>
                <div className="panel">
                    <h2 className="panel-title">STORAGE_ARRAYS</h2>
                    <StorageView drives={drives} />
                </div>
            </section>

            <footer className="term-footer">
                <span>[ SIGNAL OK ]</span>
                <span className="link-status"><span className="pulse-dot"></span>LINK ESTABLISHED</span>
            </footer>
        </div>
    );
}

export default App;