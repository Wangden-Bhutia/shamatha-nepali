import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Experience {
  title: string;
  icon: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title: "चञ्चलता",
    icon: "🌊",
    description:
      "मन अस्थिर हुन सक्छ, विचारबाट विचारतर्फ उफ्रिँदै गरेको झरनाजस्तै। यो असफलताको चिन्ह होइन — बरु पहिलो पटक तपाईंले मन कति व्यस्त रहँदै आएको थियो भन्ने स्पष्ट देख्नुभएको हो। चञ्चलता सधैं त्यहीं थियो; अब मात्र तपाईं त्यसप्रति सचेत हुनुभएको हो।",
  },
  {
    title: "आनन्द",
    icon: "✦",
    description:
      "शरीर र मनमा न्यानोपन, सुख वा गहिरो सन्तुष्टिको तरङ्गहरू उठ्न सक्छन्। यो अनुभव कहिलेकाहीँ अत्यन्त सुखद र मोहक लाग्न सक्छ। जोगचेन परम्परामा यसलाई ‘न्याम’ भनिन्छ — ध्यानका अस्थायी अनुभवहरू। शरीर शिथिल हुँदै र मन स्थिर हुँदै जाँदा यो स्वाभाविक रूपमा उत्पन्न हुन्छ। यसको आनन्द लिनुहोस्, तर यसको पछि नलाग्नुहोस्।",
  },
  {
    title: "स्पष्टता",
    icon: "◇",
    description:
      "अनुभूति असाधारण रूपमा स्पष्ट हुन सक्छ — रंगहरू उज्याला, आवाजहरू तीक्ष्ण, विचारहरू पारदर्शी। मन उज्यालो र पारदर्शी अनुभव हुन सक्छ। यस्तो स्पष्टता पनि अर्को ‘न्याम’ हो। यसले मनको स्वाभाविक क्षमता देखाउँछ जब त्यो सामान्य मन्दताबाट मुक्त हुन्छ। तर यस स्पष्टतामा आसक्ति राख्दा सूक्ष्म तनाव पैदा हुन सक्छ।",
  },
  {
    title: "दिक्क",
    icon: "○",
    description:
      "कहिलेकाहीँ केही भइरहेको छैन जस्तो लाग्न सक्छ — एउटा फिका, नीरस अनुभव। मनले उत्तेजना खोज्छ र चुपचाप बस्नुलाई निरर्थक ठान्छ। तर दिक्क वास्तवमा शक्तिशाली शिक्षक हो। यसले मनोरञ्जनप्रतिको मनको आसक्ति देखाउँछ। यदि तपाईं दिक्कसँगै बस्न सक्नुभयो भने, त्यसको तल गहिरो विश्रामको खुला ठाउँ पाउनुहुनेछ।",
  },
  {
    title: "दृश्यहरू",
    icon: "◈",
    description:
      "प्रकाश, रंग, आकृतिहरू वा प्रतीकात्मक दृश्यहरू देखिन सक्छन् — कहिलेकाहीँ सुन्दर, कहिलेकाहीँ अनौठा। केही परम्पराहरूमा यसलाई ठूलो महत्व दिइन्छ। तर जोगचेनमा यीलाई अन्य विचारजस्तै हेरिन्छ — मनको सृजनात्मक उर्जाको स्वाभाविक प्रदर्शन। यसलाई न डराउनुहोस्, न पछ्याउनुहोस्। उठ्न दिनुहोस् र आफैं विलीन हुन दिनुहोस्।",
  },
  {
    title: "निद्रालुता",
    icon: "☾",
    description:
      "शरीर भारी र मन धुम्म हुन सक्छ। कहिलेकाहीँ टाउको निहुरिन सक्छ वा सचेतना हराउन सक्छ। यो मनको पुरानो बानी हो — उत्तेजना नभएपछि या त सोच्ने या सुत्ने। अभ्याससँगै सतर्क विश्रामको क्षमता बढ्दै जाँदा यो अवस्था पनि बिस्तारै घट्दै जान्छ।",
  },
  {
    title: "भावनात्मक मुक्तता",
    icon: "💧",
    description:
      "पुराना भावनाहरू — शोक, क्रोध, डर वा कोमलता — कहिलेकाहीँ स्पष्ट कारण बिना पनि उठ्न सक्छन्। मन शान्त हुँदै जाँदा शरीरमा संचित तनावहरू खुल्न थाल्छन्। यी मुक्तताहरू शुद्धिकरणको स्वाभाविक भाग हुन्। भावनाहरूलाई उपत्यकाबाट गुज्रिने मौसमझैँ आउन र जान दिनुहोस्। तपाईं उपत्यका हुनुहुन्छ, आँधी होइन।",
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
              ध्यानमा के हुन्छ
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <div className="animate-fade-up text-center space-y-3">
          <p className="font-display text-2xl text-gold italic">
            "यी सबै सामान्य अनुभवहरू हुन् — तिनमा आसक्ति नराख्नुहोस्।"
          </p>

          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            अभ्यास गहिरो हुँदै जाँदा मन र शरीरमा विभिन्न अनुभवहरू देखा पर्न सक्छन्।
            जोगचेन परम्परामा यिनलाई <span className="text-gold italic">न्याम</span> भनिन्छ —
            प्रगतिका संकेत हुने अस्थायी ध्यान अनुभवहरू, अन्तिम गन्तव्य होइनन्।
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
            जे उठ्छ, उठ्न दिनुहोस्। जे रहन्छ, रहन दिनुहोस्।
            जे जान्छ, जान दिनुहोस्।
            यी सबैलाई देख्ने सचेतना नै तपाईंको वास्तविक स्वभाव हो।
          </p>

          <p className="text-xs text-muted-foreground font-body">
            — जोगचेन उपदेश
          </p>
        </div>
      </div>
    </div>
  );
}
