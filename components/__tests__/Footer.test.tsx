import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import { Footer } from "../Footer";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: (props) => <div {...props} />,
      a: (props) => <a {...props} />,
      ul: (props) => <ul {...props} />,
      li: (props) => <li {...props} />,
      span: (props) => <span {...props} />,
    },
  };
});

describe("Footer", () => {
  it("renders the copyright text with the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} vernonthedev. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders all social media links with correct labels", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /youtube/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /x/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("social media links have correct href attributes", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/vernonthedev"
    );
    expect(screen.getByRole("link", { name: /youtube/i })).toHaveAttribute(
      "href",
      "https://youtube.com/@vernonthedev"
    );
    expect(screen.getByRole("link", { name: /x/i })).toHaveAttribute(
      "href",
      "https://x.com/vernonthedev"
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/vernonthedev"
    );
  });

  it("renders the bubble animation container", () => {
    render(<Footer />);
    const bubbleContainer = screen.getByTestId("bubble-container");
    expect(bubbleContainer).toBeInTheDocument();
  });
});