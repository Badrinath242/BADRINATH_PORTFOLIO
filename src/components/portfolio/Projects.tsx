import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./About";
import { projects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { t } = useI18n();
  const allTech = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))), []);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <section id="projects" className="py-24 relative scroll-mt-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("projects.kicker")} title={t("projects.title")} />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${
              filter === "all" ? "gradient-bg text-primary-foreground border-transparent" : "border-border hover:bg-accent"
            }`}
          >
            {t("projects.filter.all")}
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${
                filter === tech ? "gradient-bg text-primary-foreground border-transparent" : "border-border hover:bg-accent"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass rounded-3xl p-7 hover:shadow-elegant transition relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 size-48 rounded-full opacity-0 group-hover:opacity-100 transition" style={{ background: "var(--gradient-glow)" }} />
                <div className="relative">
                  <div className="text-xs font-mono text-primary mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-xl font-bold mb-2">{t(`${p.id}.title`)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t(`${p.id}.desc`)}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <a href={p.github} target="_blank" rel="noreferrer"><Github className="size-4" /> {t("projects.github")}</a>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <a href={p.demo}><ExternalLink className="size-4" /> {t("projects.demo")}</a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
