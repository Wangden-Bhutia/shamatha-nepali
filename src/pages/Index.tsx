import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ChevronDown, ArrowDown } from "lucide-react";

// Data & Hooks
import { modules, levels, Level } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";

// Components
import ModuleCard from "@/components/ModuleCard";
import PracticeTracker from "@/components/PracticeTracker";
import CurrentFocus from "@/components/CurrentFocus";
import MeditationQuotes from "@/components/MeditationQuotes";

// Assets
import heroImage from "@/assets/hero-meditation.jpg";
import meditationPathImage from "@/assets/meditation-path.jpeg";

/**
 * Reusable Collapsible Wrapper
 * Uses CSS Grid for smooth height transitions (0fr -> 1fr)
 */
const CollapsibleCard = ({
  title,
  children,
  defaultOpen = false,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  // Sync state if defaultOpen changes (e.g., after data loads)
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className={`rounded-xl bg-card border border-border overflow-hidden ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-accent/5"
      >
        <h2 className="font-display text-lg text-gold">{title}</h2>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Stage Section Wrapper
 * Specifically for the Nine Stages grouping
 */
const CollapsibleStageSection = ({
  label,
  description,
  children,
  isOpen,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <section className="animate-fade-in">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 text-left group"
      >
        <div className="pr-4">
          <h2 className="font-display text-lg text-gold tracking-wider uppercase group-hover:text-gold/80 transition-colors">
            {label}
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {description}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 pt-2">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default function Index() {
  const navigate = useNavigate();
  const stagesRef = useRef<HTMLDivElement>(null);
  
  const { 
    getModuleProgress, 
    totalSessions, 
    totalMinutes, 
    dailyStreak, 
    recommendedStage 
  } = useProgress();

  // Helper to find the level category for the user's recommended stage
  const recommendedLevelKey = useMemo(() => {
    if (!recommendedStage) return null;
    const mod = modules.find((m) => m.id === recommendedStage);
    return mod ? mod.level : null;
  }, [recommendedStage]);

  const scrollToStages = () => {
    stagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <header className="relative h-72 overflow-hidden">
        <img
          src={heroImage}
          alt="Serene mountain landscape"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-8 px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground animate-fade-up">
            Shamatha
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-2 tracking-wider uppercase animate-fade-up-delay">
            The Nine Stages of Calm Abiding
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-4 pt-8">
        {/* Introduction */}
        <CollapsibleCard 
          title="The Nine Stages" 
          defaultOpen={totalSessions === 0}
        >
          <p className="font-body text-foreground/85 leading-relaxed text-[15px]">
            Shamatha cultivates calm abiding through nine progressive stages. Each stage refines attention and awareness. Progress unfolds naturally with consistent effort; the stages are guideposts, not rigid milestones.
          </p>
        </CollapsibleCard>

        {/* The Meditation Path Visual */}
        <CollapsibleCard title="The Meditation Path">
          <img
            src={meditationPathImage}
            alt="Traditional Shamatha Thangka"
            className="w-full rounded-lg shadow-sm"
          />
<h4 className="font-medium text-foreground/90 mt-6 mb-3">
    Understanding the Symbolism
  </h4>

  <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
    This traditional illustration represents the training of the mind in Shamatha meditation.
  </p>

  <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
    The elephant symbolizes the mind, while the monkey represents distraction and restless thinking. 
    At the beginning the monkey leads the elephant, showing how attention is easily carried away by thoughts.
  </p>

  <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
    The monk represents the practitioner, who guides the mind using mindfulness (the rope) 
    and alertness (the hook).
  </p>

  <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
    The flames along the path symbolize effort. In the early stages strong effort is needed 
    to bring the mind back again and again. As concentration develops, less effort is required.
  </p>

  <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
    As the elephant gradually becomes white, it represents the mind becoming clearer, calmer, 
    and more stable. By the final stage the mind rests effortlessly in balanced attention.
  </p>

  <p className="text-muted-foreground italic text-[15px] mt-2">
    Tap the stages below to explore the nine stages of Shamatha training.
  </p>

        </CollapsibleCard>

        {/* Self Assessment */}
        <CollapsibleCard title="Where Am I on the Path?">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary flex items-center justify-center border border-border">
              <Compass className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Identify your current stage of practice with a brief questionnaire.
            </p>
          </div>
          <button
            onClick={() => navigate("/assessment")}
            className="w-full rounded-lg border border-border bg-secondary hover:bg-accent/50 transition-colors p-3 text-center font-display text-sm text-foreground"
          >
            Take the Assessment
          </button>
        </CollapsibleCard>

        {/* Your Practice Stats */}
        <CollapsibleCard title="Your Practice" defaultOpen>
          <PracticeTracker
            totalMinutes={totalMinutes}
            totalSessions={totalSessions}
            dailyStreak={dailyStreak}
          />
        </CollapsibleCard>

        {/* Current Focus (Conditional) */}
        {recommendedStage && (
          <div className="animate-fade-in">
            <CurrentFocus recommendedStage={recommendedStage} />
          </div>
        )}

        {/* Navigation Helper */}
        <div className="flex justify-center py-4">
          <button
            onClick={scrollToStages}
            className="flex items-center gap-2 text-gold/70 hover:text-gold font-body text-sm transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            Jump to stages
          </button>
        </div>

        {/* Stages List */}
        <div ref={stagesRef} className="space-y-12 pt-6">
          {levels.map((level) => {
            const levelModules = modules.filter((m) => m.level === level.key);
            // Default to beginner if no recommendation, otherwise open the recommended level
            const shouldBeOpen = recommendedLevelKey 
              ? level.key === recommendedLevelKey 
              : level.key === "beginner";

            return (
              <CollapsibleStageSection
                key={level.key}
                label={level.label}
                description={level.description}
                isOpen={shouldBeOpen}
              >
                {levelModules.map((module, i) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    progress={getModuleProgress(module.id)}
                    index={i}
                  />
                ))}
              </CollapsibleStageSection>
            );
          })}
        </div>

        {/* Secondary Links */}
        <div className="space-y-6 pt-8">
          <button
            onClick={() => navigate("/experiences")}
            className="w-full rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors p-4 text-left flex items-center gap-4 shadow-sm"
          >
            <span className="text-2xl text-gold">◈</span>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                What Happens in Meditation
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Understanding nyam — restlessness, bliss, clarity & more
              </p>
            </div>
          </button>

          <MeditationQuotes />

          {/* Footer Info */}
          <footer className="px-2 pb-6 text-xs text-muted-foreground leading-relaxed">
            <p className="font-display text-gold text-sm mb-1 uppercase tracking-tighter">About</p>
            <p>
              A quiet guide to Shamatha meditation based on the traditional nine stages of
              attention. Created as a simple tool for personal practice and study.
            </p>
            <p className="text-[11px] text-right mt-4 cormorant opacity-80">
              Created with care by Wangden Bhutia
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
