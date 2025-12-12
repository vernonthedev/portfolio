"use client";

import { motion } from "framer-motion";
import {
  Code,
  Youtube,
  Coffee,
  Rocket,
  User,
  Zap,
  ArrowRight,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { AboutData } from "@/types";

const lucideIcons: { [key: string]: LucideIcon } = {
  Code: Code,
  Youtube: Youtube,
  Coffee: Coffee,
  Rocket: Rocket,
  User: User,
  Zap: Zap,
};

export function About({ aboutData }: { aboutData: AboutData }) {
  const { bio, services, stats, image } = aboutData;

  return (
    <section
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute top-32 right-8 md:right-16 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          className="font-youth text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight"
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
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                src="/logos/white.png"
                alt="Logo"
                className="w-full h-full object-cover hidden dark:block"
              />
              <img
                src="/logos/black.png"
                alt="Logo"
                className="w-full h-full object-cover block dark:hidden"
              />
            </motion.div>
            <User className="w-5 h-5" style={{ color: "var(--orange)" }} />
            <span
              className="text-base font-semibold"
              style={{ color: "var(--grey)" }}
            >
              Get to Know Me
            </span>
            <span
              className="text-xs font-youth font-bold uppercase tracking-wide px-2 py-1 rounded"
              style={{
                backgroundColor: "var(--orange)20",
                color: "var(--orange)",
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
              About
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "var(--orange)" }}
            >
              Me
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
            I&apos;m a full-stack developer passionate about building digital
            experiences that make a real impact.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="sticky top-24">
              <div className="relative rounded-[2.5em] overflow-hidden group">
                <div className="aspect-[3/4] relative bg-base/5">
                  <Image
                    src={image || "/images/me/ait.png"}
                    alt="vernonthedev"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-10 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--purple), var(--orange))",
                    }}
                  />
                  <div
                    className="absolute inset-0 border-4 rounded-[2.5em] pointer-events-none"
                    style={{ borderColor: "var(--orange)" }}
                  />
                </div>
                <motion.div
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--orange), var(--purple))",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = lucideIcons[stat.icon] || User; // Use mapped icon with User as fallback
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group"
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <div
                        className="p-6 rounded-2xl border backdrop-blur-sm"
                        style={{
                          borderColor: "var(--border-subtle)",
                          backgroundColor: "var(--bg-d)",
                        }}
                      >
                        <motion.div
                          className="inline-flex p-3 rounded-xl mb-3"
                          style={{ backgroundColor: `${stat.color}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: stat.color }}
                          />
                        </motion.div>
                        <h4
                          className="text-3xl font-youth font-bold mb-1"
                          style={{ color: "var(--base)" }}
                        >
                          {stat.value}
                        </h4>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: "var(--grey)" }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="relative">
              <div
                className="p-10 rounded-[2.5em] border backdrop-blur-sm"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                }}
              >
                <div className="flex items-center gap-6 mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="/logos/white.png"
                      alt="Logo"
                      className="w-full h-full object-cover hidden dark:block"
                    />
                    <img
                      src="/logos/black.png"
                      alt="Logo"
                      className="w-full h-full object-cover block dark:hidden"
                    />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-3xl font-youth font-bold"
                        style={{ color: "var(--base)" }}
                      >
                        vernonthedev
                      </h3>
                      <motion.div
                        className="px-3 py-1 rounded-lg text-xs font-youth font-bold uppercase tracking-wide"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--orange), var(--purple))",
                          color: "var(--bg)",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Brand
                      </motion.div>
                    </div>
                    <p className="text-lg" style={{ color: "var(--grey)" }}>
                      Full-Stack Developer
                    </p>
                  </div>
                </div>

                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "var(--base)" }}
                >
                  {bio.split("\n")[0]}
                </p>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "var(--grey)" }}
                >
                  {bio.split("\n").slice(1, 2).join("\n")}
                </p>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--grey)" }}
                >
                  {bio.split("\n").slice(2).join("\n")}
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="p-10 rounded-[2.5em] border backdrop-blur-sm"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <motion.div
                    className="p-4 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--orange), var(--purple))",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Rocket className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3
                    className="text-3xl font-youth font-bold"
                    style={{ color: "var(--base)" }}
                  >
                    What I Do
                  </h3>
                </div>

                <div className="space-y-4">
                  {services.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div
                        className="flex items-start gap-4 p-5 rounded-2xl border transition-all"
                        style={{
                          borderColor: "var(--border-subtle)",
                          backgroundColor: "var(--bg)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--orange)";
                          e.currentTarget.style.backgroundColor = "var(--bg-d)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--border-subtle)";
                          e.currentTarget.style.backgroundColor = "var(--bg)";
                        }}
                      >
                        <motion.div
                          className="mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ArrowRight
                            className="w-5 h-5"
                            style={{ color: "var(--orange)" }}
                          />
                        </motion.div>
                        <span
                          className="text-lg leading-relaxed font-semibold flex-1"
                          style={{ color: "var(--base)" }}
                        >
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
