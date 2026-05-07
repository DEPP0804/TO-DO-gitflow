import { Router } from "express";
import { TaskService } from "../services/taskService";

const router = Router();
const service = new TaskService();

router.get("/", (_req, res) => {
  res.json(service.listTasks());
});

router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const task = service.addTask(title.trim());
  res.status(201).json(task);
});

router.patch("/:id/complete", (req, res) => {
  const id = parseInt(req.params.id);
  const task = service.completeTask(id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});

router.patch("/:id/title", (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const task = service.editTask(id, title.trim());
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = service.deleteTask(id);
  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.status(204).send();
});

export default router;