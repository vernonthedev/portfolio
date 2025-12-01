import { NextResponse } from "next/server";
import { logout, getSession } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST() {
  try {
    const session = await getSession();
    if (session) {
      await createAuditLog(session.userId, "logout", "user", session.userId);
    }
    await logout();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

