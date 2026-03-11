import { Play, Pause, Square, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMER_MIN_MINUTES, TIMER_MAX_MINUTES } from "@/hooks/useMeditationTimer";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  duration: number;
  onSetDuration: (min: number) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isRunning,
  isPaused,
  duration,
  onSetDuration,
  onStart,
  onPause,
  onResume,
  onStop,
}: TimerControlsProps) {
  return (
    <div className="space-y-8">

      {/* Duration selector */}
      {!isRunning && !isPaused && (
        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() =>
              onSetDuration(Math.max(TIMER_MIN_MINUTES, duration - 1))
            }
            className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Minus className="w-4 h-4 text-foreground" />
          </button>

          <span className="font-display text-lg text-foreground w-24 text-center">
            {duration} min
          </span>

          <button
            onClick={() =>
              onSetDuration(Math.min(TIMER_MAX_MINUTES, duration + 1))
            }
            className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4 text-foreground" />
          </button>

        </div>
      )}

      {/* Timer controls */}
      <div className="flex items-center justify-center gap-4">

        {!isRunning && !isPaused && (
          <Button
            onClick={onStart}
            className="h-14 px-10 rounded-full bg-gold text-primary-foreground hover:bg-gold-soft font-body tracking-wider uppercase text-sm"
          >
            <Play className="w-4 h-4 mr-2" />
            Begin
          </Button>
        )}

        {isRunning && !isPaused && (
          <Button
            onClick={onPause}
            variant="outline"
            className="h-14 px-8 rounded-full border-gold/30 font-body tracking-wider uppercase text-sm"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}

        {isPaused && (
          <>
            <Button
              onClick={onResume}
              className="h-14 px-8 rounded-full bg-gold text-primary-foreground hover:bg-gold-soft font-body tracking-wider uppercase text-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>

            <Button
              onClick={onStop}
              variant="outline"
              className="h-14 px-8 rounded-full border-border font-body tracking-wider uppercase text-sm"
            >
              <Square className="w-4 h-4 mr-2" />
              End
            </Button>
          </>
        )}

      </div>

    </div>
  );
}
