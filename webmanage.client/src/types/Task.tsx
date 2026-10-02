
export type Task = {
      name: string;
      id: string;
      isWindowed: number;
}

export function sortTasksByName(tasks: Task[]): Task[] {
  const sortedTasks = [...tasks].sort((a, b) => a.name.localeCompare(b.name));
  return sortedTasks;
}