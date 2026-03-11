        import { useState, useEffect } from "react";

const quotes = [
  { text: "यो थकित मनलाई यसको स्वाभाविक महान शान्तिमा विश्राम गर्न दिनुहोस्।", author: "Nyoshul Khen Rinpoche" },
  { text: "अतीतको पछि नलाग्नुहोस्। भविष्यलाई बोलाउनुहोस् पनि होइन। वर्तमान सचेतनामा समान रूपमा विश्राम गर्नुहोस्।", author: "Milarepa" },
  { text: "मनको स्वभाव आकाशजस्तै हो — स्वाभाविक रूपमा स्पष्ट र शुद्ध।", author: "Dilgo Khyentse Rinpoche" },
  { text: "संसारको सम्पूर्ण सतह छोप्न पर्याप्त छाला म कहाँ पाउँछु? तर खुट्टाको तलुवामा छाला लगाउनु भनेको सम्पूर्ण पृथ्वीलाई छोप्नु जस्तै हो।", author: "Shantideva" },
  { text: "विचारहरूको बीचको खाली ठाउँमा मनको उज्यालो स्वभाव प्रकट हुन्छ।", author: "Milarepa" },
  { text: "मनलाई कुनै कृत्रिम प्रयास बिना यसको स्वाभाविक अवस्थामा विश्राम गर्न दिनुहोस्।", author: "Dilgo Khyentse Rinpoche" },
  { text: "अतीतलाई लम्ब्याउनु हुँदैन, भविष्यलाई बोलाउनु हुँदैन, आफ्नो स्वाभाविक जागरूकतालाई परिवर्तन नगर्नुहोस्।", author: "Nyoshul Khen Rinpoche" },
  { text: "सबै कुरा केवल प्रकट भएको दृश्य मात्र भएकोले, राम्रो वा नराम्रोसँग सम्बन्धित नभएकोले, मानिस सहजै हाँस्न सक्छ।", author: "Milarepa" },
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
