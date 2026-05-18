const DEFAULT_LEAD_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzzzlmxfDHhpOzCNA7S9WTICS4yYbdI4J9ZW4TcZWh_Q0V2jwca_AGQ1wiB_A6yKhAt0w/exec";

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

  const webhookUrl = env.LEAD_WEBHOOK_URL || DEFAULT_LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(lead)
    });

    if (!response.ok) {
      return Response.json({ ok: false, message: "Webhook failed" }, { status: 502 });
    }

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.ok === false) {
        return Response.json({ ok: false, message: result.message || "Webhook rejected lead" }, { status: 502 });
      }
    } catch {
      return Response.json({ ok: false, message: "Webhook did not return JSON" }, { status: 502 });
    }

    return Response.json({ ok: true, forwarded: true });
  }

  return Response.json({
    ok: true,
    forwarded: false,
    message: "Set LEAD_WEBHOOK_URL in Cloudflare Pages to override the default lead webhook."
  });
}

export async function onRequestGet() {
  return Response.json({ ok: true, endpoint: "lead" });
}
