import { useRef, useCallback, useEffect } from "react";
import type { Level } from "@/data/modules";

// ─── Narration content ─────────────────────────────────────

const introTexts: Record<Level, string[]> = {
  beginner: [
    "Sit comfortably. [pp] Allow the body to relax. [pp] Let the spine be upright but not rigid. [pp] Bring your attention to the natural rhythm of the breath. [pp] There is nothing to change. [pp] Simply notice the breath. [pp] If the mind wanders, [p] gently return to the breath.",
  ],
  intermediate: [
    "Allow the body to settle. [pp] Bring attention to the breath. [pp] Let the mind rest with the breathing. [pp] There is no need to follow thoughts. [pp] Simply remain present with each breath.",
  ],
  advanced: [
    "Sit quietly. [pp] Allow the mind to settle. [pp] Let awareness rest naturally with the breath. [pp] There is nothing to force. [pp] Simply remain present and relaxed.",
  ],
};

const closingTexts: Record<Level, string[]> = {
  beginner: [
    "Let the attention widen slightly. [pp] Notice the body sitting here. [pp] Take a slightly deeper breath. [pp] When ready, [p] gently open the eyes.",
  ],
  intermediate: [
    "Allow the attention to broaden. [pp] Notice the body and the space around you. [pp] Take a deeper breath [p] and gently return.",
  ],
  advanced: [
    "Allow awareness to expand naturally. [pp] Notice the body and the room around you. [pp] Gently return when you are ready.",
  ],
};

const reminderTexts = [
  "Notice the breath again.",
  "If the mind has wandered, [p] gently return to the breath.",
  "Allow the attention to settle softly on the breath.",
  "Simply observe the breath [p] as it is.",
  "Let the mind rest with the breath.",
  "There is nothing to control. [p] Just notice the breathing.",
];

// ─── Prompt schedule by level ──────────────────────────────

function getPromptSchedule(level: Level): { type: "intro" | "reminder" | "closing"; at: number }[] {
  switch (level) {
    case "beginner":
      return [
        { type: "intro", at: 0 },
        { type: "reminder", at: 0.6 },
        { type: "closing", at: 0.95 },
      ];
    case "intermediate":
      return [
        { type: "intro", at: 0 },
        { type: "reminder", at: 0.4 },
        { type: "reminder", at: 0.7 },
        { type: "closing", at: 0.95 },
      ];
    case "advanced":
      return [
        { type: "intro", at: 0 },
        { type: "reminder", at: 0.3 },
        { type: "reminder", at: 0.6 },
        { type: "reminder", at: 0.85 },
        { type: "closing", at: 0.95 },
      ];
  }
}

// ─── Bell synthesis ────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Plays a bell and returns oscillator nodes so they can be stopped externally. */
function playBell(volume = 0.35, count = 1): OscillatorNode[] {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const nodes: OscillatorNode[] = [];

  for (let i = 0; i < count; i++) {
    const offset = i * 1.8;
    const fundamentalFreq = 220;
    const harmonics = [1, 2.71, 4.16, 5.43];
    const gains = [1, 0.6, 0.35, 0.15];

    harmonics.forEach((ratio, hi) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = fundamentalFreq * ratio;
      osc.type = "sine";
      gain.gain.setValueAtTime(volume * gains[hi], now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 4.5);
      nodes.push(osc);
    });
  }
  return nodes;
}

// ─── ElevenLabs TTS with caching ───────────────────────────

const audioCache = new Map<string, string>();

