"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createProject, updateProject, deleteProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  description: string;
  htmlUrl?: string | null;
  homepage?: string | null;
  language?: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  featured: boolean;
  thumbnail?: string | null;
  category?: string | null;
}

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    htmlUrl: "",
    homepage: "",
    language: "",
    topics: "",
    stargazersCount: 0,
    forksCount: 0,
    featured: false,
    thumbnail: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = {
          ...formData,
          topics: formData.topics.split(",").map((t) => t.trim()).filter(Boolean),
          stargazersCount: parseInt(String(formData.stargazersCount)) || 0,
          forksCount: parseInt(String(formData.forksCount)) || 0,
        };
        if (editing) {
          await updateProject(editing.id, data);
        } else {
          await createProject(data);
        }
        router.refresh();
        setShowModal(false);
        setEditing(null);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setFormData({
      name: project.name,
      description: project.description,
      htmlUrl: project.htmlUrl || "",
      homepage: project.homepage || "",
      language: project.language || "",
      topics: project.topics.join(", "),
      stargazersCount: project.stargazersCount,
      forksCount: project.forksCount,
      featured: project.featured,
      thumbnail: project.thumbnail || "",
      category: project.category || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    startTransition(async () => {
      await deleteProject(id);
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
            All Projects
          </h2>
          <motion.button
            onClick={() => {
              setEditing(null);
              setFormData({
                name: "",
                description: "",
                htmlUrl: "",
                homepage: "",
                language: "",
                topics: "",
                stargazersCount: 0,
                forksCount: 0,
                featured: false,
                thumbnail: "",
                category: "",
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
            Add Project
          </motion.button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: "var(--base)" }}>
                    {project.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "var(--grey)" }}>
                    {project.description.substring(0, 100)}...
                  </p>
                  <div className="flex gap-2 text-xs" style={{ color: "var(--grey)" }}>
                    {project.category && <span>{project.category}</span>}
                    {project.featured && <span>⭐ Featured</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-lg"
                    style={{ color: "var(--orange)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(project.id)}
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
              className="w-full max-w-2xl p-6 rounded-[2.5em] border my-8"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-d)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-youth font-bold" style={{ color: "var(--base)" }}>
                  {editing ? "Edit Project" : "Add Project"}
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
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                      style={{
                        borderColor: "var(--border-subtle)",
                        backgroundColor: "var(--bg)",
                        color: "var(--base)",
                      }}
                    >
                      <option value="">Select category</option>
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Full Stack</option>
                      <option value="desktop">Desktop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg)",
                      color: "var(--base)",
                    }}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.htmlUrl}
                      onChange={(e) => setFormData({ ...formData, htmlUrl: e.target.value })}
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
                      Homepage URL
                    </label>
                    <input
                      type="url"
                      value={formData.homepage}
                      onChange={(e) => setFormData({ ...formData, homepage: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                      style={{
                        borderColor: "var(--border-subtle)",
                        backgroundColor: "var(--bg)",
                        color: "var(--base)",
                      }}
                    />
                  </div>
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
                    Featured Project
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

