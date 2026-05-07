import { useState } from "react";
import { type Task } from "../services/taskService";
import styles from "../styles/components/taskItem.module.css";

interface Props {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onComplete, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === task.title) {
      setEditing(false);
      setValue(task.title);
      return;
    }
    onEdit(task.id, trimmed);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditing(false);
      setValue(task.title);
    }
  };

  return (
    <div className={`${styles.item} ${task.completed ? styles.done : ""}`}>
      <button
        className={styles.check}
        onClick={() => !task.completed && onComplete(task.id)}
        aria-label="Complete task"
        disabled={task.completed}
      >
        {task.completed && (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,8 7,12 13,4" />
          </svg>
        )}
      </button>

      <div className={styles.title}>
        {editing ? (
          <input
            className={styles.editInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <span>{task.title}</span>
        )}
      </div>

      <div className={styles.actions}>
        {!task.completed && (
          <button
            className={`${styles.iconBtn} ${styles.edit}`}
            onClick={() => setEditing((v) => !v)}
            aria-label="Edit task"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 2l3 3L5 14H2v-3L11 2z" />
            </svg>
          </button>
        )}
        <button
          className={`${styles.iconBtn} ${styles.del}`}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,4 13,4" />
            <path d="M5 4V2h6v2" />
            <path d="M4 4l1 10h6l1-10" />
          </svg>
        </button>
      </div>
    </div>
  );
}