async function fetchTTS(text: string): Promise<string> {
  const cached = audioCache.get(text);
  if (cached) return cached;

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    throw new Error(`TTS request failed: ${response.status}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(text, url);
  return url;
}

// ─── Scheduler ─────────────────────────────────────────────

interface ScheduledPrompt {
  type: "intro" | "reminder" | "closing";
  atSecond: number;
  text: string;
  fired: boolean;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSchedule(level: Level, totalSeconds: number): ScheduledPrompt[] {
  const schedule = getPromptSchedule(level);
  const usedReminders = new Set<number>();

  return schedule.map((entry) => {
    let text: string;
    if (entry.type === "intro") {
      text = pickRandom(introTexts[level]);
    } else if (entry.type === "closing") {
      text = pickRandom(closingTexts[level]);
    } else {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * reminderTexts.length);
      } while (usedReminders.has(idx) && usedReminders.size < reminderTexts.length);
      usedReminders.add(idx);
      text = reminderTexts[idx];
    }

    // Intro fires after the settling period + bell (~8s from timer start)
    const atSecond = entry.type === "intro"
      ? 8
      : Math.round(entry.at * totalSeconds);

    return { type: entry.type, atSecond, text, fired: false };
  });
}

async function preloadAudio(prompts: ScheduledPrompt[]): Promise<void> {
  const unique = [...new Set(prompts.map((p) => p.text))];
  await Promise.allSettled(unique.map((text) => fetchTTS(text)));
}

// ─── Hook ──────────────────────────────────────────────────

const SETTLING_SECONDS = 4; // silent settling before bell

export function useGuidedAudio(level: Level) {
  const scheduleRef = useRef<ScheduledPrompt[]>([]);
  const activeRef = useRef(false);
  const enabledRef = useRef(true);
  const pausedRef = useRef(false);

  // Track all active Audio elements so we can pause/resume/stop them
  const activeAudiosRef = useRef<Set<HTMLAudioElement>>(new Set());
  // Track active oscillator nodes (bells) so we can stop them
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);
  // Track the settling timeout
  const settlingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the opening bell has played
  const bellPlayedRef = useRef(false);

  const stopAllAudio = useCallback(() => {
    // Stop all TTS audio elements
    for (const audio of activeAudiosRef.current) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    }
    activeAudiosRef.current.clear();

    // Stop all bell oscillators
    for (const osc of activeOscillatorsRef.current) {
      try { osc.stop(); } catch { /* already stopped */ }
    }
    activeOscillatorsRef.current = [];

    // Clear settling timer
    if (settlingTimerRef.current) {
      clearTimeout(settlingTimerRef.current);
      settlingTimerRef.current = null;
    }
  }, []);

  const pauseAllAudio = useCallback(() => {
    pausedRef.current = true;
    for (const audio of activeAudiosRef.current) {
      if (!audio.paused) audio.pause();
    }
  }, []);

  const resumeAllAudio = useCallback(() => {
    pausedRef.current = false;
    for (const audio of activeAudiosRef.current) {
      if (audio.paused && audio.currentTime > 0 && audio.src) {
        audio.play().catch(() => {});
      }
    }
  }, []);

  /** Play TTS and track the Audio element for pause/stop control */
  const playTTSAudio = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!activeRef.current) { resolve(); return; }

      const audio = new Audio(url);
      audio.volume = 0.9;
      activeAudiosRef.current.add(audio);

      const cleanup = () => {
        activeAudiosRef.current.delete(audio);
        resolve();
      };
      audio.onended = cleanup;
      audio.onerror = cleanup;

      // Don't start if paused
      if (pausedRef.current) {
        // It will be resumed by resumeAllAudio
        resolve();
        return;
      }

      audio.play().catch(cleanup);
    });
  }, []);

  const initSession = useCallback(async (totalSeconds: number, voiceEnabled: boolean) => {
    activeRef.current = true;
    pausedRef.current = false;
    bellPlayedRef.current = false;
    enabledRef.current = voiceEnabled;

    if (voiceEnabled) {
      const schedule = buildSchedule(level, totalSeconds);
      scheduleRef.current = schedule;
      // Pre-fetch all TTS audio in background
      preloadAudio(schedule).catch(console.warn);
    } else {
      scheduleRef.current = [];
    }

    // Start the settling period, then play bell
    settlingTimerRef.current = setTimeout(() => {
      if (!activeRef.current || pausedRef.current) return;
      bellPlayedRef.current = true;
      const nodes = playBell(0.3, 1);
      activeOscillatorsRef.current.push(...nodes);
    }, SETTLING_SECONDS * 1000);
  }, [level]);

  const stopSession = useCallback(() => {
    activeRef.current = false;
    pausedRef.current = false;
    bellPlayedRef.current = false;
    scheduleRef.current = [];
    stopAllAudio();
  }, [stopAllAudio]);

  const setEnabled = useCallback((val: boolean) => {
    enabledRef.current = val;
  }, []);

  /**
   * Called every second with elapsed seconds.
   * Only fires prompts when active, enabled, and not paused.
   */
  const tick = useCallback((elapsedSeconds: number, totalSeconds: number) => {
    if (!activeRef.current || pausedRef.current) return;

    // Pre-closing bell (always plays)
    const closingPrompt = scheduleRef.current.find((p) => p.type === "closing");
    const preClosingAt = closingPrompt
      ? closingPrompt.atSecond - 2
      : totalSeconds - 5;
    if (elapsedSeconds === preClosingAt) {
      const nodes = playBell(0.25, 1);
      activeOscillatorsRef.current.push(...nodes);
    }

    // End bells (always plays)
    if (elapsedSeconds === totalSeconds) {
      const nodes = playBell(0.35, 2);
      activeOscillatorsRef.current.push(...nodes);
    }

    // Voice prompts (only in guided mode)
    if (!enabledRef.current) return;
    for (const prompt of scheduleRef.current) {
      if (!prompt.fired && elapsedSeconds >= prompt.atSecond) {
        prompt.fired = true;
        fetchTTS(prompt.text)
          .then((url) => playTTSAudio(url))
          .catch(console.warn);
      }
    }
  }, [playTTSAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      activeRef.current = false;
      stopAllAudio();
    };
  }, [stopAllAudio]);

  return {
    initSession,
    stopSession,
    pauseAudio: pauseAllAudio,
    resumeAudio: resumeAllAudio,
    tick,
    setEnabled,
    enabledRef,
  };
}
