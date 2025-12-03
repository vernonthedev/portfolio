import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HomePageClient } from "../HomePageClient";
import { AboutData, BlogPost, HeroData, Project, Skill } from "@/types";

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Project 1",
    description: "Description 1",
    imageUrl: "/image1.jpg",
    githubUrl: "https://github.com/project1",
    liveUrl: "https://project1.com",
    tags: ["React"],
    isFeatured: true,
    order: 1,
  },
];

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Blog Post 1",
    description: "Description 1",
    slug: "blog-post-1",
    date: "2023-01-01",
    tags: ["Tech"],
    isPublished: true,
    minutesToRead: 5,
  },
];

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "Skill 1",
    imageUrl: "/skill1.png",
    category: "frontend",
    order: 1,
  },
];

const mockAboutData: AboutData = {
  id: "1",
  content: "About me content",
  imageUrl: "/me.jpg",
};

const mockHeroData: HeroData = {
  id: "1",
  name: "Vernon",
  tagline: "Developer",
  imageUrl: "/hero.jpg",
};
const MockedHeroComponent = vi.fn((props) => (
  <div data-testid="Hero" {...props} />
));
const MockedScrollToTopComponent = vi.fn((props) => (
  <div data-testid="ScrollToTop" {...props} />
));

vi.mock("@/components/sections/Hero", () => ({ Hero: MockedHeroComponent }));
vi.mock("@/components/ScrollToTop", () => ({
  ScrollToTop: MockedScrollToTopComponent,
}));
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: vi.fn((loader) => {
    const DynamicMockComponent = vi.fn((props) => {
      const loaderString = loader.toString();
      if (loaderString.includes("Hero")) {
        return <MockedHeroComponent {...props} />;
      }
      if (loaderString.includes("ScrollToTop")) {
        return <MockedScrollToTopComponent {...props} />;
      }
      return <div data-testid="GenericDynamicMock" {...props} />;
    });
    DynamicMockComponent.displayName = "DynamicMockComponent";
    return DynamicMockComponent;
  }),
}));

vi.mock("@/components/sections/Skills", () => ({
  Skills: () => <div data-testid="Skills" />,
}));
vi.mock("@/components/sections/Projects", () => ({
  Projects: () => <div data-testid="Projects" />,
}));
vi.mock("@/components/sections/Blog", () => ({
  Blog: () => <div data-testid="Blog" />,
}));
vi.mock("@/components/sections/About", () => ({
  About: () => <div data-testid="About" />,
}));
vi.mock("@/components/sections/Contact", () => ({
  Contact: () => <div data-testid="Contact" />,
}));
vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("HomePageClient", () => {
  it("renders without crashing", () => {
    render(
      <HomePageClient
        projects={mockProjects}
        posts={mockPosts}
        skills={mockSkills}
        aboutData={mockAboutData}
        heroData={mockHeroData}
      />
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders all section components", () => {
    render(
      <HomePageClient
        projects={mockProjects}
        posts={mockPosts}
        skills={mockSkills}
        aboutData={mockAboutData}
        heroData={mockHeroData}
      />
    );

    expect(screen.getByTestId("Hero")).toBeInTheDocument();
    expect(screen.getByTestId("Skills")).toBeInTheDocument();
    expect(screen.getByTestId("Projects")).toBeInTheDocument();
    expect(screen.getByTestId("Blog")).toBeInTheDocument();
    expect(screen.getByTestId("About")).toBeInTheDocument();
    expect(screen.getByTestId("Contact")).toBeInTheDocument();
    expect(screen.getByTestId("ScrollToTop")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });
});
