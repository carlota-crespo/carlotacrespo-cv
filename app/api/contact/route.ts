import { NextResponse } from "next/server";
import { CONTACT_SOURCE } from "@/lib/constants";
import { validateContactInput } from "@/lib/contact";
import { locales, type Locale } from "@/i18n/routing";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  if (typeof record.company === "string" && record.company.trim()) {
    return NextResponse.json({ error: "rejected" }, { status: 400 });
  }

  const name = typeof record.name === "string" ? record.name : "";
  const email = typeof record.email === "string" ? record.email : "";
  const message = typeof record.message === "string" ? record.message : "";
  const locale = record.locale;

  const fieldErrors = validateContactInput({ name, email, message });
  if (Object.keys(fieldErrors).length > 0 || !isLocale(locale)) {
    return NextResponse.json(
      { error: "validation", fields: fieldErrors },
      { status: 400 },
    );
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    locale,
    createdAt: new Date().toISOString(),
    source: CONTACT_SOURCE,
  };

  const endpoint = process.env.CONTACT_API_URL?.trim();
  if (!endpoint) {
    return NextResponse.json({ error: "not_enabled" }, { status: 503 });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
