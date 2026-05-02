import { cn } from "@/shared/utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 flex flex-col gap-2",
        className
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-2xl font-semibold text-card-foreground">
        {value}
      </span>
    </div>
  );
}
