import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./About";
import { timeline } from "@/lib/portfolio-data";

export function Experience() {
  const { t } = useI18n();
  const highlights = ["exp.h1", "exp.h2", "exp.h3", "exp.h4", "exp.h5", "exp.h6"];

  return (
    <section id="experience" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("exp.kicker")} title={t("exp.title")} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-elegant"
        >
          <div className="flex flex-wrap items-start gap-4 justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl gradient-bg grid place-items-center text-primary-foreground">
                <Building2 className="size-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{t("exp.company")}</h3>
                <p className="text-muted-foreground">{t("exp.role")}</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full glass text-xs font-mono">{t("exp.period")}</span>
          </div>
          <ul className="space-y-3">
            {highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3"
              >
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t(h)}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10 font-display">{t("exp.timeline")}</h3>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-8 ${
                  i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
                }`}
              >
                <div className={`md:text-right ${i % 2 === 0 ? "" : "md:text-left"}`}>
                  <div className="glass rounded-2xl p-5 inline-block hover:shadow-elegant transition">
                    <div className="text-xs font-mono text-primary mb-1">{item.year}</div>
                    <div className="font-medium">{t(item.key)}</div>
                  </div>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-4 md:left-1/2 top-5 size-3 rounded-full gradient-bg ring-4 ring-background md:-translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
