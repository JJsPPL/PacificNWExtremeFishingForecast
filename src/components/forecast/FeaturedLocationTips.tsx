
import { Fish } from "lucide-react";

interface FeaturedLocationTipsProps {
  locations: string[];
}

export const FeaturedLocationTips = ({ locations }: FeaturedLocationTipsProps) => {
  const hasNestucca = locations.some(loc => loc.includes("Nestucca"));
  const hasColumbia = locations.some(loc => loc.includes("Columbia"));
  
  if (!hasNestucca && !hasColumbia) return null;
  
  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
      <h4 className="font-medium flex items-center">
        <Fish className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
        Featured Location Tips
      </h4>
      <div className="mt-2 space-y-3">
        {hasNestucca && (
          <div>
            <h5 className="text-sm font-medium">Nestucca River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>The Three Rivers section holds fish year-round, with deeper holes just below the confluence</li>
              <li>The First Bridge area fishes best during higher water when fish are moving upriver</li>
              <li>Tidewater fishing at Cloverdale is productive during incoming tides, especially for fall Chinook</li>
              <li>Smaller presentations often work better during low water periods</li>
            </ul>
          </div>
        )}
        {hasColumbia && (
          <div>
            <h5 className="text-sm font-medium">Columbia River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>Target tributary mouths during spring and fall salmon runs</li>
              <li>Focus on underwater structure for smallmouth bass during summer months</li>
              <li>Deep channel edges are prime for sturgeon, especially during incoming tides</li>
              <li>Early morning and late evening bites are often strongest during summer</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
