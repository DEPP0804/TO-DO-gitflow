import { Task } from "../models/task";
import { saveTasks, loadTasks } from "../utils/storage";

export class TaskService {
  private tasks: Task[] = loadTasks();
  private idCounter = 1;

  addTask(title: string) {
    const task: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(task);
    saveTasks(this.tasks);
    console.log("Tarea agregada:", title);
  }

  listTasks() {
    return this.tasks;
  }

  completeTask(id: number) {
  const task = this.tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    saveTasks(this.tasks);
    console.log("Tarea completada:", task.title);
  }
}

    deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    saveTasks(this.tasks);
    console.log("Tarea eliminada");
    }
}