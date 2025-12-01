import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, entityId, entityType, metadata } = body;

    await trackEvent(type, entityId, entityType, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}

