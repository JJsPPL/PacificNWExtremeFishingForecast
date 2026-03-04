
import { Fish } from "lucide-react";

interface FishScoreIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export const FishScoreIndicator = ({ score, size = "md" }: FishScoreIndicatorProps) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  // Determine size
  const getSize = () => {
    switch (size) {
      case "sm": return "h-4 w-4";
      case "lg": return "h-6 w-6";
      default: return "h-5 w-5";
    }
  };

  // Determine how many fish to show (1-3 based on score)
  const fishCount = score >= 80 ? 3 : score >= 50 ? 2 : 1;

  return (
    <div className="flex items-center overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <Fish
          key={index}
          className={`${getSize()} ${index < fishCount ? getColor() : "text-gray-200"}`}
          fill={index < fishCount ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};
