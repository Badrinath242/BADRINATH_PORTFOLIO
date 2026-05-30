import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Play, Pause, RotateCcw, Volume2, VolumeX, Captions, Gauge,
  Linkedin, Github, Mail, Download, FolderGit2, MessageSquare, MapPin, Briefcase, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/profile-config";
import { socials } from "@/lib/portfolio-data";

/**
 * "Meet Badrinath in 60 Seconds" — AI Avatar style introduction.
 * Uses the browser's SpeechSynthesis API for narration so it works
 * fully offline without needing a hosted video file. Scene overlays
 * (tech stack, timeline, opportunities) are timed to the script.
 */

type Scene = {
  // start time in seconds (approximate, scales with speech rate)
  at: number;
  caption: string;
  kind:
    | "intro"
    | "experience"
    | "company"
    | "tech"
    | "passion"
    | "ai"
    | "opportunities"
    | "closing";
};

const SCRIPT: Scene[] = [
  { at: 0, kind: "intro", caption: "Hello, I'm Badrinath Chitrala." },
  { at: 3, kind: "experience", caption: "Software Engineer with 4+ years building scalable backend systems, distributed applications, and cloud-native solutions." },
  { at: 11, kind: "company", caption: "Currently at Nokia — contributing to telecom software for large-scale network optimization." },
  { at: 19, kind: "tech", caption: "I work extensively with Python, FastAPI, Flask, Kafka, Redis, Docker, Kubernetes, and modern distributed architectures." },
  { at: 28, kind: "passion", caption: "I'm passionate about reliable backend services and engineering with measurable business impact." },
  { at: 36, kind: "ai", caption: "I also explore machine learning and AI-driven applications to solve real-world problems." },
  { at: 43, kind: "opportunities", caption: "Open to opportunities in Germany, Europe, and globally — Backend, Platform, Distributed Systems, AI & Forward-Deployed Engineering." },
  { at: 53, kind: "closing", caption: "Thank you for visiting. I'd love to connect — let's talk." },
];

const TOTAL = 62; // seconds

const FULL_TEXT = SCRIPT.map((s) => s.caption).join(" ");

const TIMELINE = [
  { year: "2022", label: "Joined Nokia" },
  { year: "2023", label: "Customer-facing telecom delivery" },
  { year: "2024", label: "Distributed systems & cloud-native" },
  { year: "2025", label: "AI & machine learning initiatives" },
  { year: "2026", label: "Exploring global opportunities" },
];

const TECH = ["Python", "FastAPI", "Flask", "Kafka", "Redis", "Docker", "Kubernetes", "AI"];
const OPPS = ["Germany", "Europe", "Relocation", "Hybrid", "Remote", "Global"];

