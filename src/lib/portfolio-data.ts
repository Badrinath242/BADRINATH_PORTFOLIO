export const skills = {
  backend: ["Python", "FastAPI", "Flask", "Django", "REST APIs"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  distributed: ["Kafka", "RabbitMQ", "Microservices", "Event-Driven Architecture"],
  cloud: ["Docker", "Kubernetes", "Helm", "CI/CD"],
  frontend: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
  ai: ["Machine Learning", "Deep Learning", "LLM Applications", "RAG Systems"],
};

export const projects = [
  {
    id: "p1",
    tech: ["Python", "Machine Learning", "Deep Learning"],
    github: "https://github.com/Badrinath242",
    demo: "#",
  },
  {
    id: "p2",
    tech: ["Django", "Docker", "Kubernetes"],
    github: "https://github.com/Badrinath242/Collaborative-Drawing-Board",
    demo: "#",
  },
  {
    id: "p3",
    tech: ["React", "FastAPI"],
    github: "https://github.com/Badrinath242/Rebus-Puzzle-Web-Application",
    demo: "#",
  },
  {
    id: "p4",
    tech: ["React", "TypeScript"],
    github: "https://github.com/Badrinath242/BADRINATH_PORTFOLIO",
    demo: "#",
  },
];

export const timeline = [
  { year: "2022", key: "exp.t2022" },
  { year: "2023", key: "exp.t2023" },
  { year: "2024", key: "exp.t2024" },
  { year: "2025", key: "exp.t2025" },
  { year: "2026", key: "exp.t2026" },
];

export const targetRoles = [
  "Backend Engineer",
  "Software Engineer",
  "Platform Engineer",
  "Distributed Systems Engineer",
  "AI Engineer",
  "Forward Deployed Engineer",
];

export const locations = ["Germany", "Netherlands", "Switzerland", "Europe", "Remote"];
export const workPrefs = ["Hybrid", "Remote", "Relocation"];

export const socials = {
  github: "https://github.com/Badrinath242",
  linkedin: "https://www.linkedin.com/in/badrinath-chitrala-3567501a9/",
  email: "mailto:chbadrinath123@gmail.com",
};

export const aiKnowledge: { q: string[]; a: string }[] = [
  {
    q: ["technolog", "specialize", "stack", "tech"],
    a: "Badrinath specializes in Python, FastAPI, Flask, Django, Kafka, Redis, PostgreSQL, Docker, Kubernetes, and cloud-native architectures. He also works with Machine Learning, Deep Learning, LLMs, and RAG systems.",
  },
  {
    q: ["nokia", "experience", "work"],
    a: "He's a Software Engineer at Nokia (since 2022, 4+ years), building scalable backend services for telecom network optimization, distributed systems, cloud-native deployments, and AI-driven initiatives — collaborating directly with global telecom customers.",
  },
  {
    q: ["project", "built", "portfolio"],
    a: "Highlights: AI-Based Mobility Optimization (Python/ML/DL), Collaborative Drawing Board (Django/Docker/Kubernetes), Rebus Puzzle Web App (React/FastAPI), and this Portfolio Website (React/TypeScript).",
  },
  {
    q: ["relocat", "location", "germany", "europe", "remote", "move"],
    a: "Yes — he's open to relocation. Preferred locations: Germany, Netherlands, Switzerland, Europe, and remote opportunities. Work preferences: Hybrid, Remote, or Relocation.",
  },
  {
    q: ["backend"],
    a: "Backend stack: Python, FastAPI, Flask, Django, REST APIs, plus PostgreSQL, MySQL, MongoDB, Redis. For distributed systems he uses Kafka, RabbitMQ, microservices, and event-driven architectures.",
  },
  {
    q: ["role", "target", "looking", "position"],
    a: "Target roles: Backend Engineer, Software Engineer, Platform Engineer, Distributed Systems Engineer, AI Engineer, and Forward Deployed Engineer.",
  },
  {
    q: ["ai", "ml", "machine"],
    a: "He has built ML/DL solutions for telecom mobility optimization and works with LLM applications and RAG systems.",
  },
  {
    q: ["contact", "reach", "email"],
    a: "You can reach him via the Contact section below — email, LinkedIn, or GitHub links are all there.",
  },
];

export function answerAI(question: string): string {
  const q = question.toLowerCase();
  for (const item of aiKnowledge) {
    if (item.q.some((k) => q.includes(k))) return item.a;
  }
  return "I can answer questions about Badrinath's experience, skills, projects, target roles, relocation preferences, and how to contact him. Try one of the suggested questions!";
}
