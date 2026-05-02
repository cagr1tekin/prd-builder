"use client";

import { cn } from "@/shared/utils/cn";
import type { Task, TaskStatus } from "../types";
import { useTasksStore } from "../hooks/useTasksStore";

const priorityColors = {
  low: "bg-blue-100 text-blue-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-600",
};

const priorityLabels = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

const statusColumns: TaskStatus[] = ["todo", "in_progress", "review", "done"];

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const moveTask = useTasksStore((s) => s.moveTask);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  const currentIndex = statusColumns.indexOf(task.status);

  return (
    <div className="bg-card border border-border rounded-lg p-3 space-y-2 group">
      <p className="text-sm text-foreground leading-snug">{task.title}</p>
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-1">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            priorityColors[task.priority]
          )}
        >
          {priorityLabels[task.priority]}
        </span>
        {task.assignee && (
          <div className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {task.assignee[0]}
            </span>
          </div>
        )}
      </div>
      {task.dueDate && (
        <p className="text-xs text-muted-foreground">{task.dueDate}</p>
      )}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
        {currentIndex > 0 && (
          <button
            onClick={() => moveTask(task.id, statusColumns[currentIndex - 1])}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5"
          >
            ←
          </button>
        )}
        {currentIndex < statusColumns.length - 1 && (
          <button
            onClick={() => moveTask(task.id, statusColumns[currentIndex + 1])}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5"
          >
            →
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="ml-auto text-xs text-muted-foreground hover:text-destructive border border-border rounded px-1.5 py-0.5"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
