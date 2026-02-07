import { getCurrentMonthYear, getCurrentMonthYearShort } from "@/lib/utils/dateUtils";

export const SummerChinookTips = () => {
  const monthYear = getCurrentMonthYear();
  const monthYearShort = getCurrentMonthYearShort();

  return (
    <div>
      <h5 className="text-sm font-medium">Summer Chinook Salmon Tips ({monthYear} Update):</h5>
      <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
        <li>PEAK RUNS: Bonneville Dam showing 424-536 summer Chinook daily ({monthYearShort}) - excellent numbers</li>
        <li>All Columbia River summer Chinook counts are strong through the system</li>
        <li>Target deeper water below dam structures - fish stage in 15-30 foot depths</li>
        <li>Trolling with flashers and herring most effective technique</li>
        <li>Use larger presentations than spring Chinook - bigger baits for bigger fish</li>
        <li>Green/chartreuse flashers with herring or sardine-wrapped plugs</li>
        <li>Early morning hours when boat traffic is minimal - prime time</li>
        <li>Focus on current breaks and structure near dam tailraces</li>
        <li>Summer Chinook are actively feeding - aggressive presentations work</li>
        <li>Depths of 20-40 feet typically most productive for summer fish</li>
        <li>Check dam spillway schedules - fish activity increases with spill changes</li>
        <li>Downrigger fishing with cut-plug herring very effective</li>
        <li>Watch for bird activity indicating baitfish schools</li>
        <li>Summer fish are chrome bright and fight harder than spring fish</li>
      </ul>
    </div>
  );
};
