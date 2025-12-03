"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AboutData } from "@/types";

const aboutSchema = z.object({
  bio: z.string(),
  services: z.array(z.string()),
  stats: z.array(z.object({
    icon: z.string(),
    label: z.string(),
    value: z.string(),
    color: z.string(),
  })),
  image: z.string().optional(),
});

export async function getAbout() {
  const defaultStats = [
    { icon: "Code", label: "Projects Built", value: "50+", color: "var(--orange)" },
    { icon: "Youtube", label: "YouTube Videos", value: "100+", color: "var(--purple)" },
    { icon: "Rocket", label: "Years Experience", value: "5+", color: "var(--orange)" },
    { icon: "Zap", label: "Happy Clients", value: "30+", color: "var(--purple)" },
  ];
  const defaultServices = [
    "Build scalable web applications with Laravel & Next.js",
    "Create beautiful mobile apps with Flutter",
    "Develop Progressive Web Apps (PWAs)",
    "Design and implement RESTful APIs",
    "Set up CI/CD pipelines and DevOps workflows",
    "Share knowledge through YouTube tutorials",
  ];

  const about = await prisma.about.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      bio: "My journey in software development started with curiosity and evolved into a passion for creating elegant, efficient, and user-friendly applications.\n\nI specialize in Laravel for robust backend systems, Flutter for beautiful mobile experiences, and modern JavaScript frameworks for dynamic web applications. When I'm not coding, you'll find me sharing my knowledge on YouTube, contributing to open-source projects, or exploring the latest tech trends.\n\nI believe in building in public, sharing my journey, and helping others grow. Every project is an opportunity to learn something new and push the boundaries of what's possible.",
      services: defaultServices,
      stats: defaultStats,
      image: null,
    },
  });

  // Explicitly cast stats to the correct type
  return {
    ...about,
    stats: about.stats as AboutData['stats'],
  };
}

export async function updateAbout(data: z.infer<typeof aboutSchema>) {
  const session = await requireAdmin();
  const validated = aboutSchema.parse(data);

  const about = await prisma.about.upsert({
    where: { id: "default" },
    update: validated,
    create: { id: "default", ...validated },
  });

  await createAuditLog(session.userId, "update", "about", about.id);
  revalidatePath("/admin/about");
  revalidatePath("/");

  return about;
}