function trackAnalytics(event: string, data: Record<string, unknown> = {}) {
  try {
    const key = "meet-badrinath-analytics";
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push({ event, ...data, ts: Date.now() });
    localStorage.setItem(key, JSON.stringify(arr.slice(-200)));
  } catch {
    /* ignore */
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MeetBadrinath({ open, onClose }: Props) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [rate, setRate] = useState(1);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const startSpeech = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stopSpeech();
    if (muted) return;
    const u = new SpeechSynthesisUtterance(FULL_TEXT);
    u.rate = rate;
    u.pitch = 1;
    u.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /en-IN/i.test(v.lang)) ||
      voices.find((v) => /en-(GB|US)/i.test(v.lang) && /male|david|daniel|google/i.test(v.name)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (preferred) u.voice = preferred;
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }, [muted, rate]);

  const tick = useCallback(() => {
    if (startRef.current == null) return;
    const now = performance.now();
    const e = pausedAtRef.current + (now - startRef.current) / 1000;
    const scaled = e * rate;
    setElapsed(scaled);
    if (scaled >= TOTAL) {
      setPlaying(false);
      startRef.current = null;
      pausedAtRef.current = TOTAL;
      stopSpeech();
      trackAnalytics("complete", { duration: TOTAL });
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [rate]);

  const play = useCallback(() => {
    if (!started) {
      setStarted(true);
      trackAnalytics("view");
    }
    if (elapsed >= TOTAL) {
      pausedAtRef.current = 0;
      setElapsed(0);
    }
    startRef.current = performance.now();
    setPlaying(true);
    startSpeech();
    rafRef.current = requestAnimationFrame(tick);
  }, [elapsed, started, startSpeech, tick]);

  const pause = useCallback(() => {
    if (startRef.current != null) {
      pausedAtRef.current += ((performance.now() - startRef.current) / 1000) * rate;
    }
    startRef.current = null;
    setPlaying(false);
    stopSpeech();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    trackAnalytics("pause", { at: elapsed });
  }, [elapsed, rate]);

  const restart = () => {
    stopSpeech();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    pausedAtRef.current = 0;
    setElapsed(0);
    startRef.current = performance.now();
    setPlaying(true);
    startSpeech();
    rafRef.current = requestAnimationFrame(tick);
  };

  // Reset/cleanup when modal toggles
  useEffect(() => {
    if (!open) {
      stopSpeech();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setPlaying(false);
      setStarted(false);
      setElapsed(0);
      pausedAtRef.current = 0;
      startRef.current = null;
    }
    return () => {
      stopSpeech();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open]);

  // Re-sync speech when rate/mute changes mid-play
  useEffect(() => {
    if (playing) {
      stopSpeech();
      startSpeech();
    }
  }, [rate, muted]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = SCRIPT.reduce<Scene>((acc, s) => (elapsed >= s.at ? s : acc), SCRIPT[0]);
  const pct = Math.min(100, (elapsed / TOTAL) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md grid place-items-center p-3 md:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass rounded-3xl w-full max-w-4xl shadow-elegant overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 size-9 grid place-items-center rounded-full bg-background/70 hover:bg-background"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Stage */}
            <div className="relative aspect-video w-full bg-gradient-to-br from-background via-secondary to-background overflow-hidden">
              {/* Ambient */}
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute -top-20 -left-20 size-72 rounded-full blur-3xl" style={{ background: "var(--gradient-glow)" }} />
              <div className="absolute -bottom-24 -right-16 size-72 rounded-full blur-3xl" style={{ background: "var(--gradient-glow)" }} />

              {/* Avatar */}
              <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
                <div className="relative w-32 h-32 md:w-44 md:h-44">
                  <div
                    className="absolute -inset-1.5 rounded-full opacity-90 animate-[spin_8s_linear_infinite]"
                    style={{ background: "conic-gradient(from 0deg, var(--primary), var(--primary-glow), var(--accent), var(--primary))" }}
                  />
                  <div className="absolute inset-0 rounded-full bg-background m-1.5" />
                  <motion.img
                    src={profile.image}
                    alt={profile.imageAlt}
                    animate={playing ? { y: [0, -3, 0] } : { y: 0 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-full h-full rounded-full object-cover shadow-glow"
                  />
                  {playing && (
                    <span className="absolute z-20 bottom-1 right-1 flex size-3.5">
                      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70" />
                      <span className="relative size-3.5 rounded-full bg-emerald-500 border-2 border-background" />
                    </span>
                  )}
                </div>
                {/* Identity card */}
                <div className="mt-3 glass rounded-xl px-3 py-2 text-center md:text-left">
                  <div className="text-xs md:text-sm font-semibold">{profile.name}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Briefcase className="size-3" /> {profile.role} · {profile.company}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">{profile.experience}</div>
                </div>
              </div>

              {/* Scene content */}
              <div className="absolute right-3 md:right-8 top-6 bottom-24 md:bottom-20 left-[10.5rem] md:left-[16rem] z-10 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.kind}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {active.kind === "intro" && (
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono">Hello</div>
                        <h3 className="font-display text-2xl md:text-4xl font-bold mt-1 gradient-text">I'm Badrinath.</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-2">Software Engineer · Builder · Problem solver</p>
                      </div>
                    )}
                    {active.kind === "experience" && (
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {[
                          { k: "4+", v: "Years" },
                          { k: "Scalable", v: "Backend" },
                          { k: "Cloud", v: "Native" },
                        ].map((s) => (
                          <div key={s.k} className="glass rounded-xl p-2 md:p-3 text-center">
                            <div className="font-display text-lg md:text-2xl font-bold gradient-text">{s.k}</div>
                            <div className="text-[10px] md:text-xs text-muted-foreground">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {active.kind === "company" && (
                      <div className="space-y-2">
                        {TIMELINE.map((m, i) => (
                          <motion.div
                            key={m.year}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 glass rounded-lg px-3 py-1.5"
                          >
                            <span className="text-[10px] md:text-xs font-mono text-primary w-10">{m.year}</span>
                            <span className="text-xs md:text-sm">{m.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {active.kind === "tech" && (
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {TECH.map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.07, type: "spring", damping: 14 }}
                            className="px-2.5 py-1 rounded-md glass text-xs md:text-sm font-mono"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    )}
                    {active.kind === "passion" && (
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono">What drives me</div>
                        <h3 className="font-display text-xl md:text-3xl font-bold mt-1">Reliable systems. Measurable impact.</h3>
                      </div>
                    )}
                    {active.kind === "ai" && (
                      <div className="glass rounded-2xl p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono">AI & ML</div>
                        <p className="text-sm md:text-base mt-1">Exploring ML & AI-driven applications for real-world problems.</p>
                      </div>
                    )}
                    {active.kind === "opportunities" && (
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {OPPS.map((o, i) => (
                          <motion.span
                            key={o}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass text-xs"
                          >
                            <CheckCircle2 className="size-3 text-emerald-500" />
                            {o === "Germany" || o === "Europe" ? <MapPin className="size-3" /> : null}
                            {o}
                          </motion.span>
                        ))}
                      </div>
                    )}
                    {active.kind === "closing" && (
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono">Let's connect</div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 gradient-text">Thank you for visiting.</h3>
                        <div className="mt-3 flex gap-2 flex-wrap">
                          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="size-9 grid place-items-center rounded-full glass" aria-label="LinkedIn"><Linkedin className="size-4" /></a>
                          <a href={socials.github} target="_blank" rel="noreferrer" className="size-9 grid place-items-center rounded-full glass" aria-label="GitHub"><Github className="size-4" /></a>
                          <a href={socials.email} className="size-9 grid place-items-center rounded-full glass" aria-label="Email"><Mail className="size-4" /></a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Captions */}
              {captionsOn && started && (
                <div className="absolute left-3 right-3 md:left-8 md:right-8 bottom-16 z-20 flex justify-center pointer-events-none">
                  <div className="max-w-2xl text-center text-xs md:text-sm bg-background/80 backdrop-blur px-3 py-1.5 rounded-lg">
                    {active.caption}
                  </div>
                </div>
              )}

              {/* Start overlay */}
              {!started && (
                <button
                  onClick={play}
                  className="absolute inset-0 z-20 grid place-items-center group"
                  aria-label="Play introduction"
                >
                  <div className="size-20 md:size-24 rounded-full grid place-items-center gradient-bg shadow-elegant group-hover:scale-105 transition-transform">
                    <Play className="size-8 md:size-10 text-primary-foreground ml-1" />
                  </div>
                  <div className="absolute bottom-8 text-xs md:text-sm text-muted-foreground">
                    Meet Badrinath in 60 Seconds
                  </div>
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="p-3 md:p-4 border-t border-border bg-background/60 backdrop-blur">
              {/* Progress */}
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full gradient-bg"
                  animate={{ width: `${pct}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={playing ? pause : play}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={restart} aria-label="Restart">
                  <RotateCcw className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </Button>
                <Button
                  size="sm"
                  variant={captionsOn ? "secondary" : "ghost"}
                  onClick={() => setCaptionsOn((c) => !c)}
                  aria-label="Toggle captions"
                >
                  <Captions className="size-4" />
                </Button>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Gauge className="size-3.5" />
                  {[0.75, 1, 1.25, 1.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRate(r)}
                      className={`px-1.5 py-0.5 rounded font-mono ${rate === r ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                    >
                      {r}x
                    </button>
                  ))}
                </div>
                <div className="ml-auto text-xs font-mono text-muted-foreground">
                  {Math.floor(elapsed)}s / {TOTAL}s
                </div>
              </div>

              {/* Closing CTAs */}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" className="gradient-bg text-primary-foreground">
                  <a href={profile.resumeUrl} download={profile.resumeDownloadFileName}>
                    <Download className="size-4" /> View Resume
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" onClick={onClose}>
                  <a href="#projects"><FolderGit2 className="size-4" /> View Projects</a>
                </Button>
                <Button asChild size="sm" variant="ghost" onClick={onClose}>
                  <a href="#contact"><MessageSquare className="size-4" /> Contact Me</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
