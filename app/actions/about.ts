"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const aboutSchema = z.object({
  bio: z.string(),
  services: z.array(z.string()),
  stats: z.record(z.any()),
  image: z.string().optional(),
});

export async function getAbout() {
  const about = await prisma.about.findFirst();
  return about;
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

