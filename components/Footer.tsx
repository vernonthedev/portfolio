"use client";

import { motion } from "framer-motion";
import { Github, Youtube, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/vernonthedev" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@vernonthedev" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/vernonthedev" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/vernonthedev" },
  ];

  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} vernonthedev. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using Next.js
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5 text-gray-400 hover:text-primary-400 transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

