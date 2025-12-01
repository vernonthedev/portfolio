import { getAbout } from "@/app/actions/about";
import { AboutEditor } from "@/components/admin/AboutEditor";

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          About Section
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Edit your about section content
        </p>
      </div>

      <AboutEditor initialData={about} />
    </div>
  );
}

