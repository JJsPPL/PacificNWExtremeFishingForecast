
import { getCurrentMonthYearShort, getCurrentYear } from "@/lib/utils/dateUtils";

export const CowlitzTips = () => {
  const monthYear = getCurrentMonthYearShort();
  const year = getCurrentYear();

  return (
    <div>
      <h5 className="text-sm font-medium">Cowlitz River Insider Tips (Updated {monthYear}):</h5>

      {/* Drought Status for Cowlitz */}
      <div className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs">
        <span className="font-medium text-green-700 dark:text-green-400">✅ DROUGHT ADVANTAGE:</span>
        <span className="text-green-600 dark:text-green-300"> Mayfield Dam releases provide stable flows despite 50% precip deficit. One of the best winter options in {year}.</span>
      </div>

      <ul className="text-xs mt-2 ml-4 list-disc space-y-1">
        <li><strong>{monthYear} Status:</strong> Winter steelhead season active (Dec 1 - March 31). Dam-controlled flows 4,000-5,500 cfs providing consistent conditions.</li>
        <li><strong>{year} Drought Impact:</strong> Cowlitz faring BETTER than rain-dependent rivers. Mayfield Dam releases maintaining fishable flows when coastal streams are critically low.</li>
        <li><strong>Current Hot Spots:</strong> Blue Creek producing well with fish concentrated in deeper holes. Focus on water 4-8ft deep with moderate current.</li>
        <li><strong>Low Water Tactics:</strong> Even with dam control, water is clearer than normal. Use 8lb fluorocarbon leaders, smaller jigs (1/8oz), natural colors (black/purple/olive).</li>
        <li>The Barrier Dam area concentrates fish and offers some of the best bank access, but gets crowded quickly</li>
        <li><strong>Historic Comparison:</strong> In 2015 drought, Cowlitz outperformed coastal streams 3:1 for winter steelhead catch rates due to stable dam flows.</li>
        <li>Take advantage of WDFW's "Weekender Report" and Fish Washington app for latest hatchery counts</li>
        <li>Boaters should be aware of underwater hazards during low water conditions, especially near Toledo</li>
        <li>Bank fishermen find good access at Blue Creek, Mission Bar, Baird Creek, and below the Barrier Dam</li>
        <li>Winter steelhead action picks up dramatically after December 15th, with peak returns around mid-January through early February</li>
        <li><strong>Tactics:</strong> Drift fishing with cured eggs, pink/orange jigs under floats (1/8oz in clear water), or swinging flies in tailouts</li>
        <li><strong>Access Maps:</strong> See fishthecowlitz.com for detailed fishing access points and boat launches</li>
      </ul>
    </div>
  );
};
