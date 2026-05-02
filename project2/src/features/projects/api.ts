import axios from "axios";
import type { Project } from "./types";

const api = axios.create({ baseURL: "/api" });

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}

export async function createProject(
  project: Omit<Project, "id">
): Promise<Project> {
  const { data } = await api.post<Project>("/projects", project);
  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project> {
  const { data } = await api.patch<Project>(`/projects/${id}`, updates);
  return data;
}
