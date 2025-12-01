"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createSkill, updateSkill, deleteSkill } from "@/app/actions/skills";
import { useRouter } from "next/navigation";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string | null;
  order: number;
}

export function SkillsTable({ initialSkills }: { initialSkills: Skill[] }) {
  const router = useRouter();
  const [skills, setSkills] = useState(initialSkills);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    level: 0,
    category: "frontend",
    icon: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editing) {
          await updateSkill(editing.id, formData);
        } else {
          await createSkill(formData);
        }
        router.refresh();
        setShowModal(false);
        setEditing(null);
        setFormData({ name: "", level: 0, category: "frontend", icon: "", order: 0 });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleEdit = (skill: Skill) => {
    setEditing(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || "",
      order: skill.order,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    startTransition(async () => {
      await deleteSkill(id);
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
            All Skills
          </h2>
          <motion.button
            onClick={() => {
              setEditing(null);
              setFormData({ name: "", level: 0, category: "frontend", icon: "", order: 0 });
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
            Add Skill
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                  Level
                </th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                  Order
                </th>
                <th className="text-right py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr
                  key={skill.id}
                  className="border-b hover:bg-opacity-50 transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <td className="py-3 px-4 font-semibold" style={{ color: "var(--base)" }}>
                    {skill.name}
                  </td>
                  <td className="py-3 px-4" style={{ color: "var(--grey)" }}>
                    {skill.level}%
                  </td>
                  <td className="py-3 px-4" style={{ color: "var(--grey)" }}>
                    {skill.category}
                  </td>
                  <td className="py-3 px-4" style={{ color: "var(--grey)" }}>
                    {skill.order}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        onClick={() => handleEdit(skill)}
                        className="p-2 rounded-lg"
                        style={{ color: "var(--orange)" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 rounded-lg"
                        style={{ color: "var(--red)" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 rounded-[2.5em] border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-d)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-youth font-bold" style={{ color: "var(--base)" }}>
                  {editing ? "Edit Skill" : "Add Skill"}
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
                    Level (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
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
                    required
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl border"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg)",
                      color: "var(--base)",
                    }}
                  />
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

