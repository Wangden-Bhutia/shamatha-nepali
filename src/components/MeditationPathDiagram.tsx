const MeditationPathDiagram = () => {
  // Stages from bottom (1) to top (9) — elephant whitens, flame shrinks, monkey fades
  const stages = [
    { elephant: 0.1, flame: 1.0, monkey: 1.0 },
    { elephant: 0.2, flame: 0.9, monkey: 0.9 },
    { elephant: 0.3, flame: 0.8, monkey: 0.8 },
    { elephant: 0.45, flame: 0.7, monkey: 0.65 },
    { elephant: 0.55, flame: 0.6, monkey: 0.5 },
    { elephant: 0.65, flame: 0.5, monkey: 0.35 },
    { elephant: 0.75, flame: 0.35, monkey: 0.2 },
    { elephant: 0.88, flame: 0.2, monkey: 0.1 },
    { elephant: 1.0, flame: 0.05, monkey: 0.0 },
  ];

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Path from top (stage 9) to bottom (stage 1) */}
      {stages
        .slice()
        .reverse()
        .map((stage, i) => {
          const stageNum = 9 - i;
          const elephantLight = Math.round(20 + stage.elephant * 70);
          const elephantColor = `hsl(230, 10%, ${elephantLight}%)`;
          const flameSize = 6 + stage.flame * 14;
          const monkeyOpacity = stage.monkey;

          return (
            <div
              key={stageNum}
              className="flex items-center gap-3 w-full max-w-[280px]"
            >
              {/* Stage number */}
              <span className="font-display text-xs text-muted-foreground w-4 text-right shrink-0">
                {stageNum}
              </span>

              {/* Elephant (mind) */}
              <div className="flex items-center justify-center w-8 h-8 shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {/* Simplified elephant silhouette */}
                  <ellipse cx="12" cy="14" rx="7" ry="6" fill={elephantColor} />
                  <ellipse cx="12" cy="8" rx="5" ry="4.5" fill={elephantColor} />
                  <ellipse cx="7.5" cy="6" rx="2.5" ry="3" fill={elephantColor} />
                  <ellipse cx="16.5" cy="6" rx="2.5" ry="3" fill={elephantColor} />
                  <rect x="8" y="18" width="2.5" height="4" rx="1" fill={elephantColor} />
                  <rect x="13.5" y="18" width="2.5" height="4" rx="1" fill={elephantColor} />
                  <path d="M12 12 Q12 16 11 18" stroke={elephantColor} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Connecting line */}
              <div className="flex-1 h-px bg-border" />

              {/* Monkey (distraction) */}
              <div
                className="flex items-center justify-center w-8 h-8 shrink-0"
                style={{ opacity: monkeyOpacity }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="8" r="5" fill="hsl(var(--muted-foreground))" />
                  <circle cx="10" cy="8" r="3" fill="hsl(var(--muted))" />
                  <circle cx="5" cy="6" r="2.2" fill="hsl(var(--muted-foreground))" />
                  <circle cx="15" cy="6" r="2.2" fill="hsl(var(--muted-foreground))" />
                  <ellipse cx="8.5" cy="7.5" rx="0.7" ry="0.9" fill="hsl(var(--muted))" />
                  <ellipse cx="11.5" cy="7.5" rx="0.7" ry="0.9" fill="hsl(var(--muted))" />
                  <rect x="9" y="13" width="2" height="5" rx="1" fill="hsl(var(--muted-foreground))" />
                  <path d="M6 10 Q3 14 5 17" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Flame (effort) */}
              <div className="flex items-center justify-center w-6 h-8 shrink-0">
                <svg
                  width={flameSize}
                  height={flameSize}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 2 C10 2 4 8 4 13 C4 16.5 6.5 19 10 19 C13.5 19 16 16.5 16 13 C16 8 10 2 10 2Z"
                    fill="hsl(var(--gold))"
                    opacity={0.4 + stage.flame * 0.6}
                  />
                </svg>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MeditationPathDiagram;
