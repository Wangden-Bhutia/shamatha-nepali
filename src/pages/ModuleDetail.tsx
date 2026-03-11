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

const bell = new Audio("/sounds/bell.mp3");
bell.volume = 0.9;

const playBell = () => {
  bell.currentTime = 0;
  bell.play().catch(() => {});
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

        {activeTab === "learn" && (
          <div className="space-y-6">

            {screens && totalScreens > 0 && (
              <>
                <div className="rounded-xl bg-card border border-border p-6">

                  <h2 className="font-display text-xl text-gold mb-4">
                    {screens[learnPage].title}
                  </h2>

                  <p className="font-body text-foreground/90 leading-relaxed text-[15px]">
                    {screens[learnPage].body}
                  </p>

                </div>

                <div className="flex justify-between">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLearnPage((p) => Math.max(0, p - 1))}
                    disabled={learnPage === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    पछाडि
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLearnPage((p) => Math.min(totalScreens - 1, p + 1))
                    }
                    disabled={learnPage === totalScreens - 1}
                  >
                    अगाडि
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>

                </div>
              </>
            )}

          </div>
        )}

        {activeTab === "meditate" && (

          <ol className="space-y-5">

            {module.guidedMeditation.map((step, i) => (
              <li key={i} className="flex gap-4">

                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-xs text-gold">
                  {i + 1}
                </span>

                <p className="font-body text-foreground/85 leading-relaxed text-[15px]">
                  {step}
                </p>

              </li>
            ))}

          </ol>

        )}

        {activeTab === "timer" && (

          <div className="space-y-8">

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
              className="rounded-full bg-gold text-primary-foreground"
            >
              ध्यान जारी राख्नुहोस्
            </Button>

            <Button
              onClick={handleExitConfirm}
              variant="outline"
              className="rounded-full border-border"
            >
              सत्र समाप्त गर्नुहोस्
            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </div>

  );
}
