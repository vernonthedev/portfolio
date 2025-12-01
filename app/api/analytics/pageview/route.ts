import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function POST() {
  try {
    await trackEvent("page_view");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to track page view" }, { status: 500 });
  }
}

