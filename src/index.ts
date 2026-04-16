import { TaskService } from "./services/taskService";

console.log("=== TRUNK VERSION ===");

const service = new TaskService();

service.addTask("Aprender Trunk-Based");
service.addTask("Comparar con GitFlow");

service.completeTask(1);

console.log("Tasks:", service.listTasks());