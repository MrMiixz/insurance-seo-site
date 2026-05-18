export async function onRequestPost({ request, env }) {
  const payload = await request.json().catch(() => ({}));
  const event = {
    type: "pageview",
    receivedAt: new Date().toISOString(),
    site: "insurance-by-miixz.pages.dev",
    path: payload.path || "",
    title: payload.title || "",
    referrer: payload.referrer || ""
  };

  if (env.PAGEVIEW_WEBHOOK_URL) {
    await fetch(env.PAGEVIEW_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });
  }

  return Response.json({ ok: true });
}
