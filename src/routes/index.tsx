import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Impact, Opportunities } from "@/components/portfolio/Impact";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { RecruiterMode } from "@/components/portfolio/RecruiterMode";
import { GuidedTour } from "@/components/portfolio/GuidedTour";
import { AIAssistant } from "@/components/portfolio/AIAssistant";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Badrinath Chitrala — Software Engineer · Backend · Distributed Systems" },
      { name: "description", content: "Software Engineer with 4+ years building scalable backend systems, distributed architectures, cloud-native apps, and AI solutions. Open to roles in Germany & Europe." },
      { property: "og:title", content: "Badrinath Chitrala — Software Engineer" },
      { property: "og:description", content: "Portfolio of Badrinath Chitrala — Backend Engineer, Distributed Systems, Cloud Native, AI." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Badrinath Chitrala",
          jobTitle: "Software Engineer",
          worksFor: { "@type": "Organization", name: "Nokia" },
          knowsAbout: ["Backend Engineering", "Distributed Systems", "Cloud Native", "Python", "Kubernetes", "AI"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [recruiter, setRecruiter] = useState(false);
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen text-foreground">
          <Navbar onRecruiter={() => setRecruiter(true)} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Impact />
            <Opportunities />
            <Contact />
          </main>
          <Footer />
          <RecruiterMode open={recruiter} onClose={() => setRecruiter(false)} />
          <GuidedTour />
          <AIAssistant />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
