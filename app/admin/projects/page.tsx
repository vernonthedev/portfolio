import { getProjects } from "@/app/actions/projects";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Error fetching admin projects:", error);
  }

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

