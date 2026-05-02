export type NotificationType = "mention" | "assignment" | "deadline" | "comment";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  actor?: string;
}

export interface NotificationsState {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}
