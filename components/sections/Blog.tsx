"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, PenTool } from "lucide-react";
import Image from "next/image";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export function Blog({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setPosts(initialPosts);
    setFilteredPosts(initialPosts);
  }, [initialPosts]);

  const allCategories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <section
      id="blog"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute bottom-32 right-8 md:right-16 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="font-youth text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight"
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--orange), var(--purple))",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-sm font-youth font-bold" style={{ color: "var(--bg)" }}>VD</span>
            </motion.div>
            <PenTool className="w-5 h-5" style={{ color: "var(--orange)" }} />
            <span className="text-base font-semibold" style={{ color: "var(--grey)" }}>
              Latest Articles
            </span>
            <span className="text-xs font-youth font-bold uppercase tracking-wide px-2 py-1 rounded"
              style={{
                backgroundColor: "var(--purple)20",
                color: "var(--purple)",
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
              Blog &
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "var(--orange)" }}
            >
              Articles
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
            Thoughts, tutorials, and insights from my development journey
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {allCategories.map((category) => (
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
                      background: "linear-gradient(135deg, var(--orange), var(--purple))",
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
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
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
                    background: "linear-gradient(135deg, var(--orange), var(--purple))",
                  }}
                />

                <motion.div
                  className="relative rounded-[2em] overflow-hidden h-full"
                  style={{ backgroundColor: "var(--bg-d)" }}
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-video rounded-[1.5em] overflow-hidden m-6 mb-0 relative bg-base/5 group/image">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-20 transition-opacity"
                      style={{
                        background: "linear-gradient(135deg, var(--purple), var(--orange))",
                      }}
                    />
                    {post.featured && (
                      <div className="absolute top-5 right-5 px-4 py-2 rounded-full backdrop-blur-md shadow-xl flex items-center gap-2"
                        style={{
                          background: "linear-gradient(135deg, var(--orange), var(--purple))",
                          color: "var(--bg)",
                        }}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wide">Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="mb-5">
                      <span
                        className="text-sm font-bold uppercase tracking-wide mb-3 inline-block"
                        style={{ color: "var(--orange)" }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="text-2xl font-youth font-bold mb-4 group-hover:text-orange transition-colors"
                        style={{ color: "var(--base)" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-lg line-clamp-3 leading-relaxed mb-6"
                        style={{ color: "var(--grey)" }}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <span
                        className="flex items-center gap-2 text-base"
                        style={{ color: "var(--grey)" }}
                      >
                        <Calendar className="w-5 h-5" />
                        {formatDate(post.date)}
                      </span>
                      <motion.a
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-base font-semibold group/link"
                        style={{ color: "var(--orange)" }}
                        whileHover={{ x: 5 }}
                      >
                        Read More
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            style={{ color: "var(--grey)" }}
          >
            <p className="text-xl">No blog posts found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
