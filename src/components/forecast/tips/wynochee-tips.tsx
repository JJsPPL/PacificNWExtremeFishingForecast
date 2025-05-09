
import { Map } from "lucide-react";

export const WynocheeTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        Wynochee River Fishing Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        The Wynochee offers excellent bank access at Schafer State Park and below the dam.
        Winter steelhead season typically runs December through March.
        The river can be productive for trout in summer months, especially near cooler tributaries.
      </p>
      <p className="text-xs text-muted-foreground">
        Bobber and jig techniques are particularly effective in the deeper runs below the dam.
        Use pink or orange jigs in sizes 1/8 to 1/4 oz when waters are higher and more turbid.
        For clearer conditions, try smaller jigs in natural colors like black/blue or olive.
        Check for emergency fishing rule changes as hatchery returns can affect regulations.
      </p>
    </div>
  );
};
