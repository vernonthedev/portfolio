import { getProjects } from "@/app/actions/projects";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Projects
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Manage your portfolio projects
        </p>
      </div>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}

