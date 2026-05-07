import { Task } from "../models/task";
import { saveTasks, loadTasks } from "../utils/storage";

export class TaskService {
  private tasks: Task[] = loadTasks();
  private idCounter =
    this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;

  addTask(title: string): Task {
    const task: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(task);
    saveTasks(this.tasks);
    console.log("[GITFLOW] Task added:", title);
    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  completeTask(id: number): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.completed = true;
    saveTasks(this.tasks);
    console.log("[GITFLOW] Task completed:", task.title);
    return task;
  }

  editTask(id: number, title: string): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.title = title;
    saveTasks(this.tasks);
    console.log("[GITFLOW] Task edited:", task.title);
    return task;
  }

  deleteTask(id: number): boolean {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    if (this.tasks.length === before) return false;
    saveTasks(this.tasks);
    console.log("[GITFLOW] Task deleted:", id);
    return true;
  }
}