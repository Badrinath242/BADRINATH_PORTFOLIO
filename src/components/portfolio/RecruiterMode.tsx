import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { skills, projects, locations, workPrefs } from "@/lib/portfolio-data";
import { profile } from "@/lib/profile-config";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RecruiterMode({ open, onClose }: Props) {
  const { t } = useI18n();
  const allSkills = [...skills.backend, ...skills.distributed, ...skills.cloud, ...skills.ai].slice(0, 12);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md grid place-items-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-3xl max-w-3xl w-full p-8 my-8 shadow-elegant relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 size-9 grid place-items-center rounded-full hover:bg-accent" aria-label={t("recruiter.close")}>
              <X className="size-4" />
            </button>

            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-2">{t("nav.recruiter")}</div>
            <h2 className="text-3xl font-bold mb-1">Badrinath Chitrala</h2>
            <p className="text-muted-foreground mb-6">{t("exp.role")} · {t("exp.company")} · {t("opp.exp.v")}</p>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-primary">{t("recruiter.summary")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.body")}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-primary">{t("recruiter.skills")}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allSkills.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-md bg-secondary text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-primary">{t("recruiter.projects")}</h3>
                <ul className="text-sm space-y-1.5 text-muted-foreground">
                  {projects.slice(0, 3).map((p) => (
                    <li key={p.id}>• <span className="text-foreground font-medium">{t(`${p.id}.title`)}</span> — {t(`${p.id}.desc`)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-primary">{t("recruiter.relocation")}</h3>
                <p className="text-sm text-muted-foreground">{[...locations, ...workPrefs].join(" · ")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild className="gradient-bg text-primary-foreground">
                <a href={profile.resumeUrl} download={profile.resumeDownloadFileName}>
                  <Download className="size-4" /> {t("recruiter.resume")}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact" onClick={onClose}><Mail className="size-4" /> {t("recruiter.contact")}</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
