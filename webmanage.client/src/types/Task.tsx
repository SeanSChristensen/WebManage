
export type Task = {
      name: string;
      id: string;
      isWindowed: number;
      cpuUsage: number;
      ramUsage: number; 
}



export function sortTasks(tasks: Task[], sortBy: string): Task[] {
  switch (sortBy) {
    case 'name':
      return tasks.sort((a,b) => a.name.localeCompare(b.name));
    case 'cpu':
      return tasks.sort((a,b) => b.cpuUsage - a.cpuUsage);
    case 'ram':
      return tasks.sort((a,b) => b.ramUsage - a.ramUsage);
    default:
      return tasks;
  }
}