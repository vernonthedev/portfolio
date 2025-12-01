"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/actions/blog";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  category: string;
  featured: boolean;
  image?: string | null;
}

export function BlogTable({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    featured: false,
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = {
          ...formData,
          date: new Date(formData.date),
        };
        if (editing) {
          await updateBlogPost(editing.id, data);
        } else {
          await createBlogPost(data);
        }
        router.refresh();
        setShowModal(false);
        setEditing(null);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: new Date(post.date).toISOString().split("T")[0],
      category: post.category,
      featured: post.featured,
      image: post.image || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    startTransition(async () => {
      await deleteBlogPost(id);
      router.refresh();
    });
  };

  return (
    <>
      <div
        className="p-6 rounded-[2.5em] border"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-d)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-youth font-bold" style={{ color: "var(--base)" }}>
            All Posts
          </h2>
          <motion.button
            onClick={() => {
              setEditing(null);
              setFormData({
                slug: "",
                title: "",
                excerpt: "",
                content: "",
                date: new Date().toISOString().split("T")[0],
                category: "",
                featured: false,
                image: "",
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--orange), var(--purple))",
              color: "var(--bg)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Post
          </motion.button>
        </div>

        <div className="space-y-4">
          {initialPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: "var(--base)" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "var(--grey)" }}>
                    {post.excerpt.substring(0, 100)}...
                  </p>
                  <div className="flex gap-2 text-xs" style={{ color: "var(--grey)" }}>
                    <span>{post.category}</span>
                    {post.featured && <span>⭐ Featured</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg"
                    style={{ color: "var(--orange)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg"
                    style={{ color: "var(--red)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-3xl p-6 rounded-[2.5em] border my-8"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-d)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-youth font-bold" style={{ color: "var(--base)" }}>
                  {editing ? "Edit Post" : "Add Post"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg"
                  style={{ color: "var(--base)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                      style={{
                        borderColor: "var(--border-subtle)",
                        backgroundColor: "var(--bg)",
                        color: "var(--base)",
                      }}
                      required
                    />
                  </div>
                </div>

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
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
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
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg)",
                      color: "var(--base)",
                    }}
                    rows={10}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold" style={{ color: "var(--base)" }}>
                    Featured Post
                  </label>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-3 rounded-xl font-semibold"
                    style={{
                      background: "linear-gradient(135deg, var(--orange), var(--purple))",
                      color: "var(--bg)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isPending ? "Saving..." : editing ? "Update" : "Create"}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-xl border font-semibold"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg)",
                      color: "var(--base)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

