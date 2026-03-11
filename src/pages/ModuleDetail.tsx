 import { useParams, useNavigate } from "react-router-dom";
import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { useMeditationTimer } from "@/hooks/useMeditationTimer";
import TimerDisplay from "@/components/TimerDisplay";
import TimerControls from "@/components/TimerControls";
import SessionComplete from "@/components/SessionComplete";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Tab = "learn" | "meditate" | "timer";

/* Bell audio (reusable) */
const bellAudio = new Audio("/sounds/bell.mp3");
bellAudio.volume = 0.9;

const playBell = () => {
  bellAudio.currentTime = 0;
  bellAudio.play().catch(() => {});
};

export default function ModuleDetail() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = modules.find((m) => m.id === Number(id));

  const { getModuleProgress, completeSession, totalSessions } = useProgress();

  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [learnPage, setLearnPage] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const timer = useMeditationTimer(module?.defaultDuration ?? 10);

  const completedRef = useRef(false);

  const isSessionActive = timer.isRunning || timer.isPaused;

  /* Handle completion */
  useEffect(() => {

    if (timer.isComplete && !completedRef.current && module) {

      completedRef.current = true;

      completeSession(module.id, timer.duration);

      playBell();

      timer.stop();

      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      setShowCompletion(true);

    }

    if (!timer.isComplete) {
      completedRef.current = false;
    }

  }, [timer.isComplete, module, timer.duration, completeSession]);

  /* Prevent leaving during meditation */
  useEffect(() => {

    if (!isSessionActive) return;

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      setShowExitDialog(true);
    };

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);

  }, [isSessionActive]);

  /* Start meditation */
  const handleStart = async () => {

    playBell();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    timer.start();

  };

  const handlePause = () => timer.pause();
  const handleResume = () => timer.resume();
  const handleStop = () => timer.stop();

  const handleExitConfirm = () => {

    setShowExitDialog(false);

    handleStop();

    navigate("/");

  };

  const handleBack = useCallback(() => {

    if (isSessionActive) {
      setShowExitDialog(true);
    } else {
      navigate("/");
    }

  }, [isSessionActive, navigate]);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">मोड्युल फेला परेन।</p>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <SessionComplete
        durationMinutes={timer.duration}
        totalSessions={totalSessions}
        onReturn={() => setShowCompletion(false)}
      />
    );
  }

  const progress = getModuleProgress(module.id);
  const screens = module.learnScreens;
  const totalScreens = screens ? screens.length : 0;

  const tabs: { key: Tab; label: string }[] = [
    { key: "learn", label: "सिक्नुहोस्" },
    { key: "meditate", label: "ध्यान गर्नुहोस्" },
    { key: "timer", label: "समयमापक" },
  ];

  const inMeditationMode = isSessionActive && activeTab === "timer";

  return (

    <div className={`min-h-screen bg-background ${inMeditationMode ? "flex flex-col" : ""}`}>

      {!inMeditationMode && (

        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">

          <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-3">

            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>

            <div className="flex-1 min-w-0">

              <p className="text-xs text-muted-foreground font-body tracking-wider uppercase">
                चरण {module.id}
              </p>

              <h1 className="font-display text-lg font-semibold text-foreground truncate">
                {module.title}
              </h1>

            </div>

          </div>

          <div className="max-w-lg mx-auto flex border-b border-border">

            {tabs.map((tab) => (

              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-body tracking-wider uppercase transition-colors relative ${
                  activeTab === tab.key
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >

                {tab.label}

                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gold rounded-full" />
                )}

              </button>

            ))}

          </div>

        </div>

      )}

      <div className={`max-w-lg mx-auto px-4 ${inMeditationMode ? "flex-1 flex flex-col items-center justify-center" : "py-8"}`}>

        {activeTab === "timer" && (

          <div className={`animate-fade-up ${inMeditationMode ? "space-y-12" : "space-y-8"}`}>

            <TimerDisplay
              secondsRemaining={timer.secondsRemaining}
              progress={timer.progress}
              isRunning={timer.isRunning}
            />

            <TimerControls
              isRunning={timer.isRunning}
              isPaused={timer.isPaused}
              duration={timer.duration}
              onSetDuration={timer.setDuration}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
            />

            {!timer.isRunning && !timer.isPaused && (
              <p className="text-center text-xs text-muted-foreground font-body">
                चरण {module.id} को लागि सुझाव गरिएको समय: {module.defaultDuration} मिनेट
              </p>
            )}

          </div>

        )}

      </div>

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>

        <DialogContent className="max-w-xs rounded-xl">

          <DialogHeader>

            <DialogTitle className="font-display text-lg text-center">
              ध्यान सत्र समाप्त गर्ने?
            </DialogTitle>

            <DialogDescription className="text-center text-sm text-muted-foreground">
              हालको सत्र सुरक्षित हुने छैन।
            </DialogDescription>

          </DialogHeader>

          <div className="flex flex-col gap-2 pt-2">

            <Button
              onClick={() => setShowExitDialog(false)}
              className="rounded-full bg-gold text-primary-foreground hover:bg-gold-soft font-body tracking-wider uppercase text-sm"
            >
              ध्यान जारी राख्नुहोस्
            </Button>

            <Button
              onClick={handleExitConfirm}
              variant="outline"
              className="rounded-full border-border font-body tracking-wider uppercase text-sm"
            >
              सत्र समाप्त गर्नुहोस्
            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </div>

  );
}
