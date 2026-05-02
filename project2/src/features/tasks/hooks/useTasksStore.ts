import { create } from "zustand";
import type { Task, TasksState } from "../types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Kullanıcı kimlik doğrulama akışını tasarla",
    description: "OAuth 2.0 entegrasyonu gerekiyor",
    status: "todo",
    priority: "high",
    assignee: "Ali",
    dueDate: "2026-05-10",
  },
  {
    id: "2",
    title: "API endpoint'lerini belgelendir",
    status: "todo",
    priority: "medium",
    assignee: "Ayşe",
  },
  {
    id: "3",
    title: "Dashboard bileşenlerini geliştir",
    status: "todo",
    priority: "medium",
    assignee: "Mehmet",
    dueDate: "2026-05-15",
  },
  {
    id: "4",
    title: "Veritabanı şemasını optimize et",
    status: "in_progress",
    priority: "high",
    assignee: "Zeynep",
    dueDate: "2026-05-08",
  },
  {
    id: "5",
    title: "Mobil responsive tasarım",
    status: "in_progress",
    priority: "medium",
    assignee: "Can",
  },
  {
    id: "6",
    title: "Bildirim servisini kur",
    status: "in_progress",
    priority: "low",
    assignee: "Ali",
    dueDate: "2026-05-12",
  },
  {
    id: "7",
    title: "Unit testleri yaz",
    status: "review",
    priority: "medium",
    assignee: "Ayşe",
  },
  {
    id: "8",
    title: "Performance iyileştirmeleri",
    status: "review",
    priority: "high",
    assignee: "Zeynep",
    dueDate: "2026-05-07",
  },
  {
    id: "9",
    title: "Proje oluşturma formu",
    status: "review",
    priority: "medium",
    assignee: "Mehmet",
  },
  {
    id: "10",
    title: "Login sayfası tasarımı",
    status: "done",
    priority: "high",
    assignee: "Can",
  },
];

let nextId = 11;

export const useTasksStore = create<TasksState>((set) => ({
  tasks: mockTasks,

  addTask: (task) => {
    const newTask: Task = { ...task, id: String(nextId++) };
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
  },

  moveTask: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },
}));
