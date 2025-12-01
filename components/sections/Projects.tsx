"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Filter } from "lucide-react";
import { Project } from "@/types";
import { fetchGitHubRepos } from "@/lib/github";
import { formatDate } from "@/lib/utils";

const categories: Array<Project["category"] | "all"> = ["all", "web", "mobile", "backend", "fullstack", "desktop"];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Project["category"] | "all">("all");
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
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = selectedCategory === "all" && featuredProjects.length > 0
    ? featuredProjects
    : filteredProjects;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects I&apos;ve built and contributed to
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white"
                  : "glass text-gray-300 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                {category === "all" && <Filter className="w-4 h-4" />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {displayProjects.slice(0, 9).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden relative"
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {project.forks_count}
                      </span>
                    </div>
                    {project.language && (
                      <span className="text-xs">{project.language}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 glass rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </motion.a>
                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {displayProjects.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

