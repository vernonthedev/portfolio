import { HomePageClient } from "@/components/HomePageClient";
import { getProjects } from "@/app/actions/projects";
import { getBlogPosts } from "@/app/actions/blog";
import { getSkills } from "@/app/actions/skills";
import { getAbout } from "@/app/actions/about";
import { getHero } from "@/app/actions/hero";
import { AboutData, BlogPost, HeroData, Project, Skill } from "@/types";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects: Project[] = [];
  let posts: BlogPost[] = [];
  let skills: Skill[] = [];
  let aboutData: AboutData | null = null;
  let heroData: HeroData | null = null;

  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  try {
    skills = await getSkills();
  } catch (error) {
    console.error("Error fetching skills:", error);
  }

  try {
    aboutData = await getAbout();
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  try {
    heroData = await getHero();
  } catch (error) {
    console.error("Error fetching hero data:", error);
  }

  return <HomePageClient projects={projects} posts={posts} skills={skills} aboutData={aboutData} heroData={heroData} />;
}
