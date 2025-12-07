import { HomePageClient } from "@/components/HomePageClient";
import { getProjects } from "@/app/actions/projects";
import { getBlogPosts } from "@/app/actions/blog";
import { getSkills } from "@/app/actions/skills";
import { getAbout } from "@/app/actions/about";
import { getHero } from "@/app/actions/hero";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getProjects();
  const posts = await getBlogPosts();
  const skills = await getSkills();
  const aboutData = await getAbout();
  const heroData = await getHero();

  return <HomePageClient projects={projects} posts={posts} skills={skills} aboutData={aboutData} heroData={heroData} />;
}
