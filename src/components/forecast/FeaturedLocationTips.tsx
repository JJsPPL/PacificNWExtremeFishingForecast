
import { Fish } from "lucide-react";
import { 
  NestuccaTips,
  ColumbiaTips,
  WillametteTips,
  SandyTips,
  ClackamasTips,
  SnakeTips,
  TillamookTips,
  OlympicTips,
  WynocheeTips,
  PugetSoundTips,
  HoodCanalTips,
  StraitTips,
  SanJuanTips,
  CowlitzTips,
  LewisTips,
  WindTips
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
  const hasOlympic = locations.some(loc => loc && (
    loc.includes("Bogachiel") || 
    loc.includes("Sol Duc") || 
    loc.includes("Calawah")
  ));
  const hasWynochee = locations.some(loc => loc && loc.includes("Wynochee"));
  const hasPugetSound = locations.some(loc => loc && loc.includes("Puget Sound"));
  const hasHoodCanal = locations.some(loc => loc && loc.includes("Hood Canal"));
  const hasStrait = locations.some(loc => loc && loc.includes("Juan De Fuca"));
  const hasSanJuan = locations.some(loc => loc && loc.includes("San Juan"));
  const hasCowlitz = locations.some(loc => loc && loc.includes("Cowlitz"));
  const hasLewis = locations.some(loc => loc && loc.includes("Lewis"));
  const hasWind = locations.some(loc => loc && loc.includes("Wind"));
  const hasSequim = locations.some(loc => loc && loc.includes("Sequim"));
  
  // If no featured locations are present, return null
  if (!hasNestucca && !hasColumbia && !hasWillamette && !hasSandy && 
      !hasClackamas && !hasSnake && !hasTillamook && !hasOlympic && 
      !hasWynochee && !hasPugetSound && !hasHoodCanal && !hasStrait && 
      !hasSanJuan && !hasCowlitz && !hasLewis && !hasWind && !hasSequim) return null;
  
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
        {hasOlympic && <OlympicTips />}
        {hasWynochee && <WynocheeTips />}
        {hasPugetSound && <PugetSoundTips />}
        {hasHoodCanal && <HoodCanalTips />}
        {hasStrait && <StraitTips />}
        {hasSanJuan && <SanJuanTips />}
        {hasCowlitz && <CowlitzTips />}
        {hasLewis && <LewisTips />}
        {hasWind && <WindTips />}
        {/* Add Sequim tips to Strait tips since they're closely related */}
        {hasSequim && <StraitTips />}
      </div>
    </div>
  );
};
