"use client";

import { motion } from "framer-motion";
import { Github, Youtube, Linkedin, X } from "lucide-react";
import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/vernonthedev",
      label: "GitHub",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@vernonthedev",
      label: "YouTube",
    },
    {
      name: "X",
      icon: X,
      href: "https://x.com/vernonthedev",
      label: "X",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/vernonthedev",
      label: "LinkedIn",
    },
  ];

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <footer
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16"
      style={{ backgroundColor: "var(--base)", color: "var(--bg)" }}
    >
      <div className="absolute inset-0 opacity-10">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full blur-2xl"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: bubble.left,
              top: bubble.top,
              background:
                "linear-gradient(135deg, var(--orange), var(--purple))",
            }}
            animate={{
              x: [0, bubble.left],
              y: [0, bubble.top],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: bubble.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12">
          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 list-none p-0 flex-wrap justify-center"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <li key={social.name}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border backdrop-blur-sm font-youth font-bold text-sm uppercase no-underline transition-all"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "var(--bg)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -4,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon className="w-4 h-4" />
                    {social.label}
                  </motion.a>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center space-y-3"
          >
            <p className="text-sm opacity-80">
              © {currentYear} vernonthedev. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
