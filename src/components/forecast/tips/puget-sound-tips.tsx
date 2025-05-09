
import { Map } from "lucide-react";

export const PugetSoundTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        Puget Sound Fishing Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        Tides and currents are critical in Puget Sound. Fish the tide changes at prominent points like Point No Point, 
        Possession Point, and Jefferson Head. For winter blackmouth, use downriggers at 90-140 feet with green/white 
        spoons or hoochies. During summer, target resident coho with a faster troll using smaller gear in the top 30 feet. 
        Pay attention to baitfish concentrations, which are visible on your sounder or as bird activity.
      </p>
      <p className="text-xs text-muted-foreground">
        For lingcod and rockfish, focus on rocky structure and artificial reefs in 60-120 feet. Fish lingcod during 
        May-June season with heavy jigs or live bait. Always check regulations before fishing, as many areas have 
        special rules to protect rockfish populations.
      </p>
    </div>
  );
};
