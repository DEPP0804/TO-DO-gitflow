import { TaskService } from "./services/taskService";

const service = new TaskService();

service.addTask("Estudiar GitFlow");
service.addTask("Estudiar Trunk Based Development");
service.addTask("Crear un proyecto con con Trunk-Based Development");

service.completeTask(1);
service.deleteTask(2);

console.log("[GITFLOW] Tasks:", service.listTasks());