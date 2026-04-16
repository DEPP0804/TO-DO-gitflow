import { Task } from "../models/task";
import { saveTasks, loadTasks } from "../utils/storage";

export class TaskService {
  private tasks: Task[] = loadTasks();
  private idCounter = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;

  addTask(title: string) {
    const task: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(task);
    saveTasks(this.tasks);
    console.log("[GITFLOW] Tarea agregada:", title);
  }

  listTasks() {
    return this.tasks;
  }

  completeTask(id: number) {
  const task = this.tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    saveTasks(this.tasks);
    console.log("[GITFLOW] Tarea completada:", task.title);
  }
}

    deleteTask(id: number) {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    saveTasks(this.tasks);

    if (this.tasks.length < before) {
        console.log("[GITFLOW] Tarea eliminada con ID:", id);
    }
}
}