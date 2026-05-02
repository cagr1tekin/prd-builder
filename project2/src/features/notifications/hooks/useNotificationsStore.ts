import { create } from "zustand";
import type { Notification, NotificationsState } from "../types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "Ali sizi bahsetti",
    body: "Mobil Uygulama Yenileme projesinde bir yorum yaptı ve sizden bahsetti.",
    read: false,
    createdAt: "2026-05-01T10:30:00Z",
    actor: "Ali",
  },
  {
    id: "2",
    type: "assignment",
    title: "Yeni görev atandı",
    body: "Dashboard bileşenleri geliştirme görevi size atandı.",
    read: false,
    createdAt: "2026-05-01T09:15:00Z",
    actor: "Ayşe",
  },
  {
    id: "3",
    type: "deadline",
    title: "Deadline yaklaşıyor",
    body: "API Entegrasyonu projesi için 3 gün kaldı.",
    read: false,
    createdAt: "2026-04-30T14:00:00Z",
  },
  {
    id: "4",
    type: "comment",
    title: "Yeni yorum",
    body: "Zeynep, Veritabanı Optimizasyonu görevine yorum ekledi.",
    read: true,
    createdAt: "2026-04-30T11:45:00Z",
    actor: "Zeynep",
  },
  {
    id: "5",
    type: "assignment",
    title: "Proje güncellendi",
    body: "Dashboard Tasarımı projesinin durumu Beklemede olarak güncellendi.",
    read: true,
    createdAt: "2026-04-29T16:20:00Z",
    actor: "Mehmet",
  },
];

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: mockNotifications,

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },
}));
