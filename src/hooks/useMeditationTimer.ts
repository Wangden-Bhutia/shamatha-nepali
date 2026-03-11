import { useState, useEffect, useCallback, useRef } from "react";

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  secondsRemaining: number;
  totalSeconds: number;
  elapsedSeconds: number;
  isComplete: boolean;
}

export const TIMER_MIN_MINUTES = 3;
export const TIMER_MAX_MINUTES = 45;

export function useMeditationTimer(initialMinutes: number) {
  const [duration, setDuration] = useState(initialMinutes);
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    secondsRemaining: initialMinutes * 60,
    totalSeconds: initialMinutes * 60,
    elapsedSeconds: 0,
    isComplete: false,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    const total = duration * 60;
    setState({
      isRunning: true,
      isPaused: false,
      secondsRemaining: total,
      totalSeconds: total,
      elapsedSeconds: 0,
      isComplete: false,
    });
  }, [duration, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setState((s) => ({ ...s, isPaused: true }));
  }, [clearTimer]);

  const resume = useCallback(() => {
    setState((s) => ({ ...s, isPaused: false }));
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    setState({
      isRunning: false,
      isPaused: false,
      secondsRemaining: duration * 60,
      totalSeconds: duration * 60,
      elapsedSeconds: 0,
      isComplete: false,
    });
  }, [duration, clearTimer]);

  useEffect(() => {
    if (state.isRunning && !state.isPaused && state.secondsRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setState((s) => {
          const next = s.secondsRemaining - 1;
          const elapsed = s.totalSeconds - next;
          if (next <= 0) {
            return { ...s, secondsRemaining: 0, elapsedSeconds: s.totalSeconds, isRunning: false, isComplete: true };
          }
          return { ...s, secondsRemaining: next, elapsedSeconds: elapsed };
        });
      }, 1000);
    }
    return clearTimer;
  }, [state.isRunning, state.isPaused, state.secondsRemaining, clearTimer]);

  const progress = state.totalSeconds > 0
    ? ((state.totalSeconds - state.secondsRemaining) / state.totalSeconds) * 100
    : 0;

  return {
    ...state,
    progress,
    duration,
    setDuration: (min: number) => {
      const clamped = Math.max(TIMER_MIN_MINUTES, Math.min(TIMER_MAX_MINUTES, min));
      setDuration(clamped);
      if (!state.isRunning) {
        setState((s) => ({ ...s, secondsRemaining: clamped * 60, totalSeconds: clamped * 60, elapsedSeconds: 0 }));
      }
    },
    start,
    pause,
    resume,
    stop,
  };
}
