export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const required = ["fullName", "phone", "preferredTime", "monthlyIncome", "consent"];
  const missing = required.filter((key) => !String(payload[key] || "").trim());
  if (missing.length) {
    return Response.json({ ok: false, message: "Missing required fields", missing }, { status: 400 });
  }

  const lead = {
    type: "insurance_interest",
    receivedAt: new Date().toISOString(),
    site: "insurance-by-miixz.pages.dev",
    ...payload
  };

  if (env.LEAD_WEBHOOK_URL) {
    const response = await fetch(env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });

    if (!response.ok) {
      return Response.json({ ok: false, message: "Webhook failed" }, { status: 502 });
    }

    return Response.json({ ok: true, forwarded: true });
  }

  return Response.json({
    ok: true,
    forwarded: false,
    message: "Set LEAD_WEBHOOK_URL in Cloudflare Pages to save and notify leads."
  });
}

export async function onRequestGet() {
  return Response.json({ ok: true, endpoint: "lead" });
}
