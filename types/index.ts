export interface Project {
  id: string;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language?: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  featured?: boolean;
  thumbnail?: string;
  category?: "web" | "mobile" | "backend" | "fullstack" | "desktop";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  featured?: boolean;
  image?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "mobile" | "devops" | "tools";
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface WebsiteDetails {
  name: string;
  tagline: string;
  bio: string;
  github: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
  email: string;
}

