import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    contact: {
      create: vi.fn(),
    },
  },
}));

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    contact: {
      create: vi.fn(),
    },
  },
}));

describe("Contact API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully create a contact entry", async () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "This is a test message that is long enough",
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Message sent successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((prisma as any).contact.create).toHaveBeenCalledWith({
      data: validData,
    });
  });

  it("should return 400 for invalid data", async () => {
    const invalidData = {
      name: "J", // Too short
      email: "invalid-email", // Invalid email
      phone: "123", // Too short
      message: "Short", // Too short
    };

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid form data");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((prisma as any).contact.create).not.toHaveBeenCalled();
  });
});
