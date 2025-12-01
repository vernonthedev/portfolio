import { NextResponse } from "next/server";
import { WebsiteDetails } from "@/types";

const websiteDetails: WebsiteDetails = {
  name: "vernonthedev",
  tagline: "Building modern web & mobile applications",
  bio: "Full-stack developer specializing in Laravel, Flutter, and Next.js",
  github: "https://github.com/vernonthedev",
  youtube: "https://youtube.com/@vernonthedev",
  twitter: "https://twitter.com/vernonthedev",
  linkedin: "https://linkedin.com/in/vernonthedev",
  email: "contact@vernonthedev.com",
};

export async function GET() {
  return NextResponse.json(websiteDetails);
}

