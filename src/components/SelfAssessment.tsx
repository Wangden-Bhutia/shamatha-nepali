import { useState } from "react";
import { modules } from "@/data/modules";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    question: "ध्यान गर्दा तपाईंको ध्यान कति पटक भट्किन्छ?",
    options: [
      { label: "लगातार — एक साससम्म पनि ध्यान राख्न गाह्रो हुन्छ", score: 1 },
      { label: "धेरैजसो — केही सासपछि ध्यान भट्किन्छ", score: 3 },
      { label: "कहिलेकाहीँ — केही अन्तराल हुन्छ तर प्रायः उपस्थित हुन्छु", score: 5 },
      { label: "दुर्लभ रूपमा — ध्यान स्वाभाविक रूपमा स्थिर हुन्छ", score: 8 },
    ],
  },
  {
    question: "ध्यान भट्किएको थाहा पाउन तपाईंलाई कति समय लाग्छ?",
    options: [
      { label: "धेरै समय — विचारहरूको श्रृंखलामा हराउँछु", score: 1 },
      { label: "मध्यम — केही क्षणपछि थाहा हुन्छ", score: 3 },
      { label: "छिटो — लगभग तुरुन्तै थाहा हुन्छ", score: 6 },
      { label: "लगभग तुरुन्त — विचलनले खासै प्रभाव पार्दैन", score: 8 },
    ],
  },
  {
    question: "समग्र रूपमा तपाईंको ध्यान कति स्थिर अनुभव हुन्छ?",
    options: [
      { label: "अस्थिर — हातमा पानी समातेजस्तै", score: 1 },
      { label: "परिवर्तनशील — कहिले स्थिर, कहिले होइन", score: 3 },
      { label: "प्रायः स्थिर — कहिलेकाहीँ हल्का डगमगाहट", score: 6 },
      { label: "धेरै स्थिर — सासमा सहज रूपमा विश्राम गर्छ", score: 8 },
    ],
  },
  {
    question: "सासमा ध्यान राख्न कति प्रयास गर्नुपर्छ?",
    options: [
      { label: "धेरै — बारम्बार मन फर्काउनुपर्छ", score: 1 },
      { label: "मध्यम — स्थिर तर सम्भव प्रयास चाहिन्छ", score: 3 },
      { label: "हल्का — केवल हल्का सम्झना पर्याप्त हुन्छ", score: 6 },
      { label: "लगभग छैन — उपस्थिती स्वाभाविक र सहज हुन्छ", score: 9 },
    ],
  },
];

function getSuggestedStage(totalScore: number): number {
  if (totalScore <= 6) return 1;
  if (totalScore <= 10) return 2;
  if (totalScore <= 14) return 3;
  if (totalScore <= 18) return 4;
  if (totalScore <= 22) return 5;
  if (totalScore <= 26) return 6;
  if (totalScore <= 29) return 7;
  if (totalScore <= 32) return 8;
  return 9;
}

interface SelfAssessmentProps {
  onStageRecommended?: (stage: number) => void;
}

const SelfAssessment = ({ onStageRecommended }: SelfAssessmentProps) => {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const allAnswered = answers.every((a) => a !== null);

  const totalScore = answers.reduce<number>(
    (sum, a) => sum + (a ?? 0),
    0
  );

  const stageNum = getSuggestedStage(totalScore);
  const stage = modules.find((m) => m.id === stageNum);

  const handleSelect = (qIndex: number, score: number) => {
    const next = [...answers];
    next[qIndex] = score;
    setAnswers(next);
    setShowResult(false);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h2 className="font-display text-lg text-gold mb-1">
        म अहिले कुन चरणमा छु?
      </h2>

      <p className="font-body text-foreground/70 text-[13px] mb-5 leading-relaxed">
        हालैको ध्यान अनुभवलाई आधार बनाएर यी प्रश्नहरूको उत्तर दिनुहोस्।
      </p>

      {!showResult ? (
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx}>
              <p className="font-body text-[14px] text-foreground/90 mb-2.5 leading-snug">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-1.5">
                {q.options.map((opt) => {
                  const isSelected = answers[qIdx] === opt.score;

                  return (
                    <button
                      key={opt.score}
                      onClick={() => handleSelect(qIdx, opt.score)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border transition-colors font-body text-[13px] leading-snug ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background/50 text-foreground/70 hover:border-primary/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setShowResult(true);
              onStageRecommended?.(getSuggestedStage(totalScore));
            }}
            className={`w-full py-3 rounded-lg font-body text-sm font-medium transition-colors ${
              allAnswered
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            मेरो सुझाइएको चरण हेर्नुहोस्
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-background/50 border border-border p-5 text-center">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
              सुझाव गरिएको प्रारम्भिक चरण
            </p>

            <p className="font-display text-3xl text-gold mb-1">
              चरण {stageNum}
            </p>

            <p className="font-display text-base text-foreground">
              {stage?.title}
            </p>

            <p className="font-body text-[13px] text-foreground/70 mt-1">
              {stage?.subtitle}
            </p>
          </div>

          <p className="font-body text-[13px] text-foreground/60 leading-relaxed text-center italic">
            याद राख्नुहोस् — यी चरणहरू कठोर रूपमा निश्चित छैनन्।
            तपाईंको अनुभव सत्रदेखि सत्रसम्म फरक हुन सक्छ।
            यसलाई केवल एक सौम्य मार्गदर्शनका रूपमा प्रयोग गर्नुहोस्।
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 rounded-lg border border-border font-body text-sm text-foreground/70 hover:bg-accent/50 transition-colors"
            >
              पुनः प्रयास गर्नुहोस्
            </button>

            <button
              onClick={() => navigate(`/module/${stageNum}`)}
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              चरण {stageNum} खोल्नुहोस्
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfAssessment;
