import { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  completeTask,
  editTask,
  deleteTask,
  type Task,
} from "./services/taskService";
import AddTask from "./components/addTask";
import TaskList from "./components/taskList";
import styles from "./styles/app.module.css";

type Filter = "all" | "pending" | "done";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [toast, setToast] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAdd = async (title: string) => {
    const task = await addTask(title);
    setTasks((prev) => [...prev, task]);
    showToast("Task added");
  };

  const handleComplete = async (id: number) => {
    const updated = await completeTask(id);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast("Task completed ✓");
  };

  const handleEdit = async (id: number, title: string) => {
    const updated = await editTask(id, title);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast("Task updated");
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Task deleted");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>GitFlow · feature/react-frontend</span>
        <h1 className={styles.title}>
          Task<span className={styles.accent}>Flow</span>
        </h1>
        <p className={styles.subtitle}>Node + Express · React + Vite · TypeScript</p>
      </header>

      <main className={styles.main}>
        <AddTask onAdd={handleAdd} />
        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}