import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): Promise<{ success: boolean; remaining: number }> {
  const now = Date.now();
  const key = identifier;

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  rateLimitMap.set(key, record);

  return { success: true, remaining: maxRequests - record.count };
}

export async function getRateLimitIdentifier(): Promise<string> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  return ip.split(",")[0].trim();
}

