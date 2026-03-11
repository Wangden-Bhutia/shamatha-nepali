import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "shamatha-progress";
const STREAK_KEY = "shamatha-streak";
const RECOMMENDED_STAGE_KEY = "shamatha-recommended-stage";

export interface ModuleProgress {
  completed: boolean;
  sessionsCompleted: number;
  totalMinutesMeditated: number;
  lastPracticed?: string;
}

export type ProgressMap = Record<number, ModuleProgress>;

interface StreakData {
  currentStreak: number;
  lastSessionDate: string | null;
}

const defaultProgress = (): ModuleProgress => ({
  completed: false,
  sessionsCompleted: 0,
  totalMinutesMeditated: 0,
});

function getDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function loadStreak(): StreakData {
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { currentStreak: 0, lastSessionDate: null };
}

function calculateUpdatedStreak(prev: StreakData): StreakData {
  const today = getDateString(new Date());
  if (prev.lastSessionDate === today) {
    return prev; // already counted today
  }
  const yesterday = getDateString(new Date(Date.now() - 86400000));
  if (prev.lastSessionDate === yesterday) {
    return { currentStreak: prev.currentStreak + 1, lastSessionDate: today };
  }
  // streak broken or first session
  return { currentStreak: 1, lastSessionDate: today };
}

function refreshStreak(prev: StreakData): StreakData {
  if (!prev.lastSessionDate) return prev;
  const today = getDateString(new Date());
  const yesterday = getDateString(new Date(Date.now() - 86400000));
  if (prev.lastSessionDate === today || prev.lastSessionDate === yesterday) {
    return prev;
  }
  return { currentStreak: 0, lastSessionDate: prev.lastSessionDate };
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [streak, setStreak] = useState<StreakData>(() => refreshStreak(loadStreak()));

  const [recommendedStage, setRecommendedStageState] = useState<number | null>(() => {
    try {
      const stored = localStorage.getItem(RECOMMENDED_STAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem(RECOMMENDED_STAGE_KEY, JSON.stringify(recommendedStage));
  }, [recommendedStage]);

  const getModuleProgress = (moduleId: number): ModuleProgress => {
    return progress[moduleId] || defaultProgress();
  };

  const completeSession = (moduleId: number, minutes: number) => {
    setProgress((prev) => {
      const current = prev[moduleId] || defaultProgress();
      const updated: ModuleProgress = {
        ...current,
        sessionsCompleted: current.sessionsCompleted + 1,
        totalMinutesMeditated: current.totalMinutesMeditated + minutes,
        completed: true,
        lastPracticed: new Date().toISOString(),
      };
      return { ...prev, [moduleId]: updated };
    });
    setStreak((prev) => calculateUpdatedStreak(prev));
  };

  const setRecommendedStage = useCallback((stage: number | null) => {
    setRecommendedStageState(stage);
  }, []);

  const totalSessions = Object.values(progress).reduce(
    (sum, p) => sum + p.sessionsCompleted,
    0
  );

  const totalMinutes = Object.values(progress).reduce(
    (sum, p) => sum + p.totalMinutesMeditated,
    0
  );

  return {
    progress,
    getModuleProgress,
    completeSession,
    totalSessions,
    totalMinutes,
    dailyStreak: streak.currentStreak,
    recommendedStage,
    setRecommendedStage,
  };
}
