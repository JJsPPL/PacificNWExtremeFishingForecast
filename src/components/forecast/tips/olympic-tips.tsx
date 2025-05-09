
import { Map } from "lucide-react";

export const OlympicTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        Olympic Peninsula Rivers Fishing Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        The Bogachiel, Sol Duc, and Calawah rivers form the Quillayute system, one of the premier winter steelhead destinations in Washington.
        Best fishing is typically December through March for winter steelhead.
        Olympic National Park regulations apply to portions of these rivers - check boundaries carefully.
      </p>
      <p className="text-xs text-muted-foreground">
        These rivers can rise and fall rapidly after rainfall - monitor river gauges before your trip.
        Drift fishing with yarn, beads, or bait is effective in higher flows; fly fishing opportunities improve as waters drop.
        For salmon seasons, focus on pink/purple or black/blue jigs near tributary mouths and deeper holes.
      </p>
    </div>
  );
};
