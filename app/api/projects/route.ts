import { NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/lib/github";

export async function GET() {
  try {
    const projects = await fetchGitHubRepos();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

