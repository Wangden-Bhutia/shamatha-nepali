import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const encouragements = [
  "Consistency matters more than duration.",
  "Even short sessions strengthen attention.",
  "Return gently again tomorrow.",
  "Each session plants a seed of calm.",
  "The mind that notices wandering is already returning.",
  "Patience is the heart of practice.",
];

interface SessionCompleteProps {
  durationMinutes: number;
  totalSessions: number;
  onReturn: () => void;
}

export default function SessionComplete({ durationMinutes, totalSessions, onReturn }: SessionCompleteProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const showEncouragement = totalSessions > 0 && totalSessions % 3 === 0;
  const encouragement = encouragements[totalSessions % encouragements.length];

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center animate-fade-up">
      <div className="text-center px-8 max-w-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto">
          <span className="text-gold text-2xl">✧</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl text-foreground">Session Complete</h2>
          <p className="font-body text-muted-foreground text-sm">
            You practiced for {durationMinutes} minute{durationMinutes !== 1 ? "s" : ""}.
          </p>
        </div>

        <p className="font-body text-foreground/60 text-xs italic">
          Take a moment before returning to activity.
        </p>

        {showEncouragement && (
          <p className="font-body text-gold/80 text-sm leading-relaxed">
            {encouragement}
          </p>
        )}

        <p className="font-body text-muted-foreground/50 text-[11px] tracking-wider uppercase">
          Session recorded
        </p>

        {showButton && (
          <Button
            onClick={onReturn}
            variant="outline"
            className="rounded-full border-border font-body tracking-wider uppercase text-sm px-8 animate-fade-up"
          >
            Return
          </Button>
        )}
      </div>
    </div>
  );
}
