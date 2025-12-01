"use client";

import dynamic from "next/dynamic";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const Hero = dynamic(() => import("@/components/sections/Hero").then((mod) => ({ default: mod.Hero })), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then((mod) => ({ default: mod.ScrollToTop })), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Blog />
      <About />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
