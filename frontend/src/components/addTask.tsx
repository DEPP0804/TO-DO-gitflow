import { useState } from "react";
import styles from "../styles/components/addTask.module.css";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="New task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      <button className={styles.button} type="submit">
        + Add
      </button>
    </form>
  );
}