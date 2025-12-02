import { prisma } from "./prisma";
import { headers } from "next/headers";

function parseUserAgent(userAgent: string | null) {
  if (!userAgent) return { device: "unknown", os: "unknown", browser: "unknown" };

  const ua = userAgent.toLowerCase();
  
  let device = "desktop";
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
    device = "mobile";
  } else if (ua.includes("tablet") || ua.includes("ipad")) {
    device = "tablet";
  }

  let os = "unknown";
  if (ua.includes("windows")) os = "windows";
  else if (ua.includes("mac")) os = "macos";
  else if (ua.includes("linux")) os = "linux";
  else if (ua.includes("android")) os = "android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) os = "ios";

  let browser = "unknown";
  if (ua.includes("chrome") && !ua.includes("edg")) browser = "chrome";
  else if (ua.includes("firefox")) browser = "firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "safari";
  else if (ua.includes("edg")) browser = "edge";
  else if (ua.includes("opera")) browser = "opera";

  return { device, os, browser };
}

export async function trackEvent(
  type: string,
  entityId?: string,
  entityType?: string,
  metadata?: Record<string, unknown>
) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent");
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || undefined;
    const { device, os, browser } = parseUserAgent(userAgent);

    await prisma.analytics.create({
      data: {
        type,
        entityId,
        entityType,
        metadata: metadata || {},
        userAgent: userAgent || undefined,
        ipAddress,
        device,
        os,
        browser,
      },
    });
  } catch (error) {
    console.error("Failed to track analytics:", error);
  }
}

export async function getAnalyticsStats(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [pageViews, projectClicks, blogReads, deviceBreakdown, osBreakdown] = await Promise.all([
    prisma.analytics.count({
      where: {
        type: "page_view",
        createdAt: { gte: startDate },
      },
    }),
    prisma.analytics.count({
      where: {
        type: "project_click",
        createdAt: { gte: startDate },
      },
    }),
    prisma.analytics.count({
      where: {
        type: "blog_read",
        createdAt: { gte: startDate },
      },
    }),
    prisma.analytics.groupBy({
      by: ["device"],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
    }),
    prisma.analytics.groupBy({
      by: ["os"],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
    }),
  ]);

  return {
    pageViews,
    projectClicks,
    blogReads,
    deviceBreakdown: deviceBreakdown.map((d) => ({ device: d.device || "unknown", count: d._count })),
    osBreakdown: osBreakdown.map((o) => ({ os: o.os || "unknown", count: o._count })),
  };
}

export async function getMonthlyVisits() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const visits = await prisma.analytics.findMany({
    where: {
      type: "page_view",
      createdAt: { gte: sixMonthsAgo },
    },
    select: {
      createdAt: true,
    },
  });

  const monthlyData: Record<string, number> = {};
  visits.forEach((visit) => {
    const month = visit.createdAt.toISOString().slice(0, 7);
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  return Object.entries(monthlyData)
    .map(([month, count]) => ({ month, visits: count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

