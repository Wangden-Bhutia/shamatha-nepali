import { MeditationModule } from "@/data/modules";
import { ModuleProgress } from "@/hooks/useProgress";
import { useNavigate } from "react-router-dom";
import {
  Wind, Cloud, Mountain, Sparkles, Shield, Sun, Check,
  Anchor, RefreshCw, Target, Eye, Scale,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wind, Cloud, Mountain, Sparkles, Shield, Sun, Anchor, RefreshCw, Target, Eye, Scale,
};

interface ModuleCardProps {
  module: MeditationModule;
  progress: ModuleProgress;
  index: number;
}

export default function ModuleCard({ module, progress }: ModuleCardProps) {
  const navigate = useNavigate();
  const Icon = iconMap[module.icon] || Sun;

  return (
    <button
      onClick={() => navigate(`/module/${module.id}`)}
      className="group w-full text-left rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-gold/40 hover:glow-gold relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500" />

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary flex items-center justify-center border border-border group-hover:border-gold/30 transition-colors">
          <Icon className="w-5 h-5 text-gold" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-body text-muted-foreground tracking-wider uppercase">
              चरण {module.id}
            </span>

            {progress.completed && (
              <span className="flex items-center gap-1 text-xs text-gold">
                <Check className="w-3 h-3" />
                अभ्यास सम्पन्न
              </span>
            )}

          </div>

          <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1">
            {module.title}
          </h3>

          <p className="text-sm text-muted-foreground font-body">
            {module.subtitle}
          </p>

          {progress.sessionsCompleted > 0 && (
            <p className="text-xs text-muted-foreground mt-2 font-body">
              {progress.sessionsCompleted} अभ्यास · {progress.totalMinutesMeditated} मिनेट कुल
            </p>
          )}

        </div>
      </div>
    </button>
  );
}
