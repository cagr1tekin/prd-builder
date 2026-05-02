import axios from "axios";
import type { Task } from "./types";

const api = axios.create({ baseURL: "/api" });

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const { data } = await api.post<Task>("/tasks", task);
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, updates);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
