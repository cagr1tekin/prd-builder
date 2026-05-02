import { Header } from "@/shared/components/Header";
import { KanbanBoard } from "@/features/tasks/components/KanbanBoard";

export default function TasksPage() {
  return (
    <>
      <Header title="Görevler" />
      <KanbanBoard />
    </>
  );
}
