import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { answerAI } from "@/lib/portfolio-data";

interface Msg { role: "user" | "bot"; text: string }

const SUGGESTION_SLOTS = 6;

function normalizeQuestion(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Ordered pool: first unused items fill the chip row (max SUGGESTION_SLOTS). */
const allSuggestionsEN = [
  "What technologies does he specialize in?",
  "Tell me about his Nokia experience.",
  "What projects has he built?",
  "Is he open to relocation?",
  "What backend technologies does he use?",
  "What roles is he targeting?",
  "Does he have cloud or Kubernetes experience?",
  "How does he approach system design?",
  "What's his education background?",
  "Has he worked with microservices?",
  "What programming languages does he use most?",
  "What's his experience with databases?",
  "Tell me about his AI or ML experience.",
  "What certifications does he hold?",
  "How can I contact him for an interview?",
  "What industries has he worked in?",
  "What's his leadership or mentoring experience?",
  "Does he contribute to open source?",
];
const allSuggestionsDE = [
  "Auf welche Technologien ist er spezialisiert?",
  "Erzähle mir von seiner Nokia-Erfahrung.",
  "Welche Projekte hat er gebaut?",
  "Ist er offen für einen Umzug?",
  "Welche Backend-Technologien nutzt er?",
  "Welche Rollen sucht er?",
  "Hat er Erfahrung mit Cloud oder Kubernetes?",
  "Wie geht er an Systemdesign heran?",
  "Was ist sein Bildungshintergrund?",
  "Hat er mit Microservices gearbeitet?",
  "Welche Programmiersprachen nutzt er am meisten?",
  "Wie ist seine Datenbank-Erfahrung?",
  "Erzähl mir von seiner KI- oder ML-Erfahrung.",
  "Welche Zertifizierungen hat er?",
  "Wie kann ich ihn für ein Interview kontaktieren?",
  "In welchen Branchen hat er gearbeitet?",
  "Wie sieht seine Führungs- oder Mentoring-Erfahrung aus?",
  "Trägt er zu Open Source bei?",
];

export function AIAssistant() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: lang === "de" ? "Hi! Frag mich alles über Badrinath." : "Hi! Ask me anything about Badrinath." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const askedNormalized = useMemo(
    () => new Set(messages.filter((m) => m.role === "user").map((m) => normalizeQuestion(m.text))),
    [messages],
  );

  const pool = lang === "de" ? allSuggestionsDE : allSuggestionsEN;
  const visibleSuggestions = useMemo(
    () => pool.filter((s) => !askedNormalized.has(normalizeQuestion(s))).slice(0, SUGGESTION_SLOTS),
    [pool, askedNormalized],
  );

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answerAI(q) }]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-30 size-14 rounded-full gradient-bg text-primary-foreground grid place-items-center shadow-elegant hover:shadow-glow transition"
          aria-label={t("ai.title")}
        >
          <MessageCircle className="size-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-[calc(100%-3rem)] sm:w-96 h-[32rem] rounded-3xl border border-border bg-card text-card-foreground shadow-elegant flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full gradient-bg grid place-items-center text-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t("ai.title")}</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="size-8 grid place-items-center rounded-full hover:bg-accent" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.role === "user" ? "gradient-bg text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {visibleSuggestions.length > 0 && (
              <div className="shrink-0 border-t border-border bg-muted/40 px-3 py-2.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-2">{t("ai.suggestions")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {visibleSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="text-left text-xs leading-snug px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-accent transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); ask(input); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.placeholder")}
                maxLength={300}
                className="flex-1 px-3 py-2 rounded-xl bg-secondary text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="size-9 grid place-items-center rounded-xl gradient-bg text-primary-foreground" aria-label={t("ai.send")}>
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
