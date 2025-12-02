"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User as UserIcon, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-sm"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-d)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--grey)" }} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg)",
                color: "var(--base)",
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg"
            style={{ color: "var(--base)" }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          <motion.button
            className="p-2 rounded-lg relative"
            style={{ color: "var(--base)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: "var(--red)" }} />
          </motion.button>

          <div className="relative">
            <motion.button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{ color: "var(--base)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--orange), var(--purple))",
                }}
              >
                <UserIcon className="w-4 h-4" style={{ color: "var(--bg)" }} />
              </div>
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border shadow-lg"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-d)",
                  }}
                >
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-opacity-10"
                      style={{ color: "var(--base)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

