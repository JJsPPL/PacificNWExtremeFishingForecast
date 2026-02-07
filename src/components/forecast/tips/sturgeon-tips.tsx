import { getCurrentMonthYearShort, getCurrentYear } from "@/lib/utils/dateUtils";

export const SturgeonTips = () => {
  const monthYear = getCurrentMonthYearShort();
  const year = getCurrentYear();

  return (
    <div>
      <h5 className="text-sm font-medium">Sturgeon Insider Tips (Updated {monthYear}):</h5>
      <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
        <li><strong>{year} Columbia River Update:</strong> Delayed openers for Bonneville/The Dalles pools. John Day Pool opens Jan 1 with 43-54 inch fork length, one fish daily limit.</li>
        <li><strong>Catch-and-Release:</strong> Outside of scheduled retention fisheries, sturgeon fishing is catch-and-release only.</li>
        <li>Winter and spring are peak seasons for keeper-sized sturgeon</li>
        <li>Target deeper holes and channels with strong current</li>
        <li>Use heavy sinkers (8-16 oz) to hold bottom in current</li>
        <li>Circle hooks are required and help with survival rates</li>
        <li>Sand shrimp is the most effective bait, followed by smelt and pickled herring</li>
        <li>Incoming tides typically produce the best action</li>
        <li>Be prepared for long fights - sturgeon are powerful</li>
        <li>Use strong tackle - 50-80lb main line with heavy leaders</li>
        <li>Anchor fishing is more effective than drifting</li>
        <li>Sturgeon prefer water temperatures between 45-58°F</li>
        <li><strong>Annual Limit:</strong> Statewide bag limit is two fish per year for any/all {year} retention fisheries</li>
      </ul>
    </div>
  );
};
