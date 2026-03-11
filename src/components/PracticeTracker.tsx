import { Clock, Hash, Flame } from "lucide-react";

interface PracticeTrackerProps {
  totalMinutes: number;
  totalSessions: number;
  dailyStreak: number;
}

const PracticeTracker = ({ totalMinutes, totalSessions, dailyStreak }: PracticeTrackerProps) => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="text-center space-y-1.5">
        <div className="mx-auto w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Clock className="w-4 h-4 text-gold-soft" />
        </div>
        <p className="font-display text-xl text-foreground">{timeDisplay}</p>
        <p className="text-[11px] text-muted-foreground font-body tracking-wider uppercase leading-tight">
          Total Time
        </p>
      </div>
      <div className="text-center space-y-1.5">
        <div className="mx-auto w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Hash className="w-4 h-4 text-gold-soft" />
        </div>
        <p className="font-display text-xl text-foreground">{totalSessions}</p>
        <p className="text-[11px] text-muted-foreground font-body tracking-wider uppercase leading-tight">
          Sessions
        </p>
      </div>
      <div className="text-center space-y-1.5">
        <div className="mx-auto w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Flame className="w-4 h-4 text-gold-soft" />
        </div>
        <p className="font-display text-xl text-foreground">
          {dailyStreak} {dailyStreak === 1 ? "day" : "days"}
        </p>
        <p className="text-[11px] text-muted-foreground font-body tracking-wider uppercase leading-tight">
          Daily Streak
        </p>
      </div>
    </div>
  );
};

export default PracticeTracker;
