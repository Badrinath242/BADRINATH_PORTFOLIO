import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

// Example createServerFn. Server-side handler invoked from the client:
//   const result = await getGreeting({ data: { name: "Ada" } })
// The .handler body runs server-only — imports used only inside it (like
// .server.ts modules) are tree-shaken from the client bundle. Module-level
// code here still ships to the client; for truly server-only helpers, put
// them in a .server.ts file. Use this pattern instead of Supabase Edge
// Functions for server logic.

export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });

/** Trim, strip CR/LF, and optional wrapping quotes from .env values. */
function normalizeSecret(raw: string | undefined): string | undefined {
  if (raw == null) return undefined;
  let v = raw.trim().replace(/\r?\n/g, "");
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v.length > 0 ? v : undefined;
}

const contactInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
  honey: z.preprocess(
    (v) => (v === undefined || v === null ? "" : String(v)),
    z.string().max(0),
  ),
});

export type ContactSubmitResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | "NOT_CONFIGURED"
        | "SEND_FAILED"
        | "RESEND_RECIPIENT_RESTRICTED";
      detail?: string;
    };

function isResendSandboxRecipientError(message: string): boolean {
  return (
    /only send testing emails to your own email address/i.test(message) ||
    /verify a domain at resend\.com\/domains/i.test(message)
  );
}

/**
 * Contact form → Resend. Env: `RESEND_API_KEY`, `CONTACT_MAIL_TO`, optional `CONTACT_MAIL_FROM`.
 * See `.env.example`. Restart dev server after changing `.env`.
 */
export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactInputSchema)
  .handler(async ({ data }): Promise<ContactSubmitResult> => {
    const apiKey = normalizeSecret(process.env.RESEND_API_KEY);
    const to = normalizeSecret(process.env.CONTACT_MAIL_TO);
    const from =
      normalizeSecret(process.env.CONTACT_MAIL_FROM) ??
      "Portfolio <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.warn(
        "[contact] RESEND_API_KEY or CONTACT_MAIL_TO is missing — email not sent.",
      );
      return { ok: false, error: "NOT_CONFIGURED" };
    }

    const { sendPortfolioContactEmail } = await import("../mail.server");
    const sent = await sendPortfolioContactEmail({
      apiKey,
      to,
      from,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (!sent.ok) {
      console.error("[contact] Resend error:", sent.message);
      if (isResendSandboxRecipientError(sent.message)) {
        return {
          ok: false,
          error: "RESEND_RECIPIENT_RESTRICTED",
          detail: sent.message,
        };
      }
      return { ok: false, error: "SEND_FAILED", detail: sent.message };
    }

    return { ok: true };
  });
