"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Filter,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";
import { fetchGitHubRepos } from "@/lib/github";
import { formatDate } from "@/lib/utils";

const categories: Array<Project["category"] | "all"> = [
  "all",
  "web",
  "mobile",
  "backend",
  "fullstack",
  "desktop",
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Project["category"] | "all"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const repos = await fetchGitHubRepos();
        setProjects(repos);
        setFilteredProjects(repos);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory, projects]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects =
    selectedCategory === "all" && featuredProjects.length > 0
      ? featuredProjects
      : filteredProjects;

  return (
    <section
      id="projects"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute top-32 left-8 md:left-16 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          className="font-youth text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight rotate-12"
          style={{ color: "var(--base)" }}
        >
          vernonthedev
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-8"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--orange), var(--purple))",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span
                className="text-sm font-youth font-bold"
                style={{ color: "var(--bg)" }}
              >
                VD
              </span>
            </motion.div>
            <Sparkles className="w-5 h-5" style={{ color: "var(--orange)" }} />
            <span
              className="text-base font-semibold"
              style={{ color: "var(--grey)" }}
            >
              Featured Work
            </span>
            <span
              className="text-xs font-youth font-bold uppercase tracking-wide px-2 py-1 rounded"
              style={{
                backgroundColor: "var(--orange)20",
                color: "var(--orange)",
              }}
            >
              vernonthedev
            </span>
          </motion.div>

          <h2 className="font-youth text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ color: "var(--base)" }}
            >
              Featured
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "var(--orange)" }}
            >
              Projects
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--grey)" }}
          >
            A collection of projects I&apos;ve built and contributed to
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-base transition-all ${
                selectedCategory === category
                  ? "shadow-lg"
                  : "border backdrop-blur-sm"
              }`}
              style={
                selectedCategory === category
                  ? {
                      background:
                        "linear-gradient(135deg, var(--orange), var(--purple))",
                      color: "var(--bg)",
                    }
                  : {
                      borderColor: "var(--border-subtle)",
                      backgroundColor: "var(--bg-d)",
                      color: "var(--base)",
                    }
              }
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                {category === "all" && <Filter className="w-5 h-5" />}
                {typeof category === "string"
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : ""}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-16 h-16 rounded-full border-4 border-t-transparent"
              style={{ borderColor: "var(--orange)" }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <AnimatePresence mode="wait">
              {displayProjects.slice(0, 6).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="group relative"
                >
                  <div
                    className="absolute inset-0 rounded-[2em] opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--orange), var(--purple))",
                    }}
                  />

                  <motion.div
                    className="relative rounded-[2em] overflow-hidden h-full cursor-pointer"
                    style={{ backgroundColor: "var(--bg-d)" }}
                    whileHover={{ y: -12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => {
                      window.location.href = `/projects/${project.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={`https://picsum.photos/seed/${project.id}/1200/750`}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br transition-opacity"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--purple), var(--orange))",
                          opacity: 0.4,
                        }}
                      />
                      {project.featured && (
                        <motion.div
                          className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md shadow-xl flex items-center gap-2"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--orange), var(--purple))",
                            color: "var(--bg)",
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-sm font-bold uppercase tracking-wide">
                            Featured
                          </span>
                        </motion.div>
                      )}
                      <motion.div
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                project.html_url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            className="p-3 rounded-full backdrop-blur-md z-10"
                            style={{
                              backgroundColor: "var(--bg-d)",
                              color: "var(--base)",
                            }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.button>
                          {project.homepage && (
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  project.homepage,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                              className="p-3 rounded-full backdrop-blur-md z-10"
                              style={{
                                background:
                                  "linear-gradient(135deg, var(--orange), var(--purple))",
                                color: "var(--bg)",
                              }}
                              whileHover={{ scale: 1.1, rotate: -90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ArrowUpRight className="w-5 h-5" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3
                            className="text-3xl font-youth font-bold mb-3 group-hover:text-orange transition-colors"
                            style={{ color: "var(--base)" }}
                          >
                            {project.name}
                          </h3>
                          <p
                            className="text-lg line-clamp-2 leading-relaxed mb-4"
                            style={{ color: "var(--grey)" }}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {project.topics && project.topics.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.topics.slice(0, 4).map((topic) => (
                            <motion.span
                              key={topic}
                              className="px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm"
                              style={{
                                borderColor: "var(--border-subtle)",
                                backgroundColor: "var(--bg)",
                                color: "var(--base)",
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {topic}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      <div
                        className="flex items-center justify-between text-base pt-6 border-t"
                        style={{
                          color: "var(--grey)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-2 font-semibold">
                            <Star
                              className="w-5 h-5"
                              style={{ color: "var(--orange)" }}
                            />
                            {project.stargazers_count}
                          </span>
                          <span className="flex items-center gap-2 font-semibold">
                            <GitFork
                              className="w-5 h-5"
                              style={{ color: "var(--purple)" }}
                            />
                            {project.forks_count}
                          </span>
                        </div>
                        {project.language && (
                          <span
                            className="font-bold px-4 py-2 rounded-lg"
                            style={{ backgroundColor: "var(--bg-darker)" }}
                          >
                            {project.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {displayProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            style={{ color: "var(--grey)" }}
          >
            <p className="text-xl">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
