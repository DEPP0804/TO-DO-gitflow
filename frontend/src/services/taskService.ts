import axios from "axios";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const BASE = "/api/tasks";

export const getTasks = () =>
  axios.get<Task[]>(BASE).then((r) => r.data);

export const addTask = (title: string) =>
  axios.post<Task>(BASE, { title }).then((r) => r.data);

export const completeTask = (id: number) =>
  axios.patch<Task>(`${BASE}/${id}/complete`).then((r) => r.data);

export const editTask = (id: number, title: string) =>
  axios.patch<Task>(`${BASE}/${id}/title`, { title }).then((r) => r.data);

export const deleteTask = (id: number) =>
  axios.delete(`${BASE}/${id}`);