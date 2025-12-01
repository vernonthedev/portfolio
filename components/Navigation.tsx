"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Works", href: "#projects", icon: Briefcase },
  { name: "About", href: "#about", icon: User },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-6">
        <div className="flex items-center justify-between gap-4">
          <motion.a
            href="#home"
            className="pointer-events-auto rounded-full border-2 p-1"
            style={{ borderColor: "var(--orange)", backgroundColor: "var(--purple)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="aspect-square rounded-full flex items-center justify-center w-14 h-14"
              style={{ backgroundColor: "var(--purple)" }}
            >
              <span className="text-2xl font-youth font-bold" style={{ color: "var(--bg)" }}>
                VD
              </span>
            </div>
          </motion.a>

          <motion.button
            type="button"
            onClick={toggleTheme}
            className="pointer-events-auto pill px-3 py-2 flex items-center gap-2 text-xs font-youth uppercase tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" style={{ color: "var(--orange)" }} />
            ) : (
              <Moon className="w-4 h-4" style={{ color: "var(--purple)" }} />
            )}
            <span>Theme</span>
          </motion.button>
        </div>
      </header>

      <nav className="hidden md:flex fixed left-2 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.name.toLowerCase();
          return (
            <motion.a
              key={item.name}
              href={item.href}
              className="group relative aspect-square w-16 rounded-xl backdrop-blur-3xl flex flex-col items-center justify-center transition-all"
              style={{
                backgroundColor: isActive ? "var(--purple)" : "rgba(0,0,0,0.04)",
                color: isActive ? "var(--bg)" : "var(--base)",
              }}
              onClick={() => setActiveSection(item.name.toLowerCase())}
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <item.icon
                className="w-6 h-6"
                style={{ color: isActive ? "var(--bg)" : "var(--grey)" }}
              />

              <div
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-3xl px-3 py-2 rounded-md"
                style={{ backgroundColor: "var(--bg-d)", color: "var(--base)" }}
              >
                <div className="text-xs font-youth font-bold uppercase">{item.name}</div>
              </div>

              {isActive && (
                <span
                  className="absolute -right-1 w-1 h-6 rounded-full"
                  style={{ backgroundColor: "var(--orange)" }}
                />
              )}
            </motion.a>
          );
        })}
      </nav>

      <nav
        className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0 pointer-events-auto backdrop-blur-3xl rounded-xl px-3"
        style={{ backgroundColor: "var(--base)" }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.name.toLowerCase();
          return (
            <motion.a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center py-3 px-4 gap-1"
              onClick={() => setActiveSection(item.name.toLowerCase())}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon
                className="w-5 h-5"
                style={{ color: isActive ? "var(--orange)" : "var(--grey)" }}
              />
              <div
                className="text-[10px] font-youth font-bold uppercase"
                style={{ color: "var(--bg)" }}
              >
                {item.name}
              </div>
            </motion.a>
          );
        })}
      </nav>
    </>
  );
}


