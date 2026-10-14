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
                      <th scope="col" id="name" className="clickableHeader" onClick={handleHeaderClick}>Name <span className="sort-glyph">&#8645;</span></th>
                      <th scope="col">PID</th>
                      <th scope="col" id="cpu" className="clickableHeader" onClick={handleHeaderClick}>CPU <span className="sort-glyph">&#8645;</span></th>
                      <th scope="col" id="ram" className="clickableHeader" onClick={handleHeaderClick}>RAM <span className="sort-glyph">&#8645;</span></th>
                      <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id} className="task-row" style={{ animationDelay: `${index * 30}ms` }}>
                            <td><span className="task-name">{task.name}</span></td>
                            <td><span className="code">{task.id}</span></td>
                            <td>
                                <div className="cell-meter">
                                    <span>{task.cpuUsage.toFixed(2)}%</span>
                                    <div className="mini-meter"><div className="mini-meter-fill" style={{ width: `${Math.min(100, task.cpuUsage)}%` }}></div></div>
                                </div>
                            </td>
                            <td><span>{task.ramUsage.toFixed(2)} MB</span></td>
                            <td><span><button className="term-button danger" onClick={() => apiFetcher(`http://localhost:5222/end/${task.id}`)}>[ KILL ]</button></span></td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr><td colSpan={5} className="empty-row">scanning for processes<span className="cursor">&#9608;</span></td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
