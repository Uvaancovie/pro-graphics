# DDoS Protection and Security for Vercel Edge Functions

Vercel provides robust, built-in DDoS protection out of the box at the Edge network layer. However, you can implement additional security measures within your application to add layers of resilience to your API routes and Edge Functions.

## 1. Built-in Vercel Edge Network Protection
By simply hosting your application on Vercel, you automatically benefit from their globally distributed Anycast network.
- **Automated Mitigation:** Vercel automatically mitigates volumetric network (Layer 3/4) DDoS attacks.
- **Vercel Web Application Firewall (WAF):** Vercel WAF protects your application against application-layer (Layer 7) attacks. It blocks malicious traffic before it hits your serverless or edge functions.
- **Edge Caching:** Static assets and cached API responses are served directly from the CDN Edge, absorbing massive traffic spikes without invoking backend compute functions.

## 2. Implementing Application-Level Rate Limiting
To prevent abuse of specific endpoints (such as your `/api/lead-capture` or `/api/price-beat` forms) which might cause excessive billing or database overload, you should implement application-level rate limiting using Vercel KV and Upstash.

**Example Implementation Using `@upstash/ratelimit`:**

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// Create a new ratelimiter that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  // Rate limit by IP
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { 
        status: 429, 
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        }
      }
    );
  }

  // Continue with your function logic...
}
```

## 3. Custom Firewalls inside `next.config.js`
For Vercel Enterprise or Pro plans, Vercel WAF rules can be explicitly configured. But you can also block malicious user agents or IP ranges natively via Next.js Middleware or `vercel.json` file.

## 4. Securing Edge Functions and Backend Routes
- **Payload Size Limits:** Prevent memory exhaustion by verifying request payload sizes in your forms. Next.js limits serverless function payloads to 4MB by default, but you should enforce stricter limits using Zod validation.
- **CORS Configuration:** Ensure `Access-Control-Allow-Origin` strictly points to your domain (e.g., `https://pro-graphics.co.za`) rather than `*` to prevent cross-origin scripting attempts.
- **Authentication/Tokens:** Ensure routes fetching secure data require valid authorization headers (Supabase JWTs).

## Security Testing / Auditing Strategy

To test the resilience of your APIs, it is highly recommended to perform Controlled Load Testing.

1. **Do not perform unannounced DDoS tests:** Vercel's Terms of Service strictly forbid conducting unannounced automated vulnerability or load tests. If you perform an actual DDoS test, Vercel will likely ban your account.
2. **Authorized Load Testing:** Instead of DDoS testing, perform structured Load Testing using tools like **K6**, **Artillery**, or **JMeter**.
3. **Validate Rate Limiting:** Run a script that intentionally hits your API 20+ times within a few seconds and verify that the API successfully returns a `429 Too Many Requests` status block.
