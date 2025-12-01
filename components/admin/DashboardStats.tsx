"use client";

import { motion } from "framer-motion";
import { Eye, MousePointerClick, BookOpen, Monitor, Smartphone, Tablet } from "lucide-react";

interface Stats {
  pageViews: number;
  projectClicks: number;
  blogReads: number;
  deviceBreakdown: Array<{ device: string; count: number }>;
  osBreakdown: Array<{ os: string; count: number }>;
}

export function DashboardStats({ stats }: { stats: Stats }) {
  const statCards = [
    {
      icon: Eye,
      label: "Page Views",
      value: stats.pageViews.toLocaleString(),
      color: "var(--orange)",
    },
    {
      icon: MousePointerClick,
      label: "Project Clicks",
      value: stats.projectClicks.toLocaleString(),
      color: "var(--purple)",
    },
    {
      icon: BookOpen,
      label: "Blog Reads",
      value: stats.blogReads.toLocaleString(),
      color: "var(--orange)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-[2.5em] border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="text-3xl font-youth font-bold mb-1" style={{ color: "var(--base)" }}>
              {stat.value}
            </div>
            <div className="text-sm" style={{ color: "var(--grey)" }}>
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

