import { cn } from "@/shared/utils/cn";
import type { ProjectStatus } from "../types";

const labels: Record<ProjectStatus, string> = {
  active: "Aktif",
  paused: "Beklemede",
  completed: "Tamamlandı",
  archived: "Arşiv",
};

const styles: Record<ProjectStatus, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
  archived: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
