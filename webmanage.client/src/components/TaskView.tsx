import type { Task } from "../types/Task";
import {apiFetcher} from "../service/api";

type Props = {
      tasks: Task[];
};


export const TaskView : React.FC<Props> = ({ tasks }) => {
    return (
        <div className="dark-mode-container">
            <table className="dark-mode-table">
                <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td><span>{task.name}</span></td>
                            <td><span className="code">{task.id}</span></td>
                            <td><span><button onClick={() => apiFetcher(`http://localhost:5222/end/${task.id}`)}>End</button></span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}