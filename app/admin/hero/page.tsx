import { getHero } from "@/app/actions/hero";
import { HeroEditor } from "@/components/admin/HeroEditor";

export const dynamic = 'force-dynamic';

export default async function AdminHeroPage() {
  const hero = await getHero();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Hero Section
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Edit your hero section content
        </p>
      </div>

      <HeroEditor initialData={hero} />
    </div>
  );
}

