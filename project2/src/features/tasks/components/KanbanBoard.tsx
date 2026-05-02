"use client";

import { useState } from "react";
import { useTasksStore } from "../hooks/useTasksStore";
import { TaskCard } from "./TaskCard";
import { NewTaskModal } from "./NewTaskModal";
import type { TaskStatus } from "../types";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "TODO" },
  { status: "in_progress", label: "IN PROGRESS" },
  { status: "review", label: "REVIEW" },
  { status: "done", label: "DONE" },
];

export function KanbanBoard() {
  const tasks = useTasksStore((s) => s.tasks);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<TaskStatus>("todo");
  const [view, setView] = useState<"board" | "list" | "calendar">("board");

  const openModal = (status: TaskStatus) => {
    setModalStatus(status);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(["board", "list", "calendar"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors capitalize ${
                view === v
                  ? "bg-background text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "board" ? "Board" : v === "list" ? "Liste" : "Takvim"}
            </button>
          ))}
        </div>
        <button
          onClick={() => openModal("todo")}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          + Yeni Görev
        </button>
      </div>

      {view === "board" && (
        <div className="grid grid-cols-4 gap-4">
          {columns.map(({ status, label }) => {
            const columnTasks = tasks.filter((t) => t.status === status);
            return (
              <div key={status} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                    {label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground bg-muted rounded-full w-5 h-5 flex items-center justify-center">
                      {columnTasks.length}
                    </span>
                    <button
                      onClick={() => openModal(status)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2 min-h-24">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "list" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Görev
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Durum
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Öncelik
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Atanan
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-foreground">
                    {task.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {task.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground capitalize">
                    {task.priority}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {task.assignee ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {task.dueDate ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "calendar" && (
        <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-64">
          <p className="text-sm text-muted-foreground">
            Takvim görünümü yakında
          </p>
        </div>
      )}

      {showModal && (
        <NewTaskModal
          defaultStatus={modalStatus}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
