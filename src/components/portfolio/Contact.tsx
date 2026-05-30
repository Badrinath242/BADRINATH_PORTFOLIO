import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./About";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { socials } from "@/lib/portfolio-data";
import { submitContactForm } from "@/lib/api/example.functions";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
  honey: z.string().max(0),
});

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const result = await submitContactForm({ data: parsed.data });
      if (!result.ok) {
        if (result.error === "NOT_CONFIGURED") {
          setFormError(t("contact.error.not_configured"));
        } else if (result.error === "RESEND_RECIPIENT_RESTRICTED") {
          setFormError(t("contact.error.resend_recipient"));
        } else {
          setFormError(t("contact.error.send_failed"));
        }
        return;
      }
      setSent(true);
      e.currentTarget.reset();
    } catch {
      setFormError(t("contact.error.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("contact.kicker")} title={t("contact.title")} />
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <a href={socials.email} className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-elegant transition group">
              <div className="size-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground group-hover:scale-110 transition">
                <Mail className="size-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-medium">chbadrinath123@gmail.com</div>
              </div>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-elegant transition group">
              <div className="size-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground group-hover:scale-110 transition">
                <Linkedin className="size-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">LinkedIn</div>
                <div className="font-medium">/in/badrinath-chitrala-3567501a9</div>
              </div>
            </a>
            <a href={socials.github} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-elegant transition group">
              <div className="size-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground group-hover:scale-110 transition">
                <Github className="size-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">GitHub</div>
                <div className="font-medium">@Badrinath242</div>
              </div>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass rounded-3xl p-7 space-y-4 shadow-elegant"
          >
            <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" />
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="size-14 rounded-full gradient-bg grid place-items-center text-primary-foreground mb-4">
                  <CheckCircle2 className="size-6" />
                </div>
                <p className="font-semibold">{t("contact.success")}</p>
              </div>
            ) : (
              <>
                {formError && (
                  <Alert variant="destructive" className="border-destructive/50">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-2">{t("contact.name")}</Label>
                    <Input id="name" name="name" maxLength={100} required disabled={submitting} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2">{t("contact.email")}</Label>
                    <Input id="email" name="email" type="email" maxLength={255} required disabled={submitting} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="mb-2">{t("contact.subject")}</Label>
                  <Input id="subject" name="subject" maxLength={150} required disabled={submitting} />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="mb-2">{t("contact.message")}</Label>
                  <Textarea id="message" name="message" rows={5} maxLength={2000} required disabled={submitting} />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="gradient-bg text-primary-foreground w-full"
                  disabled={submitting}
                >
                  <Send className="size-4" />
                  {submitting ? t("contact.sending") : t("contact.send")}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border py-10 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Badrinath Chitrala</div>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-foreground">{t("nav.about")}</a>
          <a href="#projects" className="hover:text-foreground">{t("nav.projects")}</a>
          <a href="#contact" className="hover:text-foreground">{t("nav.contact")}</a>
        </div>
        <div className="flex items-center gap-3">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="size-4" /></a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="size-4" /></a>
          <a href={socials.email} aria-label="Email"><Mail className="size-4" /></a>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-4">{t("footer.tag")}</div>
    </footer>
  );
}
