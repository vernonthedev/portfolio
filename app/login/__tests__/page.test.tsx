import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock("next/navigation", () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();
  const mockRedirect = vi.fn();

  return {
    useRouter: vi.fn(() => ({
      push: mockPush,
      refresh: mockRefresh,
    })),
    redirect: mockRedirect,
    _mockPush: mockPush,
    _mockRefresh: mockRefresh,
    _mockRedirect: mockRedirect,
  };
});

import {
  useRouter,
  redirect,
  _mockPush,
  _mockRefresh,
  _mockRedirect,
} from "next/navigation";

let mockValidateRequestUser = null;
vi.mock("@/lib/auth", () => ({
  validateRequest: vi.fn(() => Promise.resolve({ user: null })),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

import AdminLoginPage from "../page";

describe("AdminLoginPage", () => {
  beforeEach(() => {
    _mockPush.mockClear();
    _mockRefresh.mockClear();
    _mockRedirect.mockClear();
    vi.mocked(useRouter).mockClear();
    vi.mocked(redirect).mockClear();

    _mockRedirect.mockImplementation((url) => {
      throw new Error("Next.js Redirect Error");
    });

    mockFetch.mockClear();
    mockValidateRequestUser = null;
    vi.clearAllMocks();
  });

  afterEach(() => {
  });

  it("renders the login form", () => {
    render(<AdminLoginPage />);
    expect(
      screen.getByRole("heading", { name: /admin login/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your password/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(<AdminLoginPage />);

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const showPasswordButton = screen.getByRole("button", {
      name: /show password/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(showPasswordButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    const hidePasswordButton = screen.getByRole("button", {
      name: /hide password/i,
    });
    fireEvent.click(hidePasswordButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("handles successful form submission (fetch call only)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser", password: "password123" }),
      });
      expect(_mockPush).toHaveBeenCalledWith("/admin");
      expect(_mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("handles failed login and displays error", async () => {
    const errorMessage = "Invalid credentials";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
    });

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    expect(_mockPush).not.toHaveBeenCalled();
    expect(_mockRefresh).not.toHaveBeenCalled();
  });

  it("shows loading state during login", async () => {
    mockFetch.mockReturnValueOnce(new Promise(() => {}));

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByRole("button", { name: /logging in.../i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /login/i })
    ).not.toBeInTheDocument();
  });
});
