// FinalLoading.tsx
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const FinalUi = ({ isReady }: { isReady: boolean }) => {
  return (
    <div className="mt-3 p-4 bg-white rounded-2xl shadow-md text-center">
      <div className="border rounded-2xl p-6 flex flex-col items-center">
        {isReady ? (
          <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
        ) : (
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        )}

        <h3 className="text-lg font-semibold text-primary mb-1">
          {isReady ? "Trip Ready!" : "Planning your dream trip..."}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isReady
            ? "Your personalized travel plan is ready."
            : "Gathering best destinations, activities, and travel details for you."}
        </p>

        <Button className="bg-primary text-white w-full" disabled={!isReady}>
          View Trip
        </Button>
      </div>
    </div>
  );
};

export default FinalUi;
