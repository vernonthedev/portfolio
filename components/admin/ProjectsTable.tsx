"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Project } from "@/types";

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (project: Project) => {
    // Navigate to a dedicated edit page for the project
    router.push(`/admin/projects/${project.slug}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    startTransition(async () => {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
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
              router.push("/admin/projects/create");
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
    </>
  );
}