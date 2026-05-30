import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles, MapPin, Briefcase, CheckCircle2, PlayCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/portfolio-data";
import { profile } from "@/lib/profile-config";
import { MeetBadrinath } from "./MeetBadrinath";


const rotatingRoles = [
  "Backend Engineer",
  "Python Developer",
  "Distributed Systems Engineer",
  "Cloud Native Developer",
  "AI Enthusiast",
];

function Typer() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = rotatingRoles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(full.slice(0, text.length + 1));
          if (text.length + 1 === full.length) setTimeout(() => setDeleting(true), 1400);
        } else {
          setText(full.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % rotatingRoles.length);
          }
        }
      },
      deleting ? 35 : 70
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text font-display font-semibold">
      {text}
      <span className="inline-block w-0.5 h-[1em] align-middle bg-primary animate-pulse ml-1" />
    </span>
  );
}

export function Hero() {
  const { t } = useI18n();
  const [meetOpen, setMeetOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-dvh flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/3 -left-32 size-96 rounded-full blur-3xl" style={{ background: "var(--gradient-glow)" }} />
      <div className="absolute bottom-0 -right-32 size-96 rounded-full blur-3xl" style={{ background: "var(--gradient-glow)" }} />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-6"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {t("hero.available")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05]"
            >
              <span className="text-muted-foreground text-3xl md:text-4xl block mb-3">{t("hero.greeting")}</span>
              <span className="gradient-text">{t("hero.name")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-xl md:text-2xl"
            >
              <Typer />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t("hero.summary")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {profile.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full glass text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> {h}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                onClick={() => setMeetOpen(true)}
                size="lg"
                className="gradient-bg text-primary-foreground shadow-elegant hover:opacity-90 relative overflow-hidden group"
              >
                <PlayCircle className="size-4" />
                Meet Badrinath in 60 Seconds
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#projects"><Sparkles className="size-4" /> {t("hero.cta.projects")}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.resumeUrl} download={profile.resumeDownloadFileName}>
                  <Download className="size-4" /> {t("hero.cta.resume")}
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#contact"><Mail className="size-4" /> {t("hero.cta.contact")}</a>
              </Button>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-3"
            >
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="size-10 grid place-items-center rounded-full glass hover:shadow-elegant transition">
                <Github className="size-4" />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="size-10 grid place-items-center rounded-full glass hover:shadow-elegant transition">
                <Linkedin className="size-4" />
              </a>
              <a href={socials.email} aria-label="Email" className="size-10 grid place-items-center rounded-full glass hover:shadow-elegant transition">
                <Mail className="size-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2 relative w-full max-w-sm mx-auto"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-6 rounded-[2rem] gradient-bg opacity-20 blur-3xl animate-pulse" />

            {/* Glassmorphism profile card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative glass rounded-[2rem] shadow-elegant p-6 md:p-7"
            >
              {/* Profile image with rotating gradient ring */}
              <div className="relative mx-auto w-44 h-44 md:w-52 md:h-52 group">
                <div
                  className="absolute -inset-1.5 rounded-full opacity-90 animate-[spin_8s_linear_infinite]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--primary), var(--primary-glow), var(--accent), var(--primary))",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 rounded-full bg-background m-1.5" aria-hidden />
                <img
                  src={profile.image}
                  alt={profile.imageAlt}
                  width={416}
                  height={416}
                  loading="eager"
                  decoding="async"
                  className="relative z-10 w-full h-full rounded-full object-cover shadow-glow transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Availability dot */}
                <span className="absolute z-20 bottom-2 right-2 flex size-5">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative inline-flex size-5 rounded-full bg-emerald-500 border-2 border-background" />
                </span>
              </div>

              {/* Identity */}
              <div className="text-center mt-5">
                <h2 className="font-display text-xl font-semibold tracking-tight">{profile.name}</h2>
                <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" /> {profile.role} · {profile.company}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">{profile.specialization}</p>
              </div>

              {/* Meta row */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl glass py-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Experience</div>
                  <div className="text-sm font-semibold">{profile.experience}</div>
                </div>
                <div className="rounded-xl glass py-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Location</div>
                  <div className="text-sm font-semibold inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {profile.location}
                  </div>
                </div>
              </div>

              {/* Relocation */}
              <div className="mt-3 text-[11px] text-center text-muted-foreground px-2">
                🌍 {profile.relocation}
              </div>

              {/* Tech badges */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {profile.badges.map((b, i) => (
                  <motion.span
                    key={b}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md glass text-foreground/80 hover:text-primary hover:shadow-elegant transition"
                  >
                    {b}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground"
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce" />
        </motion.a>
      </div>
      <MeetBadrinath open={meetOpen} onClose={() => setMeetOpen(false)} />
    </section>
  );
}

