export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  htmlUrl?: string | null;
  homepage?: string | null;
  language?: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  featured?: boolean;
  thumbnail?: string | null;
  category?: "web" | "mobile" | "backend" | "fullstack" | "desktop" | null;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  category: string;
  featured?: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
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

export interface AboutData {
  id: string;
  bio: string;
  services: string[];
  stats: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string | null;
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
}
