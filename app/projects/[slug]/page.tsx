"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Star, GitFork, Calendar, Code, Globe } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";
import { getProjectBySlug } from "@/app/actions/projects";
import { formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const foundProject = await getProjectBySlug(params.slug as string);
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-4xl font-youth mb-4" style={{ color: "var(--base)" }}>Project Not Found</h1>
          <button
            onClick={() => router.push("/#projects")}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--orange), var(--purple))",
              color: "var(--bg)",
            }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-60"
              style={{
                background: "linear-gradient(135deg, var(--purple), var(--orange))",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          </div>
        </motion.div>

        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.button
              onClick={() => router.push("/#projects")}
              className="mb-12 flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm"
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

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-4 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, var(--orange), var(--purple))",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Code className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-youth font-bold mb-2" style={{ color: "var(--base)" }}>
                    {project.name}
                  </h1>
                                     <p className="text-xl" style={{ color: "var(--grey)" }}>
                                      {project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : ""} Project
                                    </p>                </div>
              </div>

              <p className="text-2xl leading-relaxed max-w-4xl" style={{ color: "var(--grey)" }}>
                {project.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 space-y-8"
              >
                <div
                  className="p-10 rounded-[2.5em] border backdrop-blur-sm"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-d)",
                  }}
                >
                  <h2 className="text-3xl font-youth font-bold mb-6" style={{ color: "var(--base)" }}>
                    Project Overview
                  </h2>
                  {project.content ? (
                    <div className="prose prose-lg max-w-none" style={{ color: "var(--grey)" }}>
                      <ReactMarkdown>{project.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-lg leading-relaxed" style={{ color: "var(--grey)" }}>
                      No detailed content available for this project.
                    </p>
                  )}
                </div>

                {project.topics && project.topics.length > 0 && (
                  <div
                    className="p-10 rounded-[2.5em] border backdrop-blur-sm"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg-d)",
                    }}
                  >
                    <h2 className="text-3xl font-youth font-bold mb-6" style={{ color: "var(--base)" }}>
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {project.topics.map((topic, index) => (
                        <motion.span
                          key={topic}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          className="px-6 py-3 rounded-2xl text-base font-semibold border backdrop-blur-sm"
                          style={{
                            borderColor: "var(--border-subtle)",
                            backgroundColor: "var(--bg)",
                            color: "var(--base)",
                          }}
                          whileHover={{ scale: 1.1, y: -4 }}
                        >
                          {topic}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {project.images && project.images.length > 0 && (
                  <div
                    className="p-10 rounded-[2.5em] border backdrop-blur-sm"
                    style={{
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg-d)",
                    }}
                  >
                    <h2 className="text-3xl font-youth font-bold mb-6" style={{ color: "var(--base)" }}>
                      Project Screenshots
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.images.map((imageUrl, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="relative w-full h-60 rounded-xl overflow-hidden"
                        >
                          <Image
                            src={imageUrl}
                            alt={`Project screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div
                  className="p-8 rounded-[2.5em] border backdrop-blur-sm"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-d)",
                  }}
                >
                  <h3 className="text-2xl font-youth font-bold mb-6" style={{ color: "var(--base)" }}>
                    Project Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5" style={{ color: "var(--orange)" }} />
                        <span style={{ color: "var(--base)" }}>Stars</span>
                      </div>
                      <span className="text-xl font-bold" style={{ color: "var(--base)" }}>
                        {project.stargazersCount || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div className="flex items-center gap-3">
                        <GitFork className="w-5 h-5" style={{ color: "var(--purple)" }} />
                        <span style={{ color: "var(--base)" }}>Forks</span>
                      </div>
                      <span className="text-xl font-bold" style={{ color: "var(--base)" }}>
                        {project.forksCount || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" style={{ color: "var(--orange)" }} />
                        <span style={{ color: "var(--base)" }}>Updated</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: "var(--grey)" }}>
                        {formatDate(project.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {project.htmlUrl && (
                    <motion.a
                      href={project.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 rounded-2xl font-youth font-bold text-center uppercase tracking-tight flex items-center justify-center gap-3"
                      style={{
                        background: "linear-gradient(135deg, var(--orange), var(--purple))",
                        color: "var(--bg)",
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-6 h-6" />
                      View on GitHub
                    </motion.a>
                  )}
                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 rounded-2xl border-2 font-youth font-bold text-center uppercase tracking-tight flex items-center justify-center gap-3"
                      style={{
                        borderColor: "var(--orange)",
                        color: "var(--orange)",
                        backgroundColor: "var(--bg-d)",
                      }}
                      whileHover={{ scale: 1.05, y: -2, backgroundColor: "var(--orange)20" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="w-6 h-6" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
