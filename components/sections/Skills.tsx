"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/types";
import {
  Code,
  Database,
  Smartphone,
  Settings,
  Wrench,
  TrendingUp,
} from "lucide-react";



const categoryIcons = {
  frontend: Code,
  backend: Database,
  mobile: Smartphone,
  devops: Settings,
  tools: Wrench,
};

const categoryColors = {
  frontend: "var(--orange)",
  backend: "var(--purple)",
  mobile: "#10b981",
  devops: "#f59e0b",
  tools: "#3b82f6",
};

const CircularProgress = ({ 
  skill, 
  size = 140, 
  strokeWidth = 12,
  index 
}: { 
  skill: Skill; 
  size?: number; 
  strokeWidth?: number;
  index: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (skill.level / 100) * circumference;
  const color = categoryColors[skill.category as keyof typeof categoryColors] || "var(--orange)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="relative group cursor-pointer flex-shrink-0"
      whileHover={{ scale: 1.15, y: -10 }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-darker)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-3xl font-youth font-bold"
          style={{ color: "var(--base)" }}
        >
          {skill.level}%
        </span>
        <span
          className="text-sm font-semibold mt-2 text-center px-2"
          style={{ color: "var(--grey)" }}
        >
          {skill.name}
        </span>
      </div>
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent)`,
        }}
      />
    </motion.div>
  );
};

export function Skills({ skills: initialSkills }: { skills: Skill[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");

  const categories = Array.from(new Set(initialSkills.map((s) => s.category)));

  // Validate and correct selected category if it no longer exists
  const validSelectedCategory = 
    selectedCategory === "all" || categories.includes(selectedCategory)
      ? selectedCategory
      : "all";

  const filteredSkills = validSelectedCategory === "all"
    ? initialSkills
    : initialSkills.filter((s) => s.category === validSelectedCategory);

  const categoryGroups = categories.map((cat) => ({
    category: cat,
    skills: initialSkills.filter((s) => s.category === cat),
    icon: categoryIcons[cat as keyof typeof categoryIcons] || Wrench, // Fallback icon
    color: categoryColors[cat as keyof typeof categoryColors] || "var(--orange)", // Fallback color
  }));

  return (
    <section
      id="skills"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute bottom-32 left-8 md:left-16 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="font-youth text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight -rotate-12"
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
                background: "linear-gradient(135deg, var(--orange), var(--purple))",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-sm font-youth font-bold" style={{ color: "var(--bg)" }}>VD</span>
            </motion.div>
            <TrendingUp className="w-5 h-5" style={{ color: "var(--orange)" }} />
            <span className="text-base font-semibold" style={{ color: "var(--grey)" }}>
              Technical Expertise
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
              Skills &
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "var(--orange)" }}
            >
              Expertise
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
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          <motion.button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-semibold text-base transition-all ${
              validSelectedCategory === "all" ? "shadow-lg" : "border backdrop-blur-sm"
            }`}
            style={
              validSelectedCategory === "all"
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
            All Skills
          </motion.button>
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || Wrench;
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-base transition-all flex items-center gap-2 ${
                  validSelectedCategory === category ? "shadow-lg" : "border backdrop-blur-sm"
                }`}
                style={
                  validSelectedCategory === category
                    ? {
                        background: `linear-gradient(135deg, ${categoryColors[category as keyof typeof categoryColors]}, var(--purple))`,
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
                <Icon className="w-5 h-5" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {validSelectedCategory === "all" ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {categoryGroups.map((group, groupIndex) => {
                const Icon = group.icon;
                return (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 mb-12">
                      <motion.div
                        className="p-4 rounded-2xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${group.color}, ${group.color}80)`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3
                        className="text-4xl font-youth font-bold capitalize"
                        style={{ color: "var(--base)" }}
                      >
                        {group.category}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 md:gap-16 justify-items-center">
                      {group.skills.map((skill, index) => (
                        <CircularProgress
                          key={skill.name}
                          skill={skill}
                          size={160}
                          strokeWidth={12}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 md:gap-16 justify-items-center"
            >
              {filteredSkills.map((skill, index) => (
                <CircularProgress
                  key={skill.name}
                  skill={skill}
                  size={160}
                  strokeWidth={12}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex flex-wrap gap-4 justify-center max-w-5xl">
            {initialSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.15, y: -6, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full border backdrop-blur-sm"
                style={{
                  borderColor: (categoryColors[skill.category as keyof typeof categoryColors] || "var(--orange)") + "40",
                  backgroundColor: (categoryColors[skill.category as keyof typeof categoryColors] || "var(--orange)") + "10",
                }}
              >
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--base)" }}
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
