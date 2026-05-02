"use client";

import { cn } from "@/shared/utils/cn";
import type { Notification } from "../types";
import { useNotificationsStore } from "../hooks/useNotificationsStore";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "az önce";
  if (hours < 24) return `${hours}s önce`;
  return `${Math.floor(hours / 24)}g önce`;
}

export function NotificationItem({ notification }: { notification: Notification }) {
  const markAsRead = useNotificationsStore((s) => s.markAsRead);

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer",
        !notification.read && "border-l-2 border-l-primary bg-primary/5"
      )}
      onClick={() => !notification.read && markAsRead(notification.id)}
    >
      <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0 flex items-center justify-center border border-border">
        <span className="text-sm text-muted-foreground">
          {notification.actor ? notification.actor[0] : "!"}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{notification.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {notification.body}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-muted-foreground">
          {timeAgo(notification.createdAt)}
        </span>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        )}
      </div>
    </div>
  );
}
