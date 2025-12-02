"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  tagline: z.string().optional(),
  techStack: z.array(z.string()),
});

export async function getHero() {
  const defaultTechStack = [
    "Laravel",
    "Flutter",
    "Next.js",
    "React",
    "TypeScript",
    "PHP",
  ];

  const hero = await prisma.hero.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "The full-stack developer for modern applications",
      subtitle:
        "I help startups and businesses build modern web & mobile applications with clean code and beautiful interfaces.",
      tagline: null,
      techStack: defaultTechStack,
    },
  });
  return hero;
}

export async function updateHero(data: z.infer<typeof heroSchema>) {
  const session = await requireAdmin();
  const validated = heroSchema.parse(data);

  const hero = await prisma.hero.upsert({
    where: { id: "default" },
    update: validated,
    create: { id: "default", ...validated },
  });

  await createAuditLog(session.userId, "update", "hero", hero.id);
  revalidatePath("/admin/hero");
  revalidatePath("/");

  return hero;
}
