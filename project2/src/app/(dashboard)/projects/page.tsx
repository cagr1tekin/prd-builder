import { Header } from "@/shared/components/Header";
import { ProjectsTable } from "@/features/projects/components/ProjectsTable";

export default function ProjectsPage() {
  return (
    <>
      <Header title="Projeler" />
      <ProjectsTable />
    </>
  );
}
