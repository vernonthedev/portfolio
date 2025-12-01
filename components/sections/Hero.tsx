"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const techStack = [
  "Laravel",
  "Flutter",
  "Next.js",
  "React",
  "TypeScript",
  "PHP",
];

const floatingOrbs = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 150 + 80,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 25 + 20,
}));

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const words = "The full-stack developer for modern applications".split(" ");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="absolute top-20 left-8 md:left-16 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="font-youth text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          style={{ color: "var(--base)" }}
        >
          vernonthedev
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-8 md:right-16 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div className="font-youth text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight rotate-12"
          style={{ color: "var(--base)" }}
        >
          vernonthedev
        </div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, var(--orange) 0%, var(--purple) 100%)`,
              opacity: 0.3,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        animate={{
          x: mousePosition.x * 0.3,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: "var(--orange)" }} />
            </motion.div>
            <span className="text-base md:text-lg font-semibold" style={{ color: "var(--grey)" }}>
              Available for new projects
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-d)",
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--orange), var(--purple))",
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl font-youth font-bold" style={{ color: "var(--bg)" }}>VD</span>
              </motion.div>
              <span className="text-lg md:text-xl font-youth font-bold tracking-tight" style={{ color: "var(--base)" }}>
                vernonthedev
              </span>
            </div>
          </motion.div>

          <div className="space-y-5 md:space-y-7">
            <h1 className="font-youth text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block mr-3"
                  style={{ color: "var(--base)" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {word === "full-stack" ? (
                    <>
                      full-stack
                      <motion.span
                        className="inline-block ml-2"
                        style={{ color: "var(--orange)" }}
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ©
                      </motion.span>
                    </>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed font-medium"
            style={{ color: "var(--grey)" }}
          >
            I help startups and businesses build modern web & mobile applications
            with clean code and beautiful interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-5"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.15, y: -6, rotate: 5 }}
                className="px-5 py-2.5 rounded-full border backdrop-blur-sm group"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                }}
              >
                <motion.span
                  className="text-base md:text-lg font-semibold block"
                  style={{ color: "var(--base)" }}
                  whileHover={{ color: "var(--orange)" }}
                >
                  {tech}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="pt-6"
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--orange), var(--purple))",
                color: "var(--bg)",
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, var(--purple), var(--orange))",
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 font-youth text-base md:text-lg uppercase font-bold tracking-tight" style={{ color: "#ffffff" }}>
                Let&apos;s work together
              </span>
              <motion.div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="w-5 h-5" style={{ color: "#ffffff" }} />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-12 rounded-full border-2 flex items-start justify-center p-2 cursor-pointer"
          style={{ borderColor: "var(--orange)" }}
          whileHover={{ scale: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-4 rounded-full"
            style={{ backgroundColor: "var(--orange)" }}
          />
        </motion.div>
      </motion.div>

      <div className="absolute top-20 right-20 hidden lg:block">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{
            background: "linear-gradient(135deg, var(--orange), var(--purple))",
          }}
        />
      </div>

      <div className="absolute bottom-20 left-20 hidden lg:block">
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{
            background: "linear-gradient(135deg, var(--purple), var(--orange))",
          }}
        />
      </div>
    </section>
  );
}
