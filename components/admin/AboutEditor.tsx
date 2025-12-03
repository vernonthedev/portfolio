"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { updateAbout } from "@/app/actions/about";
import { useRouter } from "next/navigation";
import { AboutData } from "@/types";

export function AboutEditor({
  initialData,
}: {
  initialData: AboutData | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    bio: initialData?.bio || "",
    services: initialData?.services.join("\n") || "",
    stats: JSON.stringify(initialData?.stats || {}, null, 2),
    image: initialData?.image || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateAbout({
          bio: formData.bio,
          services: formData.services.split("\n").filter(Boolean),
          stats: JSON.parse(formData.stats),
          image: formData.image || undefined,
        });
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Error updating about section");
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
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "var(--base)" }}
          >
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            rows={6}
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "var(--base)" }}
          >
            Services (one per line)
          </label>
          <textarea
            value={formData.services}
            onChange={(e) =>
              setFormData({ ...formData, services: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            rows={6}
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "var(--base)" }}
          >
            Stats (JSON)
          </label>
          <textarea
            value={formData.stats}
            onChange={(e) =>
              setFormData({ ...formData, stats: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl border font-mono text-sm"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg)",
              color: "var(--base)",
            }}
            rows={8}
            required
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
