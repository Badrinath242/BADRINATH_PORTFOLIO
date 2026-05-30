import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { answerAI } from "@/lib/portfolio-data";

interface Msg { role: "user" | "bot"; text: string }

const suggestionsEN = [
  "What technologies does he specialize in?",
  "Tell me about his Nokia experience.",
  "What projects has he built?",
  "Is he open to relocation?",
  "What backend technologies does he use?",
  "What roles is he targeting?",
];
const suggestionsDE = [
  "Auf welche Technologien ist er spezialisiert?",
  "Erzähle mir von seiner Nokia-Erfahrung.",
  "Welche Projekte hat er gebaut?",
  "Ist er offen für einen Umzug?",
  "Welche Backend-Technologien nutzt er?",
  "Welche Rollen sucht er?",
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

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answerAI(q) }]);
    setInput("");
  };

  const suggestions = lang === "de" ? suggestionsDE : suggestionsEN;

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
            className="fixed bottom-6 right-6 z-40 w-[calc(100%-3rem)] sm:w-96 h-[32rem] glass rounded-3xl shadow-elegant flex flex-col overflow-hidden"
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

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.role === "user" ? "gradient-bg text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {messages.length <= 1 && (
                <div className="space-y-2 pt-2">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => ask(s)} className="block w-full text-left text-xs px-3 py-2 rounded-xl border border-border hover:bg-accent transition">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

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
