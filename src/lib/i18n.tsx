import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "de";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.opportunities": "Opportunities",
  "nav.contact": "Contact",
  "nav.recruiter": "Recruiter Mode",
  "nav.tour": "Take a 2-Minute Tour",

  "hero.greeting": "Hi, I'm",
  "hero.name": "Badrinath Chitrala",
  "hero.subtitle": "Software Engineer · Backend Engineer · Distributed Systems Enthusiast",
  "hero.summary":
    "I build scalable backend systems, cloud-native applications, distributed architectures, and intelligent software solutions that solve real-world problems.",
  "hero.cta.projects": "View Projects",
  "hero.cta.resume": "Download Resume",
  "hero.cta.contact": "Contact Me",
  "hero.available": "Available for new opportunities",

  "about.title": "About Me",
  "about.kicker": "About",
  "about.body":
    "Software Engineer with 4+ years of experience designing and building scalable backend systems using Python, FastAPI, Flask, Kafka, Redis, Docker, Kubernetes, and cloud-native technologies. Passionate about distributed systems, AI applications, and building software that delivers measurable business impact.",
  "about.stat.years": "Years Experience",
  "about.stat.customers": "Enterprise Deliveries",
  "about.stat.cloud": "Cloud Native Projects",
  "about.stat.ai": "AI Projects",
  "about.stat.backend": "Backend Systems Built",

  "skills.title": "Skills & Technologies",
  "skills.kicker": "Toolbox",
  "skills.backend": "Backend",
  "skills.databases": "Databases",
  "skills.distributed": "Distributed Systems",
  "skills.cloud": "Cloud & DevOps",
  "skills.frontend": "Frontend",
  "skills.ai": "AI & Data",

  "exp.title": "Experience",
  "exp.kicker": "Career",
  "exp.role": "Software Engineer",
  "exp.company": "Nokia",
  "exp.period": "2022 — Present",
  "exp.h1": "Developed scalable backend services for telecom network optimization.",
  "exp.h2": "Built customer-facing features used by global telecom operators.",
  "exp.h3": "Worked extensively with distributed systems and cloud-native deployments.",
  "exp.h4": "Contributed to AI-driven network optimization initiatives.",
  "exp.h5": "Collaborated directly with customers to transform business requirements into production-ready software.",
  "exp.h6": "Delivered customer-critical features with high quality and rapid turnaround.",
  "exp.timeline": "Career Timeline",
  "exp.t2022": "Joined Nokia",
  "exp.t2023": "Delivered customer-facing telecom software features",
  "exp.t2024": "Worked on distributed systems and cloud-native deployments",
  "exp.t2025": "Expanded into AI and machine learning solutions",
  "exp.t2026": "Actively exploring global software engineering opportunities",

  "projects.title": "Featured Projects",
  "projects.kicker": "Work",
  "projects.filter.all": "All",
  "projects.github": "GitHub",
  "projects.demo": "Live Demo",
  "p1.title": "AI-Based Mobility Optimization",
  "p1.desc": "Developed machine learning and AI solutions for telecom network optimization and mobility management.",
  "p2.title": "Collaborative Drawing Board",
  "p2.desc": "Built a scalable collaborative drawing platform with containerized deployment architecture.",
  "p3.title": "Rebus Puzzle Web Application",
  "p3.desc": "Interactive game platform where users solve visual word puzzles.",
  "p4.title": "Portfolio Website",
  "p4.desc": "A multilingual, recruiter-focused portfolio showcasing engineering expertise.",

  "impact.title": "Impact Highlights",
  "impact.kicker": "Outcomes",
  "impact.c1.t": "Customer Impact",
  "impact.c1.d": "Worked directly with telecom customers to transform business requirements into production-ready software.",
  "impact.c2.t": "Backend Engineering",
  "impact.c2.d": "Built scalable backend services using Python, FastAPI, Kafka, Redis, and cloud-native technologies.",
  "impact.c3.t": "AI Innovation",
  "impact.c3.d": "Developed AI and ML solutions for intelligent decision-making and network optimization.",
  "impact.c4.t": "Cloud Native Development",
  "impact.c4.d": "Designed containerized systems using Docker, Kubernetes, and modern DevOps practices.",

  "opp.title": "Open To Global Opportunities",
  "opp.kicker": "Availability",
  "opp.current": "Current Role",
  "opp.current.v": "Software Engineer at Nokia",
  "opp.exp": "Experience",
  "opp.exp.v": "4+ Years",
  "opp.roles": "Target Roles",
  "opp.locations": "Preferred Locations",
  "opp.preference": "Work Preference",
  "opp.availability": "Availability",
  "opp.availability.v": "Open to discussing new opportunities.",

  "contact.title": "Let's Build Something",
  "contact.kicker": "Contact",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.subject": "Subject",
  "contact.message": "Message",
  "contact.send": "Send Message",
  "contact.sending": "Sending…",
  "contact.success": "Message sent. I'll get back to you soon.",
  "contact.error.generic":
    "Something went wrong. Please try again or use the email link on the left.",
  "contact.error.not_configured":
    "The contact form is not set up yet. Please use the email link on the left.",
  "contact.error.send_failed":
    "Your message could not be delivered. Please try again later or email me directly.",
  "contact.error.resend_recipient":
    "Email delivery is in Resend test mode: set CONTACT_MAIL_TO in .env to the same address you use for your Resend account, or verify a domain at resend.com/domains and set CONTACT_MAIL_FROM to an address on that domain.",

  "footer.tag": "Designed and Built by Badrinath Chitrala",

  "recruiter.title": "1-Minute Profile",
  "recruiter.summary": "Experience Summary",
  "recruiter.skills": "Key Skills",
  "recruiter.projects": "Top Projects",
  "recruiter.relocation": "Relocation Status",
  "recruiter.resume": "Resume",
  "recruiter.contact": "Contact",
  "recruiter.close": "Close",

  "tour.skip": "Skip Tour",
  "tour.next": "Next",
  "tour.prev": "Previous",
  "tour.done": "Finish",
  "tour.dont": "Don't show again",

  "ai.title": "Ask About Badrinath",
  "ai.placeholder": "Ask a question...",
  "ai.send": "Send",
};

