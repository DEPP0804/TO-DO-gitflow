import * as fs from "fs";
import { Task } from "../models/task";

const FILE_PATH = "tasks.json";

export function saveTasks(tasks: Task[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

export function loadTasks(): Task[] {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}