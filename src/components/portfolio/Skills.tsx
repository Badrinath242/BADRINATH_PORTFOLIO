import { motion } from "framer-motion";
import { Database, Server, Network, Cloud, Code2, Brain } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./About";
import { skills } from "@/lib/portfolio-data";

const categories = [
  { key: "backend", icon: Server, items: skills.backend, labelKey: "skills.backend" },
  { key: "databases", icon: Database, items: skills.databases, labelKey: "skills.databases" },
  { key: "distributed", icon: Network, items: skills.distributed, labelKey: "skills.distributed" },
  { key: "cloud", icon: Cloud, items: skills.cloud, labelKey: "skills.cloud" },
  { key: "frontend", icon: Code2, items: skills.frontend, labelKey: "skills.frontend" },
  { key: "ai", icon: Brain, items: skills.ai, labelKey: "skills.ai" },
];

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="py-24 relative scroll-mt-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("skills.kicker")} title={t("skills.title")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 hover:shadow-elegant transition group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground group-hover:scale-110 transition-transform">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{t(cat.labelKey)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-mono border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
