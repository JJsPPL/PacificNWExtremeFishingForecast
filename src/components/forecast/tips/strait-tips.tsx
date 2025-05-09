
import { Map } from "lucide-react";

export const StraitTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        Strait of Juan De Fuca Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        The Strait offers world-class salmon fishing, particularly around Sekiu and Neah Bay during summer. 
        Use 6-inch herring in blue label size behind a flasher for Chinook, or smaller green label herring 
        for Coho. Trolling depths vary seasonally - 50-120 feet for Chinook, 20-60 feet for Coho. Pay close 
        attention to downrigger depth where you mark bait schools.
      </p>
      <p className="text-xs text-muted-foreground">
        For halibut (during season), fish 250-350 foot depths with heavy jigs or herring. Key spots include 
        Eastern Bank and 72-Square near Port Angeles. For lingcod and rockfish, target rocky underwater structure 
        in 50-120 feet of water using heavy jigs or live bait. Always check tide charts - the bite is often 
        best during moderate current flow, not during slack or maximum flow.
      </p>
    </div>
  );
};
