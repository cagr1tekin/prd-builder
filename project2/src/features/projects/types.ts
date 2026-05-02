export type ProjectStatus = "active" | "paused" | "completed" | "archived";

export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  members: ProjectMember[];
  progress: number;
  dueDate: string;
  archived: boolean;
}

export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
}
