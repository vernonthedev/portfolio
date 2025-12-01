import { getSkills } from "@/app/actions/skills";
import { SkillsTable } from "@/components/admin/SkillsTable";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
            Skills
          </h1>
          <p className="text-sm" style={{ color: "var(--grey)" }}>
            Manage your technical skills and expertise
          </p>
        </div>
      </div>

      <SkillsTable initialSkills={skills} />
    </div>
  );
}

