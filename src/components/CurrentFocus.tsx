import { modules } from "@/data/modules";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CurrentFocusProps {
  recommendedStage: number | null;
}

const CurrentFocus = ({ recommendedStage }: CurrentFocusProps) => {
  const navigate = useNavigate();

  if (!recommendedStage) return null;

  const stage = modules.find((m) => m.id === recommendedStage);
  if (!stage) return null;

  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <h2 className="font-display text-lg text-gold mb-3">Current Focus</h2>
      <p className="font-display text-base text-foreground">
        Stage {stage.id} – {stage.title}
      </p>
      <p className="font-body text-[13px] text-foreground/70 mt-1 leading-relaxed">
        {stage.subtitle}
      </p>
      <button
        onClick={() => navigate(`/module/${stage.id}`)}
        className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-secondary hover:bg-accent/50 transition-colors px-4 py-2.5 font-body text-sm text-foreground"
      >
        Go to Stage
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default CurrentFocus;
