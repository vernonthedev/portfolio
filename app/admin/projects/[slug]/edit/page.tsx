"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { updateProject, getProjectBySlug } from "@/app/actions/projects";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Project } from "@/types";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params.slug as string;

  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);

  const [formData, setFormData] = useState<{
    slug: string;
    name: string;
    description: string;
    htmlUrl: string;
    homepage: string;
    language: string;
    topics: string;
    stargazersCount: number;
    forksCount: number;
    featured: boolean;
    thumbnail: string;
    content: string;
    images: string;
    category: NonNullable<Project["category"]> | "";
  }>({
    slug: "",
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
    content: "",
    images: "",
    category: "",
  });

  useEffect(() => {
    async function loadProjectData() {
      if (projectSlug) {
        const fetchedProject = await getProjectBySlug(projectSlug);
        if (fetchedProject) {
          setProject(fetchedProject);
          setFormData({
            slug: fetchedProject.slug,
            name: fetchedProject.name,
            description: fetchedProject.description,
            htmlUrl: fetchedProject.htmlUrl || "",
            homepage: fetchedProject.homepage || "",
            language: fetchedProject.language || "",
            topics: fetchedProject.topics.join(", "),
            stargazersCount: fetchedProject.stargazersCount,
            forksCount: fetchedProject.forksCount,
            featured: fetchedProject.featured ?? false,
            thumbnail: fetchedProject.thumbnail || "",
            content: fetchedProject.content || "",
            images: fetchedProject.images ? fetchedProject.images.join(", ") : "",
            category: fetchedProject.category || "",
          });
        } else {
          // Handle project not found
          router.push("/admin/projects");
        }
      }
      setLoadingProject(false);
    }
    loadProjectData();
  }, [projectSlug, router]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = slugify(name);
    setFormData({ ...formData, name, slug });
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
      } else {
        console.error("Image upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return; // Should not happen if project is loaded

    startTransition(async () => {
      try {
        const data = {
          slug: formData.slug,
          name: formData.name,
          description: formData.description,
          htmlUrl: formData.htmlUrl || undefined,
          homepage: formData.homepage || undefined,
          language: formData.language || undefined,
          topics: formData.topics.split(",").map((t) => t.trim()).filter(Boolean),
          stargazersCount: parseInt(String(formData.stargazersCount)) || 0,
          forksCount: parseInt(String(formData.forksCount)) || 0,
          featured: formData.featured,
          thumbnail: formData.thumbnail || undefined,
          content: formData.content || undefined,
          images: formData.images.split(",").map((img) => img.trim()).filter(Boolean),
          category: formData.category || undefined,
        };
        await updateProject(project.id, data);
        router.push("/admin/projects"); // Redirect after creation
        router.refresh(); // Refresh data on the projects list page
      } catch (error) {
        console.error(error);
      }
    });
  };

  const simplemdeOptions = useMemo(() => ({
    spellChecker: false,
    autofocus: true,
    toolbar: [
      "bold", "italic", "heading", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "preview", "guide"
    ],
    uploadImage: true,
    imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
      const body = new FormData();
      body.append("file", file);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body,
        });
        const data = await response.json();
        if (data.success) {
          onSuccess(data.url);
        } else {
          onError("Image upload failed: " + (data.error || "Unknown error"));
        }
      } catch (error: any) {
        onError("Error uploading image: " + (error.message || "Unknown error"));
      }
    },
  }), []);

  if (loadingProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-orange border-r-purple border-b-orange border-l-purple rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl mb-4" style={{ color: "var(--base)" }}>Project not found.</p>
        <button
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-3 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(135deg, var(--orange), var(--purple))",
            color: "var(--bg)",
          }}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
          Edit Project: {project.name}
        </h1>
        <p className="text-sm" style={{ color: "var(--grey)" }}>
          Modify project details
        </p>
      </div>

      <motion.button
        onClick={() => router.push("/admin/projects")}
        className="mb-6 flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-sm"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-d)",
          color: "var(--base)",
        }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Projects</span>
      </motion.button>

      <div
        className="p-6 rounded-[2.5em] border"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-d)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
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
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                readOnly
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
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
              Content (Markdown)
            </label>
            <SimpleMdeReact
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              options={simplemdeOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as NonNullable<Project["category"]> | "",
                  })
                }
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

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--base)" }}>
              Project Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              style={{ color: "var(--grey)" }}
            />
            {isUploading && <p className="text-sm mt-2" style={{ color: "var(--orange)" }}>Uploading...</p>}
            {formData.thumbnail && !isUploading && (
              <div className="mt-4 relative w-full max-w-xs h-48">
                <Image src={formData.thumbnail} alt="Preview" fill sizes="100px" className="rounded-lg object-cover" />
              </div>
            )}
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
              disabled={isPending || isUploading}
              className="flex-1 py-3 rounded-xl font-semibold"
              style={{
                background: "linear-gradient(135deg, var(--orange), var(--purple))",
                color: "var(--bg)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPending ? "Updating..." : "Update Project"}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => router.push("/admin/projects")}
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
      </div>
    </div>
  );
}