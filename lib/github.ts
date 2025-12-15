import { Project } from "@/types";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "vernonthedev";
export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = await response.json();

    const projects: Project[] = data.map((repo) => ({
      id: repo.id.toString(),
      slug: repo.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, ""),
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      featured: false,
      thumbnail: `https://picsum.photos/seed/${repo.name}/1920/1080`,
      category: "web",
      updatedAt: new Date(repo.updated_at),
    }));

    return projects;
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    return [];
  }
}
