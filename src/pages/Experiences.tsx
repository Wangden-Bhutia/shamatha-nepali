import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Experience {
  title: string;
  icon: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title: "Restlessness",
    icon: "🌊",
    description:
      "The mind may feel agitated, jumping from thought to thought like a waterfall crashing over rocks. This is not a sign of failure — it is often the first time you truly see how busy the mind has always been. The restlessness was always there; now you are simply aware of it.",
  },
  {
    title: "Bliss",
    icon: "✦",
    description:
      "Waves of warmth, pleasure, or deep contentment may wash through the body and mind. This can feel extraordinary, even intoxicating. In the Dzogchen tradition, bliss is recognized as a nyam — a temporary meditation experience. It arises naturally as the body relaxes and the mind settles. Enjoy it, but do not chase it.",
  },
  {
    title: "Clarity",
    icon: "◇",
    description:
      "Perception may become vivid and sharp — colors brighter, sounds crisper, thoughts transparent. The mind feels luminous, almost crystalline. This heightened clarity is another nyam. It shows the mind's natural capacity when freed from its usual dullness. But grasping at clarity creates a subtle tension that can block deeper realization.",
  },
  {
    title: "Boredom",
    icon: "○",
    description:
      "A flat, grey feeling that nothing is happening. The mind craves stimulation and finds sitting still pointless. Boredom is actually a powerful teacher — it reveals the mind's addiction to entertainment. If you can sit with boredom without acting on it, you discover a spaciousness beneath it that is profoundly restful.",
  },
  {
    title: "Visions",
    icon: "◈",
    description:
      "Lights, colors, images, or symbolic scenes may appear — sometimes beautiful, sometimes strange. In some traditions, these are given great significance. In Dzogchen, they are treated like any other thought: natural displays of the mind's creative energy. They are neither to be feared nor pursued. Let them arise and dissolve on their own.",
  },
  {
    title: "Drowsiness",
    icon: "☾",
    description:
      "The body may feel heavy, the mind foggy. You may find yourself nodding off or losing awareness entirely. This is the mind's habitual response when it is not being stimulated — it either thinks or sleeps. Drowsiness will pass as your capacity for alert relaxation develops over time.",
  },
  {
    title: "Emotional Release",
    icon: "💧",
    description:
      "Old emotions — grief, anger, fear, tenderness — may surface without any obvious cause. As the mind quiets, stored tensions in the body begin to unwind. These releases are a natural part of purification. Let the emotions move through you like weather passing through a valley. You are the valley, not the storm.",
  },
];

export default function Experiences() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-semibold text-foreground">
              What Happens in Meditation
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <div className="animate-fade-up text-center space-y-3">
          <p className="font-display text-2xl text-gold italic">
            "These are normal experiences — don't cling to them."
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            As your practice deepens, you will encounter many different states of mind and body. In the Dzogchen tradition, these are called <span className="text-gold italic">nyam</span> — temporary meditation experiences that are signs of progress, not destinations.
          </p>
        </div>

        {/* Experience cards */}
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className="animate-fade-up rounded-lg bg-card border border-border p-5 space-y-3"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl w-8 text-center" aria-hidden="true">
                  {exp.icon}
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {exp.title}
                </h2>
              </div>
              <p className="font-body text-[15px] text-foreground/80 leading-relaxed pl-11">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing wisdom */}
        <div className="animate-fade-up text-center pt-4 pb-8 space-y-4">
          <div className="w-12 h-px bg-gold/40 mx-auto" />
          <p className="font-display text-lg text-muted-foreground italic leading-relaxed max-w-sm mx-auto">
            Whatever arises, let it arise. Whatever stays, let it stay. Whatever goes, let it go. The awareness that witnesses all of this is your true nature.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            — Dzogchen instruction
          </p>
        </div>
      </div>
    </div>
  );
}
