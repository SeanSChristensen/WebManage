import type { Task } from "../types/Task";
import {apiFetcher} from "../service/api";

interface TaskProps {
  setSortingHook: (value: string) => void;
  tasks: Task[];
}


export const TaskView : React.FC<TaskProps> = ({ tasks, setSortingHook }) => {

const handleHeaderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setSortingHook(event.currentTarget.id)
};

    return (
        <div className="dark-mode-container">
            <table className="dark-mode-table">
                <thead>
                    <tr>
                      <th scope="col" id="name" className="clickableHeader" onClick={handleHeaderClick}>Name</th>
                      <th scope="col">ID</th>
                      <th scope="col" id="cpu" className="clickableHeader" onClick={handleHeaderClick}>CPU Usage</th>
                      <th scope="col" id="ram" className="clickableHeader" onClick={handleHeaderClick}>RAM Usage</th>
                      <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td><span>{task.name}</span></td>
                            <td><span className="code">{task.id}</span></td>
                            <td><span>{task.cpuUsage.toFixed(2)}%</span></td>
                            <td><span>{task.ramUsage.toFixed(2)} MB</span></td>
                            <td><span><button onClick={() => apiFetcher(`http://localhost:5222/end/${task.id}`)}>End</button></span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}