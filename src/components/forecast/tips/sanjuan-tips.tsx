
import { Map } from "lucide-react";

export const SanJuanTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        San Juan Islands Fishing Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        The San Juan Islands offer diverse fishing opportunities with complex currents and structure. 
        For salmon, focus on current-washed points and passages during tide changes. Thatcher Pass, 
        Obstruction Pass, and Rosario Strait are prime areas. Use downriggers with flashers and spoons, 
        or mooching with cut plug herring during peak salmon migrations.
      </p>
      <p className="text-xs text-muted-foreground">
        For lingcod and rockfish, target rocky structure and kelp beds in 30-80 feet of water. 
        Large jigs, swimbaits, or live bait (when permitted) work well for lingcod. For rockfish, 
        smaller presentations with shrimp flies or 2-3 inch soft plastics are effective. Always 
        check current regulations as protected areas and depth restrictions exist to protect 
        rockfish populations.
      </p>
    </div>
  );
};
