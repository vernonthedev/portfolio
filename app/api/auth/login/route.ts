import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const identifier = await getRateLimitIdentifier();
    const limit = await rateLimit(`login:${identifier}`, 5, 60000);

    if (!limit.success) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const result = await login(username, password);
    await createAuditLog(result.user.id, "login", "user", result.user.id);

    return NextResponse.json({ user: result.user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid credentials" }, { status: 401 });
  }
}

