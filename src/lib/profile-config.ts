import profileImage from "@/assets/profile-image.jpg";

/**
 * Replace `src/assets/profile-image.jpg` with your own photo (same filename)
 * to update the hero profile image — no code changes required.
 *
 * Resume / CV: add a PDF at `public/resume.pdf` in this repo (create the
 * `public` folder if needed). Vite serves `public/` from the site root, so
 * that file is available at `/resume.pdf` — the same path as `resumeUrl`.
 */
export const profile = {
  image: profileImage,
  imageAlt: "Badrinath Chitrala — Software Engineer at Nokia",
  initials: "BC",
  name: "Badrinath Chitrala",
  role: "Software Engineer",
  company: "Nokia",
  experience: "4+ Years Experience",
  location: "India",
  relocation: "Open to Germany, Netherlands, Switzerland, Europe & Remote",
  specialization:
    "Backend • Distributed Systems • Cloud-Native • AI Solutions",
  badges: [
    "Python",
    "FastAPI",
    "Flask",
    "Kafka",
    "Redis",
    "Docker",
    "Kubernetes",
    "ML",
    "AI",
    "React",
  ],
  highlights: [
    "Open to Relocation",
    "Backend Engineering",
    "Distributed Systems",
    "Cloud Native",
    "AI & Machine Learning",
    "Customer-Facing Engineering",
    "Enterprise Software Development",
  ],

  resumeUrl: "/resume.pdf",
  /** Suggested filename when the browser saves the PDF (same-origin only). */
  resumeDownloadFileName: "Badrinath-Chitrala-Resume.pdf",
};
