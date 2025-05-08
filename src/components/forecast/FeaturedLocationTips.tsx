
import { Fish } from "lucide-react";
import { 
  NestuccaTips,
  ColumbiaTips,
  WillametteTips,
  SandyTips,
  ClackamasTips,
  SnakeTips,
  TillamookTips
} from "./tips";

interface FeaturedLocationTipsProps {
  locations: string[];
}

export const FeaturedLocationTips = ({ locations }: FeaturedLocationTipsProps) => {
  const hasNestucca = locations.some(loc => loc && loc.includes("Nestucca"));
  const hasColumbia = locations.some(loc => loc && loc.includes("Columbia"));
  const hasWillamette = locations.some(loc => loc && loc.includes("Willamette"));
  const hasSandy = locations.some(loc => loc && loc.includes("Sandy"));
  const hasClackamas = locations.some(loc => loc && loc.includes("Clackamas"));
  const hasSnake = locations.some(loc => loc && loc.includes("Snake"));
  const hasTillamook = locations.some(loc => loc && (
    loc.includes("Tillamook") || 
    loc.includes("Trask") || 
    loc.includes("Wilson") || 
    loc.includes("Kilchis") || 
    loc.includes("Miami")
  ));
  
  // If no featured locations are present, return null
  if (!hasNestucca && !hasColumbia && !hasWillamette && !hasSandy && !hasClackamas && !hasSnake && !hasTillamook) return null;
  
  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
      <h4 className="font-medium flex items-center">
        <Fish className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
        Featured Location Tips
      </h4>
      <div className="mt-2 space-y-3">
        {hasNestucca && <NestuccaTips />}
        {hasColumbia && <ColumbiaTips />}
        {hasWillamette && <WillametteTips />}
        {hasSandy && <SandyTips />}
        {hasClackamas && <ClackamasTips />}
        {hasSnake && <SnakeTips />}
        {hasTillamook && <TillamookTips />}
      </div>
    </div>
  );
};
