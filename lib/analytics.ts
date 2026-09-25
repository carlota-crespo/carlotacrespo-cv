export type AnalyticsEvent =
  | "view_experience"
  | "get_in_touch"
  | "linkedin"
  | "language_change"
  | "form_start"
  | "form_submit"
  | "form_error";

export function track(event: AnalyticsEvent, extra?: Record<string, string>) {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  if (!endpoint || typeof window === "undefined") {
    return;
  }

  const payload: Record<string, string> = {
    event,
    path: window.location.pathname,
  };

  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (key === "name" || key === "email" || key === "message") {
        continue;
      }
      payload[key] = value;
    }
  }

  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
