import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// Verify if the project has KV provisioned (Vercel automatically injects KV_REST_API_URL)
export const hasKvStore = process.env.KV_REST_API_URL !== undefined;

export const ratelimit = hasKvStore
  ? new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
    analytics: true,
  })
  : { limit: async (ip: string) => ({ success: true, pending: Promise.resolve(), limit: 10, reset: 0, remaining: 10 }) }; // Dummy limiter for local dev if KV is not setup

export const corsHeaders = {
  // In production, strictly restrict to your real domain. During dev, allow localhost.
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
    ? 'https://pro-graphics.co.za'
    : '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper middleware for rate limiting and payload validation
export async function securityMiddleware(req: Request) {
  // 1. Payload Size Validation (Approx 1MB limit for safety to prevent memory exhaustion)
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 1048576) {
    return NextResponse.json({ error: 'Payload too large, limit is 1MB.' }, { status: 413, headers: corsHeaders });
  }

  // 2. IP Based Rate Limiting
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success, limit, remaining, reset } = await ratelimit!.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        }
      }
    );
  }

  return null; // Signals OK
}
