"use client";

import { motion } from "framer-motion";
import { Code, Youtube, Coffee, Rocket } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-3xl font-bold">
                  VTD
                </div>
                <div>
                  <h3 className="text-2xl font-bold">vernonthedev</h3>
                  <p className="text-gray-400">Full-Stack Developer</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Hey! I&apos;m Vernon, a passionate full-stack developer who loves building
                digital solutions that make a difference. My journey in software development
                started with a curiosity about how things work, and it&apos;s evolved into a
                deep passion for creating elegant, efficient, and user-friendly applications.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                I specialize in Laravel for robust backend systems, Flutter for beautiful
                mobile experiences, and modern JavaScript frameworks for dynamic web
                applications. When I&apos;m not coding, you&apos;ll find me sharing my
                knowledge on YouTube, contributing to open-source projects, or exploring
                the latest tech trends.
              </p>

              <p className="text-gray-300 leading-relaxed">
                I believe in building in public, sharing my journey, and helping others
                grow. Every project is an opportunity to learn something new and push the
                boundaries of what&apos;s possible.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass rounded-xl p-6 text-center"
              >
                <Code className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                <h4 className="text-2xl font-bold mb-1">50+</h4>
                <p className="text-sm text-gray-400">Projects Built</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="glass rounded-xl p-6 text-center"
              >
                <Youtube className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                <h4 className="text-2xl font-bold mb-1">100+</h4>
                <p className="text-sm text-gray-400">YouTube Videos</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Rocket className="w-6 h-6 text-primary-400" />
                What I Do
              </h3>
              <ul className="space-y-4">
                {[
                  "Build scalable web applications with Laravel & Next.js",
                  "Create beautiful mobile apps with Flutter",
                  "Develop Progressive Web Apps (PWAs)",
                  "Design and implement RESTful APIs",
                  "Set up CI/CD pipelines and DevOps workflows",
                  "Share knowledge through YouTube tutorials",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Coffee className="w-6 h-6 text-primary-400" />
                Fun Facts
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>☕ Coffee enthusiast and productivity optimizer</p>
                <p>🎥 Love creating educational content</p>
                <p>🚀 Always learning and experimenting</p>
                <p>🌱 Building in public advocate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

