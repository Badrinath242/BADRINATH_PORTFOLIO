import { motion } from "framer-motion";
import { Users, Server, Brain, Cloud, MapPin, Briefcase, Calendar, Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./About";
import { targetRoles, locations, workPrefs } from "@/lib/portfolio-data";

const impactCards = [
  { icon: Users, t: "impact.c1.t", d: "impact.c1.d" },
  { icon: Server, t: "impact.c2.t", d: "impact.c2.d" },
  { icon: Brain, t: "impact.c3.t", d: "impact.c3.d" },
  { icon: Cloud, t: "impact.c4.t", d: "impact.c4.d" },
];

export function Impact() {
  const { t } = useI18n();
  return (
    <section className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("impact.kicker")} title={t("impact.title")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 hover:shadow-elegant transition"
              >
                <div className="size-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-bold mb-2">{t(c.t)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(c.d)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Opportunities() {
  const { t } = useI18n();
  const cards = [
    { icon: Briefcase, label: t("opp.current"), value: t("opp.current.v") },
    { icon: Calendar, label: t("opp.exp"), value: t("opp.exp.v") },
  ];
  return (
    <section id="opportunities" className="py-24 relative scroll-mt-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("opp.kicker")} title={t("opp.title")} />

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 flex items-center gap-4 hover:shadow-elegant transition"
              >
                <div className="size-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-semibold">{c.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3"><Briefcase className="size-4 text-primary" /> {t("opp.roles")}</div>
            <div className="flex flex-wrap gap-2">
              {targetRoles.map((r) => (
                <span key={r} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">{r}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3"><MapPin className="size-4 text-primary" /> {t("opp.locations")}</div>
            <div className="flex flex-wrap gap-2">
              {locations.map((r) => (
                <span key={r} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">{r}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3"><Globe2 className="size-4 text-primary" /> {t("opp.preference")}</div>
            <div className="flex flex-wrap gap-2">
              {workPrefs.map((r) => (
                <span key={r} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">{r}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center text-muted-foreground max-w-2xl mx-auto">
          <span className="font-semibold text-foreground">{t("opp.availability")}:</span> {t("opp.availability.v")}
        </motion.div>
      </div>
    </section>
  );
}
