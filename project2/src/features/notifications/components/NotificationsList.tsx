"use client";

import { useState } from "react";
import { useNotificationsStore } from "../hooks/useNotificationsStore";
import { NotificationItem } from "./NotificationItem";

type Tab = "all" | "unread" | "mentions";

export function NotificationsList() {
  const { notifications, markAllAsRead } = useNotificationsStore();
  const [tab, setTab] = useState<Tab>("all");

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read;
    if (tab === "mentions") return n.type === "mention";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(["all", "unread", "mentions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                tab === t
                  ? "bg-background text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "Tümü" : t === "unread" ? "Okunmamış" : "Bahsedenler"}
              {t === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm border border-border rounded-md text-foreground hover:bg-muted transition-colors"
          >
            Tümünü Okundu İşaretle
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Bildirim bulunamadı.
          </div>
        ) : (
          filtered.map((n) => <NotificationItem key={n.id} notification={n} />)
        )}
      </div>
    </div>
  );
}
