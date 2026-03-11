import { useState, useEffect } from "react";

const quotes = [
  { text: "Rest in natural great peace, this exhausted mind.", author: "Nyoshul Khen Rinpoche" },
  { text: "Do not pursue the past. Do not usher in the future. Rest evenly with present awareness.", author: "Milarepa" },
  { text: "The nature of mind is like the sky — naturally clear and pure.", author: "Dilgo Khyentse Rinpoche" },
  { text: "Where would I possibly find enough leather to cover the surface of the earth? But wearing leather on the soles of my feet is equivalent to covering the earth with it.", author: "Shantideva" },
  { text: "In the gap between thoughts, the luminous nature of mind shines.", author: "Milarepa" },
  { text: "Let the mind rest in its natural state, free of any contrivance.", author: "Dilgo Khyentse Rinpoche" },
  { text: "Don't prolong the past, don't invite the future, don't alter your innate wakefulness.", author: "Nyoshul Khen Rinpoche" },
  { text: "Since everything is but an apparition, having nothing to do with good or bad, acceptance or rejection, one may well burst out in laughter.", author: "Milarepa" },
];

export default function MeditationQuotes() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 600);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div className="text-center py-8 border-t border-border px-6">
      <div
        className="transition-opacity duration-500 ease-in-out max-w-md mx-auto"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <p className="font-display text-sm text-muted-foreground italic leading-relaxed">
          "{quote.text}"
        </p>
        <p className="text-xs text-muted-foreground mt-2 font-body">— {quote.author}</p>
            
      </div>
    </div>
  );
}
