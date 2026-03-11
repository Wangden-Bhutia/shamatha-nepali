import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const encouragements = [
  "नियमित अभ्यास समयभन्दा बढी महत्त्वपूर्ण हुन्छ।",
  "सानो सत्रले पनि ध्यानलाई बलियो बनाउँछ।",
  "भोलि फेरि शान्त रूपमा फर्कनुहोस्।",
  "हरेक सत्रले शान्तिको एउटा बीउ रोप्छ।",
  "मन भट्किएको देख्ने क्षण नै फर्कने क्षण हो।",
  "धैर्य नै अभ्यासको मुटु हो।",
];

interface SessionCompleteProps {
  durationMinutes: number;
  totalSessions: number;
  onReturn: () => void;
}

export default function SessionComplete({
  durationMinutes,
  totalSessions,
  onReturn,
}: SessionCompleteProps) {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const showEncouragement = totalSessions > 0 && totalSessions % 3 === 0;
  const encouragement = encouragements[totalSessions % encouragements.length];

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center animate-fade-up">

      <div className="text-center px-8 max-w-sm space-y-6">

        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto">
          <span className="text-gold text-2xl">✧</span>
        </div>

        <div className="space-y-2">

          <h2 className="font-display text-2xl text-foreground">
            सत्र सम्पन्न भयो
          </h2>

          <p className="font-body text-muted-foreground text-sm">
            तपाईंले {durationMinutes} मिनेट अभ्यास गर्नुभयो।
          </p>

        </div>

        <p className="font-body text-foreground/60 text-xs italic">
          फर्किनु अघि एकछिन शान्त बस्नुहोस्।
        </p>

        {showEncouragement && (
          <p className="font-body text-gold/80 text-sm leading-relaxed">
            {encouragement}
          </p>
        )}

        <p className="font-body text-muted-foreground/50 text-[11px] tracking-wider uppercase">
          सत्र सुरक्षित भयो
        </p>

        {showButton && (
          <Button
            onClick={onReturn}
            variant="outline"
            className="rounded-full border-border font-body tracking-wider uppercase text-sm px-8 animate-fade-up"
          >
            फर्कनुहोस्
          </Button>
        )}

      </div>

    </div>
  );
}
