"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Project } from "@/types";
import { Prisma } from "@prisma/client";

const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  htmlUrl: z.string().url().optional(),
  homepage: z.string().url().optional(),
  language: z.string().optional(),
  topics: z.array(z.string()).default([]),
  stargazersCount: z.number().default(0),
  forksCount: z.number().default(0),
  featured: z.boolean().default(false),
  thumbnail: z.string().optional(),
  content: z.string().optional(),
  images: z.array(z.string()).default([]),
  category: z.enum(["web", "mobile", "backend", "fullstack", "desktop"]).optional(),
});

export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await requireAdmin();
  const validated = projectSchema.parse(data);

  const project = await prisma.project.create({
    data: validated,
  });

  await createAuditLog(session.userId, "create", "project", project.id, { name: project.name });
  revalidatePath("/admin/projects");
  revalidatePath("/");

  return project;
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
  const session = await requireAdmin();
  const validated = projectSchema.partial().parse(data);

  const project = await prisma.project.update({
    where: { id },
    data: validated,
  });

  await createAuditLog(session.userId, "update", "project", project.id, { name: project.name });
  revalidatePath("/admin/projects");
  revalidatePath("/");

  return project;
}

export async function deleteProject(id: string) {
  const session = await requireAdmin();

  await prisma.project.delete({
    where: { id },
  });

  await createAuditLog(session.userId, "delete", "project", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return projects.map((project: Prisma.ProjectGetPayload<object>) => ({
    ...project,
    category: project.category as Project['category'],
  }));
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return null;
  }

  return {
    ...project,
    category: project.category as Project['category'],
  };
}
