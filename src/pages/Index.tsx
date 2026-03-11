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
    recommendedStage,
  } = useProgress();

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

      {/* Hero */}
      <header className="relative h-72 overflow-hidden">
        <img
          src={heroImage}
          alt="शान्त पर्वतीय दृश्य"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-8 px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground animate-fade-up">
            शमथ
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-2 tracking-wider uppercase animate-fade-up-delay">
            शान्त ध्यानका नौ चरण
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-4 pt-8">

        <CollapsibleCard title="नौ चरणहरू" defaultOpen={totalSessions === 0}>
          <p className="font-body text-foreground/85 leading-relaxed text-[15px]">
            शमथ ध्यानले मनलाई क्रमशः स्थिर र शान्त बनाउने अभ्यास हो। यस अभ्यासमा ध्यान
            नौ चरणहरू मार्फत बिस्तारै परिष्कृत हुन्छ। प्रत्येक चरणले सचेतना र एकाग्रतालाई
            अझ स्पष्ट बनाउँछ। नियमित अभ्याससँगै प्रगति स्वाभाविक रूपमा खुल्दै जान्छ।
          </p>
        </CollapsibleCard>

        <CollapsibleCard title="ध्यानको मार्ग">
          <img
            src={meditationPathImage}
            alt="शमथ ध्यानको पारम्परिक चित्र"
            className="w-full rounded-lg shadow-sm"
          />

          <h4 className="font-medium text-foreground/90 mt-6 mb-3">
            प्रतीकहरूको अर्थ
          </h4>

          <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
            यो पारम्परिक चित्रले शमथ ध्यानमा मनलाई कसरी प्रशिक्षण गरिन्छ भन्ने कुरा देखाउँछ।
          </p>

          <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
            हात्तीले मनलाई जनाउँछ भने बाँदरले विचलन र चञ्चल सोचलाई जनाउँछ।
            सुरुमा बाँदरले हात्तीलाई अगाडि लैजान्छ, जसले ध्यान कसरी सजिलै
            विचारहरूद्वारा तानिन्छ भन्ने देखाउँछ।
          </p>

          <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
            भिक्षुले साधकलाई जनाउँछ। उसले सचेतना (डोरी) र सतर्कता (काँटी) प्रयोग गरेर
            मनलाई मार्गदर्शन गर्छ।
          </p>

          <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
            मार्गमा देखिने ज्वालाहरूले प्रयासलाई जनाउँछ। प्रारम्भिक चरणहरूमा मनलाई
            बारम्बार फिर्ता ल्याउन बलियो प्रयास आवश्यक हुन्छ। ध्यान गहिरो हुँदै जाँदा
            प्रयास कम हुँदै जान्छ।
          </p>

          <p className="font-body text-foreground/80 leading-relaxed text-[15px] mb-5">
            हात्ती बिस्तारै सेतो हुँदै जाँदा मन अझ स्पष्ट, शान्त र स्थिर हुँदै गएको
            संकेत गर्छ। अन्तिम चरणमा मन सहज रूपमा सन्तुलित ध्यानमा विश्राम गर्छ।
          </p>

          <p className="text-muted-foreground italic text-[15px] mt-2">
            तलका चरणहरूमा थिचेर शमथ ध्यानका नौ चरणहरू अन्वेषण गर्नुहोस्।
          </p>
        </CollapsibleCard>

        <CollapsibleCard title="म अहिले कुन चरणमा छु?">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary flex items-center justify-center border border-border">
              <Compass className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-muted-foreground font-body">
              छोटो प्रश्नावलीमार्फत आफ्नो ध्यान अभ्यासको वर्तमान चरण पहिचान गर्नुहोस्।
            </p>
          </div>

          <button
            onClick={() => navigate("/assessment")}
            className="w-full rounded-lg border border-border bg-secondary hover:bg-accent/50 transition-colors p-3 text-center font-display text-sm text-foreground"
          >
            मूल्यांकन सुरु गर्नुहोस्
          </button>
        </CollapsibleCard>

        <CollapsibleCard title="तपाईंको अभ्यास" defaultOpen>
          <PracticeTracker
            totalMinutes={totalMinutes}
            totalSessions={totalSessions}
            dailyStreak={dailyStreak}
          />
        </CollapsibleCard>

        {recommendedStage && (
          <div className="animate-fade-in">
            <CurrentFocus recommendedStage={recommendedStage} />
          </div>
        )}

        <div className="flex justify-center py-4">
          <button
            onClick={scrollToStages}
            className="flex items-center gap-2 text-gold/70 hover:text-gold font-body text-sm transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            चरणहरूमा जानुहोस्
          </button>
        </div>

        <div ref={stagesRef} className="space-y-12 pt-6">
          {levels.map((level) => {
            const levelModules = modules.filter((m) => m.level === level.key);

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

        <div className="space-y-6 pt-8">
          <button
            onClick={() => navigate("/experiences")}
            className="w-full rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors p-4 text-left flex items-center gap-4 shadow-sm"
          >
            <span className="text-2xl text-gold">◈</span>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                ध्यानमा के हुन्छ
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                न्याम अनुभवहरू बुझ्नुहोस् — चञ्चलता, आनन्द, स्पष्टता आदि
              </p>
            </div>
          </button>

          <MeditationQuotes />

          <footer className="px-2 pb-6 text-xs text-muted-foreground leading-relaxed">
            <p className="font-display text-gold text-sm mb-1 uppercase tracking-tighter">
              जानकारी
            </p>
            <p>
              शमथ ध्यानका पारम्परिक नौ चरणहरूमा आधारित एक सरल मार्गदर्शक।
              व्यक्तिगत अभ्यास र अध्ययनका लागि तयार गरिएको।
            </p>
            <p className="text-[11px] text-right mt-4 cormorant opacity-80">
              प्रेमपूर्वक तयार गरिएको — Wangden Bhutia
            </p>
          </footer>
        </div>

      </main>
    </div>
  );
}
