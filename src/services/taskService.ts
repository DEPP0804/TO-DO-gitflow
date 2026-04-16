import { Task } from "../models/task";

export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  addTask(title: string) {
    const task: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(task);
    console.log("[GITFLOW] Task added:", title);
  }

  listTasks() {
    return this.tasks;
  }
}