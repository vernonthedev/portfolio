"use client";

import dynamic from "next/dynamic";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { AboutData, BlogPost, HeroData, Project, Skill } from "@/types";

const Hero = dynamic(
  () =>
    import("@/components/sections/Hero").then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
  }
);

const ScrollToTop = dynamic(
  () =>
    import("@/components/ScrollToTop").then((mod) => ({
      default: mod.ScrollToTop,
    })),
  {
    ssr: false,
  }
);

export function HomePageClient({
  projects,
  posts,
  skills,
  aboutData,
  heroData,
}: {
  projects: Project[];
  posts: BlogPost[];
  skills: Skill[];
  aboutData: AboutData;
  heroData: HeroData;
}) {
  return (
    <main className="min-h-screen relative">
      <Hero heroData={heroData} />
      <Skills skills={skills} />
      <Projects initialProjects={projects} />
      <Blog posts={posts} />
      <About aboutData={aboutData} />
      <Contact />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
