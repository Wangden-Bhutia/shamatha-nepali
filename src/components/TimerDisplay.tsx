interface TimerDisplayProps {
  secondsRemaining: number;
  progress: number;
  isRunning: boolean;
}

export default function TimerDisplay({ secondsRemaining, progress, isRunning }: TimerDisplayProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-56 h-56 mx-auto">
      {/* Background glow */}
      {isRunning && (
        <div className="absolute inset-0 rounded-full breathing-glow bg-gold/5" />
      )}

      {/* SVG circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Track */}
        <circle
          cx="100" cy="100" r="90"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          opacity={isRunning ? 0.3 : 1}
        />
        {/* Progress ring — slow smooth fill */}
        <circle
          cx="100" cy="100" r="90"
          fill="none"
          stroke="hsl(var(--gold))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-[1500ms] ease-linear"
          opacity={isRunning ? 0.8 : 1}
        />
      </svg>

      {/* Time display */}
      <div className="relative text-center">
        <span className={`font-display text-5xl font-light tabular-nums transition-colors duration-500 ${isRunning ? "text-foreground/70" : "text-foreground"}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        {isRunning && (
          <p className="text-xs text-muted-foreground/50 mt-1 font-body tracking-widest uppercase">
            Meditating
          </p>
        )}
      </div>
    </div>
  );
}
