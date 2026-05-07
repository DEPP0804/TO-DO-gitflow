import { TaskService } from "../services/taskService";
import * as storage from "../utils/storage";

// Mock del storage para no tocar el sistema de archivos
jest.mock("../utils/storage", () => ({
  loadTasks: jest.fn(() => []),
  saveTasks: jest.fn(),
}));

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    jest.clearAllMocks();
    (storage.loadTasks as jest.Mock).mockReturnValue([]);
    service = new TaskService();
  });

  describe("addTask", () => {
    it("debe agregar una tarea y retornarla", () => {
      const task = service.addTask("Estudiar GitFlow");

      expect(task).toEqual({
        id: 1,
        title: "Estudiar GitFlow",
        completed: false,
      });
    });

    it("debe incrementar el ID por cada tarea agregada", () => {
      const t1 = service.addTask("Tarea 1");
      const t2 = service.addTask("Tarea 2");

      expect(t1.id).toBe(1);
      expect(t2.id).toBe(2);
    });

    it("debe llamar a saveTasks al agregar", () => {
      service.addTask("Tarea");
      expect(storage.saveTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe("listTasks", () => {
    it("debe retornar lista vacía al inicio", () => {
      expect(service.listTasks()).toEqual([]);
    });

    it("debe retornar todas las tareas agregadas", () => {
      service.addTask("Tarea 1");
      service.addTask("Tarea 2");

      expect(service.listTasks()).toHaveLength(2);
    });
  });

  describe("completeTask", () => {
    it("debe marcar una tarea como completada", () => {
      service.addTask("Tarea");
      const updated = service.completeTask(1);

      expect(updated?.completed).toBe(true);
    });

    it("debe retornar null si la tarea no existe", () => {
      const result = service.completeTask(999);
      expect(result).toBeNull();
    });

    it("debe llamar a saveTasks al completar", () => {
      service.addTask("Tarea");
      jest.clearAllMocks();
      service.completeTask(1);

      expect(storage.saveTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe("editTask", () => {
    it("debe editar el título de una tarea", () => {
      service.addTask("Título original");
      const updated = service.editTask(1, "Título editado");

      expect(updated?.title).toBe("Título editado");
    });

    it("debe retornar null si la tarea no existe", () => {
      const result = service.editTask(999, "Nuevo título");
      expect(result).toBeNull();
    });

    it("debe llamar a saveTasks al editar", () => {
      service.addTask("Tarea");
      jest.clearAllMocks();
      service.editTask(1, "Editada");

      expect(storage.saveTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteTask", () => {
    it("debe eliminar una tarea existente y retornar true", () => {
      service.addTask("Tarea");
      const result = service.deleteTask(1);

      expect(result).toBe(true);
      expect(service.listTasks()).toHaveLength(0);
    });

    it("debe retornar false si la tarea no existe", () => {
      const result = service.deleteTask(999);
      expect(result).toBe(false);
    });

    it("debe llamar a saveTasks al eliminar", () => {
      service.addTask("Tarea");
      jest.clearAllMocks();
      service.deleteTask(1);

      expect(storage.saveTasks).toHaveBeenCalledTimes(1);
    });
  });
});