import { TaskService } from "./services/taskService";

const service = new TaskService();

console.log("=== [GITFLOW] VERSION: 1.0.0 ===");

service.addTask("Estudiar GitFlow");
service.addTask("Estudiar Trunk Based Development");
service.addTask("Crear un proyecto con con Trunk-Based Development");

service.completeTask(1);
service.deleteTask(2);

console.log("[GITFLOW] Lista de Tareas:", service.listTasks());