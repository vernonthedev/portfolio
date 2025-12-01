"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

const blogPosts: BlogPost[] = [
  {
    slug: "laravel-tips-2024",
    title: "Advanced Laravel Tips for 2024",
    excerpt: "Discover powerful Laravel techniques and best practices to level up your backend development.",
    content: "",
    date: "2024-01-15",
    category: "Laravel Tips",
    featured: true,
  },
  {
    slug: "flutter-state-management",
    title: "State Management in Flutter: A Complete Guide",
    excerpt: "Exploring different state management solutions in Flutter and when to use each one.",
    content: "",
    date: "2024-01-10",
    category: "Flutter Dev",
    featured: true,
  },
  {
    slug: "pwa-best-practices",
    title: "Building PWAs That Feel Native",
    excerpt: "Learn how to create Progressive Web Apps that provide a seamless user experience.",
    content: "",
    date: "2024-01-05",
    category: "PWA Development",
    featured: false,
  },
  {
    slug: "docker-ci-cd",
    title: "Docker & CI/CD: Streamlining Your Workflow",
    excerpt: "Setting up automated deployments with Docker and modern CI/CD pipelines.",
    content: "",
    date: "2023-12-20",
    category: "DevOps & CI/CD",
    featured: false,
  },
  {
    slug: "building-in-public",
    title: "My Journey Building in Public",
    excerpt: "Reflections on sharing my development journey and the lessons learned along the way.",
    content: "",
    date: "2023-12-15",
    category: "Dev Journey",
    featured: true,
  },
];

const categories = ["All", "Laravel Tips", "Flutter Dev", "PWA Development", "DevOps & CI/CD", "Dev Journey"];

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Blog & Articles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my development journey
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
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {post.featured && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-xs font-semibold">
                    <BookOpen className="w-3 h-3" />
                    Featured
                  </span>
                </div>
              )}

              <div className="mb-4">
                <span className="text-primary-400 text-sm font-medium">{post.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <motion.a
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No blog posts found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

