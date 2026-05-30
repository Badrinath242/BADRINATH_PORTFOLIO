import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Play } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const steps = [
  { id: null, titleEn: "Welcome", titleDe: "Willkommen", bodyEn: "I'll walk you through the highlights of my engineering journey.", bodyDe: "Ich führe dich durch die Highlights meiner Engineering-Reise." },
  { id: "about", titleEn: "About Me", titleDe: "Über mich", bodyEn: "4+ years building scalable backend systems.", bodyDe: "Über 4 Jahre skalierbare Backend-Systeme." },
  { id: "skills", titleEn: "Core Skills", titleDe: "Kernkompetenzen", bodyEn: "Python, Kafka, Kubernetes, AI/ML, and more.", bodyDe: "Python, Kafka, Kubernetes, KI/ML und mehr." },
  { id: "experience", titleEn: "Experience", titleDe: "Erfahrung", bodyEn: "Software Engineer at Nokia — customer-facing telecom & AI work.", bodyDe: "Software Engineer bei Nokia — kundenorientierte Telekom- und KI-Arbeit." },
  { id: "projects", titleEn: "Projects", titleDe: "Projekte", bodyEn: "Hand-picked projects across backend, AI, and cloud-native.", bodyDe: "Ausgewählte Projekte aus Backend, KI und Cloud-Native." },
  { id: "opportunities", titleEn: "Global Opportunities", titleDe: "Globale Chancen", bodyEn: "Open to roles across Germany, Europe, and remote.", bodyDe: "Offen für Rollen in Deutschland, Europa und remote." },
  { id: "contact", titleEn: "Contact", titleDe: "Kontakt", bodyEn: "Let's talk. Use the form or reach out directly.", bodyDe: "Lass uns reden. Nutze das Formular oder kontaktiere mich direkt." },
];

export function GuidedTour() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem("tour-dismissed") === "1");
  }, []);

  useEffect(() => {
    if (!open) return;
    const s = steps[step];
    if (s.id) {
      const el = document.getElementById(s.id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step, open]);

  const start = () => {
    setStep(0);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const dismissForever = () => {
    localStorage.setItem("tour-dismissed", "1");
    setDismissed(true);
    setOpen(false);
  };

  const current = steps[step];

  return (
    <>
      {!dismissed && !open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          onClick={start}
          className="fixed bottom-6 left-6 z-30 glass rounded-full pl-4 pr-5 py-3 flex items-center gap-2 shadow-elegant text-sm font-medium hover:shadow-glow transition"
        >
          <span className="size-7 rounded-full gradient-bg grid place-items-center text-primary-foreground">
            <Play className="size-3.5" />
          </span>
          {t("nav.tour")}
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm pointer-events-none" />
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl p-5 max-w-md w-[calc(100%-2rem)] shadow-elegant"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-xs font-mono text-primary mb-1">{step + 1} / {steps.length}</div>
                  <h3 className="font-bold text-lg">{lang === "de" ? current.titleDe : current.titleEn}</h3>
                </div>
                <button onClick={close} className="size-7 grid place-items-center rounded-full hover:bg-accent">
                  <X className="size-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{lang === "de" ? current.bodyDe : current.bodyEn}</p>
              <div className="h-1 rounded-full bg-secondary overflow-hidden mb-4">
                <motion.div className="h-full gradient-bg" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <button onClick={dismissForever} className="text-xs text-muted-foreground hover:text-foreground underline">
                  {t("tour.dont")}
                </button>
                <div className="flex gap-2">
                  {step > 0 && (
                    <Button size="sm" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                      <ArrowLeft className="size-4" /> {t("tour.prev")}
                    </Button>
                  )}
                  {step < steps.length - 1 ? (
                    <Button size="sm" className="gradient-bg text-primary-foreground" onClick={() => setStep((s) => s + 1)}>
                      {t("tour.next")} <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button size="sm" className="gradient-bg text-primary-foreground" onClick={close}>
                      {t("tour.done")}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
