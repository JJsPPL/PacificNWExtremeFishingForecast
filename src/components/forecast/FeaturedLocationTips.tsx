
import { Fish } from "lucide-react";

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
  
  if (!hasNestucca && !hasColumbia && !hasWillamette && !hasSandy && !hasClackamas && !hasSnake) return null;
  
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
              <li>Beaver section has excellent bank access and several well-known steelhead runs</li>
              <li>Cedar Creek confluence creates a natural holding area for winter steelhead</li>
              <li>Hester Bridge area has deep pools that hold fish even during low water periods</li>
              <li>The upper river (Farmer Creek Road) is less pressured and good for fly fishing</li>
            </ul>
          </div>
        )}
        {hasColumbia && (
          <div>
            <h5 className="text-sm font-medium">Columbia River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>Buoy 10 is best fished on the incoming tide for fall Chinook and Coho</li>
              <li>The Astoria area produces best in August and September for fall salmon</li>
              <li>Target tributary mouths during spring and fall salmon runs</li>
              <li>Focus on underwater structure for smallmouth bass during summer months</li>
              <li>Deep channel edges are prime for sturgeon, especially during incoming tides</li>
              <li>The areas below dams concentrate fish during migrations</li>
              <li>Early morning and late evening bites are often strongest during summer</li>
            </ul>
          </div>
        )}
        {hasWillamette && (
          <div>
            <h5 className="text-sm font-medium">Willamette River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>Oregon City falls area is prime for spring Chinook from March through May</li>
              <li>Target deeper holes in Downtown Portland for sturgeon year-round</li>
              <li>The stretch from Newberg to Salem offers excellent smallmouth bass fishing in summer</li>
              <li>Focus on current seams and drop-offs for spring Chinook</li>
              <li>Winter steelhead fishing is best in the upper sections near Corvallis and Eugene</li>
              <li>Use smaller presentations during clear water conditions</li>
              <li>Early morning fishing is most productive during summer months</li>
            </ul>
          </div>
        )}
        {hasSandy && (
          <div>
            <h5 className="text-sm font-medium">Sandy River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>Oxbow Park offers the best bank access with multiple well-known runs</li>
              <li>Cedar Creek area near the hatchery is productive for winter steelhead</li>
              <li>The mouth fishes best on the outgoing tide during fall Chinook season</li>
              <li>Dodge Park is excellent for winter steelhead from December through February</li>
              <li>River clarity improves fastest at Revenue Bridge after heavy rains</li>
              <li>Higher sections near Salmon River stay clearer during rain events</li>
              <li>Early morning and late evening produce best during summer months</li>
            </ul>
          </div>
        )}
        {hasClackamas && (
          <div>
            <h5 className="text-sm font-medium">Clackamas River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>McIver Park offers the best bank access with numerous productive runs</li>
              <li>Carver to Barton is the most popular drift boat section</li>
              <li>Winter steelhead fishing peaks January through March</li>
              <li>Summer steelhead fishing is best from May through July</li>
              <li>The area below Rivermill Dam concentrates fish during migrations</li>
              <li>Focus on deeper slots and tail-outs during low water periods</li>
              <li>North Fork offers solitude but requires more hiking to access</li>
            </ul>
          </div>
        )}
        {hasSnake && (
          <div>
            <h5 className="text-sm font-medium">Snake River Insider Tips:</h5>
            <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
              <li>Lewiston area is excellent for steelhead from September through November</li>
              <li>Hells Canyon offers world-class sturgeon fishing</li>
              <li>Use crankbaits for smallmouth bass during summer months</li>
              <li>C.J. Strike Reservoir is best for crappie in spring and early summer</li>
              <li>Twin Falls area offers good trout fishing below the dam</li>
              <li>American Falls Reservoir produces large yellow perch in winter</li>
              <li>Fish early morning or late evening during hot summer months</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
