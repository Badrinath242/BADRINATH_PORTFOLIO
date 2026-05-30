import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  desc?: string;
}

export function SectionHeader({ kicker, title, desc }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono mb-4 uppercase tracking-wider text-primary">
        {kicker}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function About() {
  const { t } = useI18n();
  const stats = [
    { value: 4, suffix: "+", labelKey: "about.stat.years" },
    { value: 12, suffix: "+", labelKey: "about.stat.customers" },
    { value: 8, suffix: "+", labelKey: "about.stat.cloud" },
    { value: 5, suffix: "+", labelKey: "about.stat.ai" },
    { value: 20, suffix: "+", labelKey: "about.stat.backend" },
  ];
  return (
    <section id="about" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeader kicker={t("about.kicker")} title={t("about.title")} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
        >
          {t("about.body")}
        </motion.p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center hover:shadow-elegant transition"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text font-display">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs md:text-sm text-muted-foreground">{t(s.labelKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
