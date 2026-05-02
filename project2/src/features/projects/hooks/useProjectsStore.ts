import { create } from "zustand";
import type { Project, ProjectsState } from "../types";

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mobil Uygulama Yenileme",
    status: "active",
    members: [
      { id: "1", name: "Ali" },
      { id: "2", name: "Ayşe" },
      { id: "3", name: "Mehmet" },
    ],
    progress: 72,
    dueDate: "2026-06-15",
    archived: false,
  },
  {
    id: "2",
    name: "API Entegrasyonu",
    status: "active",
    members: [
      { id: "1", name: "Ali" },
      { id: "4", name: "Zeynep" },
    ],
    progress: 45,
    dueDate: "2026-05-30",
    archived: false,
  },
  {
    id: "3",
    name: "Dashboard Tasarımı",
    status: "paused",
    members: [
      { id: "2", name: "Ayşe" },
      { id: "3", name: "Mehmet" },
      { id: "5", name: "Can" },
    ],
    progress: 88,
    dueDate: "2026-07-01",
    archived: false,
  },
  {
    id: "4",
    name: "Veritabanı Optimizasyonu",
    status: "completed",
    members: [{ id: "4", name: "Zeynep" }],
    progress: 100,
    dueDate: "2026-04-20",
    archived: false,
  },
];

let nextId = 5;

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: mockProjects,
  isLoading: false,

  addProject: (project) => {
    const newProject: Project = { ...project, id: String(nextId++) };
    set((state) => ({ projects: [newProject, ...state.projects] }));
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  },

  archiveProject: (id) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, archived: true } : p
      ),
    }));
  },
}));
