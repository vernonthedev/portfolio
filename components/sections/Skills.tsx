"use client";

import { motion } from "framer-motion";
import { Skill } from "@/types";
import {
  Code,
  Database,
  Smartphone,
  Settings,
  Wrench,
  Laravel,
  Flutter,
  Docker,
  GitBranch,
} from "lucide-react";

const skills: Skill[] = [
  { name: "Laravel", level: 95, category: "backend", icon: "laravel" },
  { name: "Flutter", level: 90, category: "mobile", icon: "flutter" },
  { name: "JavaScript", level: 88, category: "frontend", icon: "js" },
  { name: "TypeScript", level: 85, category: "frontend", icon: "ts" },
  { name: "PHP", level: 92, category: "backend", icon: "php" },
  { name: "Next.js", level: 87, category: "frontend", icon: "next" },
  { name: "NestJS", level: 80, category: "backend", icon: "nestjs" },
  { name: "MongoDB", level: 85, category: "backend", icon: "mongo" },
  { name: "IndexedDB", level: 82, category: "backend", icon: "db" },
  { name: "Electron", level: 75, category: "tools", icon: "electron" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "tailwind" },
  { name: "Docker", level: 78, category: "devops", icon: "docker" },
  { name: "Git", level: 88, category: "tools", icon: "git" },
];

const categoryIcons = {
  frontend: Code,
  backend: Database,
  mobile: Smartphone,
  devops: Settings,
  tools: Wrench,
};

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-purple-500 to-pink-500",
  mobile: "from-green-500 to-emerald-500",
  devops: "from-orange-500 to-red-500",
  tools: "from-yellow-500 to-amber-500",
};

export function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const Icon = categoryIcons[category];
            const gradient = categoryColors[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${gradient}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <motion.span
                key={skill.name}
                className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

