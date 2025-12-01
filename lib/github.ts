import { Project } from "@/types";

const GITHUB_USERNAME = "vernonthedev";
const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos = await response.json();

    const featuredProjects = [
      "whatsapp-mobile-crm",
      "kjcw-car-wash-pwa",
      "sda-church-website",
    ];

    return repos.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || "",
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      featured: featuredProjects.some((name) =>
        repo.name.toLowerCase().includes(name.toLowerCase())
      ),
      category: determineCategory(repo),
    }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

function determineCategory(repo: any): Project["category"] {
  const name = repo.name.toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());
  const description = (repo.description || "").toLowerCase();

  if (topics.includes("flutter") || topics.includes("mobile") || name.includes("mobile")) {
    return "mobile";
  }
  if (topics.includes("electron") || topics.includes("desktop")) {
    return "desktop";
  }
  if (topics.includes("laravel") || topics.includes("backend") || topics.includes("api")) {
    if (topics.includes("frontend") || topics.includes("react") || topics.includes("next")) {
      return "fullstack";
    }
    return "backend";
  }
  if (topics.includes("react") || topics.includes("next") || topics.includes("vue")) {
    return "web";
  }
  return "fullstack";
}

