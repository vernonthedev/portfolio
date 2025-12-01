"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Code,
  FolderKanban,
  FileText,
  User,
  Sparkles,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Code, label: "Skills", path: "/admin/skills" },
  { icon: FolderKanban, label: "Projects", path: "/admin/projects" },
  { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
  { icon: User, label: "About", path: "/admin/about" },
  { icon: Sparkles, label: "Hero", path: "/admin/hero" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-full border-r z-40"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-d)",
      }}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: "var(--border-subtle)" }}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--orange), var(--purple))",
                }}
              >
                <span className="text-lg font-youth font-bold" style={{ color: "var(--bg)" }}>
                  VD
                </span>
              </div>
              <span className="font-youth text-xl font-bold" style={{ color: "var(--base)" }}>
                Admin
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{ color: "var(--base)" }}
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));

            return (
              <motion.button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "shadow-lg" : ""
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, var(--orange), var(--purple))",
                        color: "var(--bg)",
                      }
                    : {
                        color: "var(--base)",
                      }
                }
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-semibold">{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}

