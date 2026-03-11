import { useState } from "react";
import { modules } from "@/data/modules";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    question: "How often does your attention wander during meditation?",
    options: [
      { label: "Constantly — I can barely stay with one breath", score: 1 },
      { label: "Often — I drift every few breaths", score: 3 },
      { label: "Sometimes — I notice gaps but mostly stay present", score: 5 },
      { label: "Rarely — my attention feels naturally steady", score: 8 },
    ],
  },
  {
    question: "How quickly do you notice when you've been distracted?",
    options: [
      { label: "It takes a while — I get lost in thought chains", score: 1 },
      { label: "Moderate — I notice after a few moments", score: 3 },
      { label: "Fairly quickly — I catch myself almost right away", score: 6 },
      { label: "Almost instantly — distraction barely takes hold", score: 8 },
    ],
  },
  {
    question: "How stable does your attention feel overall?",
    options: [
      { label: "Unsteady — like trying to hold water in my hands", score: 1 },
      { label: "Variable — some moments are stable, many are not", score: 3 },
      { label: "Mostly stable — with occasional subtle wavering", score: 6 },
      { label: "Very stable — attention rests easily on the breath", score: 8 },
    ],
  },
  {
    question: "How much effort does it take to stay with the breath?",
    options: [
      { label: "A lot — I have to keep pulling my mind back", score: 1 },
      { label: "Moderate — it takes steady but manageable effort", score: 3 },
      { label: "Light — only gentle reminders are needed", score: 6 },
      { label: "Almost none — presence feels natural and effortless", score: 9 },
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
        Where Am I on the Path?
      </h2>
      <p className="font-body text-foreground/70 text-[13px] mb-5 leading-relaxed">
        Answer these questions based on your recent meditation experience.
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
            See My Suggested Stage
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-background/50 border border-border p-5 text-center">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
              Suggested starting point
            </p>
            <p className="font-display text-3xl text-gold mb-1">
              Stage {stageNum}
            </p>
            <p className="font-display text-base text-foreground">
              {stage?.title}
            </p>
            <p className="font-body text-[13px] text-foreground/70 mt-1">
              {stage?.subtitle}
            </p>
          </div>

          <p className="font-body text-[13px] text-foreground/60 leading-relaxed text-center italic">
            Remember — the stages are not rigid. Your experience may shift between stages from session to session. Use this as a gentle guide, not a fixed label.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 rounded-lg border border-border font-body text-sm text-foreground/70 hover:bg-accent/50 transition-colors"
            >
              Retake
            </button>
            <button
              onClick={() => navigate(`/module/${stageNum}`)}
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Stage {stageNum}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfAssessment;
