import SelfAssessment from "@/components/SelfAssessment";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { ArrowLeft } from "lucide-react";

const SelfAssessmentPage = () => {
  const navigate = useNavigate();
  const { setRecommendedStage } = useProgress();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <SelfAssessment onStageRecommended={setRecommendedStage} />
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
