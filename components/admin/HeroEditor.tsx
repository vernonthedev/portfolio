"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { updateHero } from "@/app/actions/hero";
import { useRouter } from "next/navigation";

interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string | null;
  techStack: string[];
}

export function HeroEditor({ initialData }: { initialData: HeroData | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    tagline: initialData?.tagline || "",
    techStack: initialData?.techStack.join(", ") || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateHero({
          title: formData.title,
          subtitle: formData.subtitle,
          tagline: formData.tagline || undefined,
          techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
        });
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Error updating hero section");
      }
    });
  };

  return (
    <div
      className="p-6 rounded-[2.5em] border"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-d)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
            Subtitle
          </label>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
            Tagline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            placeholder="Laravel, Flutter, Next.js"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(135deg, var(--orange), var(--purple))",
            color: "var(--bg)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-5 h-5" />
          {isPending ? "Saving..." : "Save Changes"}
        </motion.button>
      </form>
    </div>
  );
}

