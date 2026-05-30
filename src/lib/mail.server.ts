/**
 * Server-only: sends contact form submissions via [Resend](https://resend.com).
 * Called from `submitContactForm` — never import this module from client code.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SendContactParams = {
  apiKey: string;
  to: string;
  from: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** Resend matches the account email case-sensitively in some paths; normalize mailbox. */
function normalizeRecipientEmail(addr: string): string {
  return addr.trim().toLowerCase();
}

/**
 * With `from` = Resend's test sender, API rules only allow your account email on
 * envelope-related fields. A visitor `reply_to` can trigger the same validation as
 * a non-owner `to`. Visitor address stays in the HTML; we omit `reply_to` in test mode.
 */
function isResendOnboardingFrom(from: string): boolean {
  return /onboarding@resend\.dev/i.test(from);
}

export async function sendPortfolioContactEmail(
  params: SendContactParams,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { apiKey, to, from, name, email, subject, message } = params;
  const html = `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<hr />
<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(message)}</pre>`;

  const toNormalized = normalizeRecipientEmail(to);
  const sandboxFrom = isResendOnboardingFrom(from);

  const body: Record<string, unknown> = {
    from,
    to: [toNormalized],
    subject: `[Portfolio] ${subject}`,
    html,
  };
  // Only set reply_to once you use a verified-domain `from` (see .env.example).
  if (!sandboxFrom) {
    body.reply_to = email.trim();
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = await res.text();
    try {
      const j = JSON.parse(detail) as { message?: string; name?: string };
      const parts = [j.name, j.message].filter((x): x is string => typeof x === "string" && x.length > 0);
      if (parts.length) detail = parts.join(": ");
    } catch {
      /* keep raw body */
    }
    return { ok: false, message: detail || `HTTP ${res.status}` };
  }

  return { ok: true };
}