const de: Dict = {
  "nav.home": "Start",
  "nav.about": "Über mich",
  "nav.experience": "Erfahrung",
  "nav.skills": "Fähigkeiten",
  "nav.projects": "Projekte",
  "nav.opportunities": "Chancen",
  "nav.contact": "Kontakt",
  "nav.recruiter": "Recruiter-Modus",
  "nav.tour": "2-Minuten-Tour starten",

  "hero.greeting": "Hallo, ich bin",
  "hero.name": "Badrinath Chitrala",
  "hero.subtitle": "Software Engineer · Backend Engineer · Enthusiast für verteilte Systeme",
  "hero.summary":
    "Ich entwickle skalierbare Backend-Systeme, Cloud-Native-Anwendungen, verteilte Architekturen und intelligente Softwarelösungen für reale Probleme.",
  "hero.cta.projects": "Projekte ansehen",
  "hero.cta.resume": "Lebenslauf",
  "hero.cta.contact": "Kontakt",
  "hero.available": "Offen für neue Möglichkeiten",

  "about.title": "Über mich",
  "about.kicker": "Über",
  "about.body":
    "Software Engineer mit über 4 Jahren Erfahrung im Design und Aufbau skalierbarer Backend-Systeme mit Python, FastAPI, Flask, Kafka, Redis, Docker, Kubernetes und Cloud-Native-Technologien. Begeistert von verteilten Systemen, KI-Anwendungen und Software mit messbarem Geschäftsimpact.",
  "about.stat.years": "Jahre Erfahrung",
  "about.stat.customers": "Enterprise-Lieferungen",
  "about.stat.cloud": "Cloud-Native-Projekte",
  "about.stat.ai": "KI-Projekte",
  "about.stat.backend": "Backend-Systeme",

  "skills.title": "Fähigkeiten & Technologien",
  "skills.kicker": "Werkzeuge",
  "skills.backend": "Backend",
  "skills.databases": "Datenbanken",
  "skills.distributed": "Verteilte Systeme",
  "skills.cloud": "Cloud & DevOps",
  "skills.frontend": "Frontend",
  "skills.ai": "KI & Daten",

  "exp.title": "Erfahrung",
  "exp.kicker": "Karriere",
  "exp.role": "Software Engineer",
  "exp.company": "Nokia",
  "exp.period": "2022 — Heute",
  "exp.h1": "Entwicklung skalierbarer Backend-Services für die Optimierung von Telekommunikationsnetzen.",
  "exp.h2": "Aufbau kundenorientierter Features für globale Telekommunikationsbetreiber.",
  "exp.h3": "Intensive Arbeit mit verteilten Systemen und Cloud-Native-Deployments.",
  "exp.h4": "Mitwirkung an KI-gestützten Initiativen zur Netzoptimierung.",
  "exp.h5": "Direkte Zusammenarbeit mit Kunden zur Umsetzung von Anforderungen in produktionsreife Software.",
  "exp.h6": "Lieferung kundenkritischer Features mit hoher Qualität und schneller Durchlaufzeit.",
  "exp.timeline": "Karriere-Zeitleiste",
  "exp.t2022": "Einstieg bei Nokia",
  "exp.t2023": "Lieferung kundenorientierter Telekom-Software-Features",
  "exp.t2024": "Arbeit an verteilten Systemen und Cloud-Native-Deployments",
  "exp.t2025": "Erweiterung auf KI- und Machine-Learning-Lösungen",
  "exp.t2026": "Aktive Suche nach globalen Software-Engineering-Chancen",

  "projects.title": "Ausgewählte Projekte",
  "projects.kicker": "Arbeit",
  "projects.filter.all": "Alle",
  "projects.github": "GitHub",
  "projects.demo": "Live-Demo",
  "p1.title": "KI-basierte Mobilitätsoptimierung",
  "p1.desc": "Machine-Learning- und KI-Lösungen für Netzoptimierung und Mobilitätsmanagement.",
  "p2.title": "Kollaboratives Zeichenboard",
  "p2.desc": "Skalierbare kollaborative Zeichenplattform mit containerisierter Deployment-Architektur.",
  "p3.title": "Rebus-Rätsel-Webanwendung",
  "p3.desc": "Interaktive Spieleplattform für visuelle Wortpuzzles.",
  "p4.title": "Portfolio-Website",
  "p4.desc": "Mehrsprachiges, recruiterfreundliches Portfolio mit Engineering-Expertise.",

  "impact.title": "Impact-Highlights",
  "impact.kicker": "Ergebnisse",
  "impact.c1.t": "Kunden-Impact",
  "impact.c1.d": "Direkte Zusammenarbeit mit Telekom-Kunden zur Umsetzung von Anforderungen in produktionsreife Software.",
  "impact.c2.t": "Backend-Engineering",
  "impact.c2.d": "Skalierbare Backend-Services mit Python, FastAPI, Kafka, Redis und Cloud-Native-Technologien.",
  "impact.c3.t": "KI-Innovation",
  "impact.c3.d": "KI- und ML-Lösungen für intelligente Entscheidungen und Netzoptimierung.",
  "impact.c4.t": "Cloud-Native-Entwicklung",
  "impact.c4.d": "Containerisierte Systeme mit Docker, Kubernetes und modernen DevOps-Praktiken.",

  "opp.title": "Offen für globale Chancen",
  "opp.kicker": "Verfügbarkeit",
  "opp.current": "Aktuelle Rolle",
  "opp.current.v": "Software Engineer bei Nokia",
  "opp.exp": "Erfahrung",
  "opp.exp.v": "Über 4 Jahre",
  "opp.roles": "Ziel-Rollen",
  "opp.locations": "Bevorzugte Standorte",
  "opp.preference": "Arbeitspräferenz",
  "opp.availability": "Verfügbarkeit",
  "opp.availability.v": "Offen für Gespräche über neue Möglichkeiten.",

  "contact.title": "Lass uns etwas bauen",
  "contact.kicker": "Kontakt",
  "contact.name": "Name",
  "contact.email": "E-Mail",
  "contact.subject": "Betreff",
  "contact.message": "Nachricht",
  "contact.send": "Nachricht senden",
  "contact.sending": "Wird gesendet…",
  "contact.success": "Nachricht gesendet. Ich melde mich bald.",
  "contact.error.generic":
    "Etwas ist schiefgelaufen. Bitte erneut versuchen oder den E-Mail-Link links nutzen.",
  "contact.error.not_configured":
    "Das Kontaktformular ist noch nicht eingerichtet. Bitte den E-Mail-Link links nutzen.",
  "contact.error.send_failed":
    "Die Nachricht konnte nicht zugestellt werden. Bitte später erneut versuchen oder direkt per E-Mail schreiben.",
  "contact.error.resend_recipient":
    "Resend-Testmodus: Trage in .env bei CONTACT_MAIL_TO dieselbe E-Mail ein wie bei deinem Resend-Konto, oder verifiziere eine Domain unter resend.com/domains und setze CONTACT_MAIL_FROM auf eine Adresse dieser Domain.",

  "footer.tag": "Entworfen und gebaut von Badrinath Chitrala",

  "recruiter.title": "1-Minuten-Profil",
  "recruiter.summary": "Erfahrungs-Übersicht",
  "recruiter.skills": "Kernkompetenzen",
  "recruiter.projects": "Top-Projekte",
  "recruiter.relocation": "Umzugsstatus",
  "recruiter.resume": "Lebenslauf",
  "recruiter.contact": "Kontakt",
  "recruiter.close": "Schließen",

  "tour.skip": "Tour überspringen",
  "tour.next": "Weiter",
  "tour.prev": "Zurück",
  "tour.done": "Fertig",
  "tour.dont": "Nicht mehr anzeigen",

  "ai.title": "Frag über Badrinath",
  "ai.placeholder": "Stell eine Frage...",
  "ai.send": "Senden",
};

const dictionaries: Record<Lang, Dict> = { en, de };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en";
    if (stored === "en" || stored === "de") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
