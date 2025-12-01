"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  date: z.date(),
  category: z.string(),
  featured: z.boolean().default(false),
  image: z.string().optional(),
});

export async function createBlogPost(data: z.infer<typeof blogPostSchema>) {
  const session = await requireAdmin();
  const validated = blogPostSchema.parse(data);

  const post = await prisma.blogPost.create({
    data: validated,
  });

  await createAuditLog(session.userId, "create", "blog_post", post.id, { title: post.title });
  revalidatePath("/admin/blog");
  revalidatePath("/");

  return post;
}

export async function updateBlogPost(id: string, data: Partial<z.infer<typeof blogPostSchema>>) {
  const session = await requireAdmin();
  const validated = blogPostSchema.partial().parse(data);

  const post = await prisma.blogPost.update({
    where: { id },
    data: validated,
  });

  await createAuditLog(session.userId, "update", "blog_post", post.id, { title: post.title });
  revalidatePath("/admin/blog");
  revalidatePath("/");

  return post;
}

export async function deleteBlogPost(id: string) {
  const session = await requireAdmin();

  await prisma.blogPost.delete({
    where: { id },
  });

  await createAuditLog(session.userId, "delete", "blog_post", id);
  revalidatePath("/admin/blog");
  revalidatePath("/");
}

export async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: { date: "desc" },
  });
}

