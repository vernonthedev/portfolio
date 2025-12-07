import { getBlogPosts } from "@/app/actions/blog";
import { BlogTable } from "@/components/admin/BlogTable";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Blog Posts
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Manage your blog content
        </p>
      </div>

      <BlogTable initialPosts={posts} />
    </div>
  );
}

