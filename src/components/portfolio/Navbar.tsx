import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "skills", key: "nav.skills" },
  { id: "projects", key: "nav.projects" },
  { id: "opportunities", key: "nav.opportunities" },
  { id: "contact", key: "nav.contact" },
];

interface NavbarProps {
  onRecruiter: () => void;
}

export function Navbar({ onRecruiter }: NavbarProps) {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between transition-shadow ${scrolled ? "shadow-elegant" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <div className="size-8 rounded-lg gradient-bg grid place-items-center text-primary-foreground text-sm">BC</div>
            <span className="hidden sm:inline">Badrinath</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors relative"
              >
                {t(s.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "de" : "en")}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border text-xs font-mono hover:bg-accent transition"
              aria-label="Toggle language"
            >
              <span className={lang === "en" ? "text-foreground font-semibold" : "text-muted-foreground"}>EN</span>
              <span className="text-muted-foreground">|</span>
              <span className={lang === "de" ? "text-foreground font-semibold" : "text-muted-foreground"}>DE</span>
            </button>
            <button
              onClick={toggle}
              className="size-9 grid place-items-center rounded-md border border-border hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button onClick={onRecruiter} size="sm" className="hidden md:inline-flex gap-2">
              <Briefcase className="size-4" />
              {t("nav.recruiter")}
            </Button>
            <button
              className="lg:hidden size-9 grid place-items-center rounded-md border border-border"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3 flex flex-col"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-accent text-sm"
                >
                  {t(s.key)}
                </a>
              ))}
              <button
                onClick={() => {
                  setLang(lang === "en" ? "de" : "en");
                }}
                className="mt-2 px-3 py-2 rounded-md border border-border text-sm font-mono text-left"
              >
                {lang === "en" ? "Sprache: EN" : "Language: DE"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
