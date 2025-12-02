"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1),
  level: z.number().min(0).max(100),
  category: z.string(),
  icon: z.string().optional(),
  order: z.number().default(0),
});

export async function createSkill(data: z.infer<typeof skillSchema>) {
  const session = await requireAdmin();
  const validated = skillSchema.parse(data);

  const skill = await prisma.skill.create({
    data: validated,
  });

  await createAuditLog(session.userId, "create", "skill", skill.id, { name: skill.name });
  revalidatePath("/admin/skills");
  revalidatePath("/");

  return skill;
}

export async function updateSkill(id: string, data: Partial<z.infer<typeof skillSchema>>) {
  const session = await requireAdmin();
  const validated = skillSchema.partial().parse(data);

  const skill = await prisma.skill.update({
    where: { id },
    data: validated,
  });

  await createAuditLog(session.userId, "update", "skill", skill.id, { name: skill.name });
  revalidatePath("/admin/skills");
  revalidatePath("/");

  return skill;
}

export async function deleteSkill(id: string) {
  const session = await requireAdmin();

  await prisma.skill.delete({
    where: { id },
  });

  await createAuditLog(session.userId, "delete", "skill", id);
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function getSkills() {
  return prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
}

