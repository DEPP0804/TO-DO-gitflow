import { type Task } from "../services/taskService";
import TaskItem from "./taskItem";
import styles from "../styles/components/taskList.module.css";

type Filter = "all" | "pending" | "done";

interface Props {
  tasks: Task[];
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  onComplete,
  onEdit,
  onDelete,
}: Props) {
  const filters: Filter[] = ["all", "pending", "done"];

  const visible = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <span className={styles.stats}>
          <strong>{doneCount}</strong>/{tasks.length} completed
        </span>
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
              onClick={() => onFilterChange(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {visible.length === 0 ? (
          <p className={styles.empty}>No tasks here.</p>
        ) : (
          visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}