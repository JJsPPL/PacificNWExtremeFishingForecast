
import { getCurrentMonthYearShort } from "@/lib/utils/dateUtils";

export const NestuccaTips = () => {
  const monthYear = getCurrentMonthYearShort();

  return (
    <div>
      <h5 className="text-sm font-medium">Nestucca River Insider Tips (Updated {monthYear}):</h5>
      <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
        <li><strong>{monthYear} Regulation:</strong> CLOSED to all Chinook salmon Dec 1-31 per ODFW. Steelhead fishing remains open.</li>
        <li><strong>Winter Steelhead:</strong> Season active Dec-March. Target fish holding in deeper runs and tailouts.</li>
        <li>The Three Rivers section holds fish year-round, with deeper holes just below the confluence</li>
        <li>The First Bridge area fishes best during higher water when fish are moving upriver</li>
        <li>Tidewater fishing at Cloverdale is productive during incoming tides for steelhead</li>
        <li>Smaller presentations often work better during low water periods</li>
        <li>Beaver section has excellent bank access and several well-known steelhead runs</li>
        <li>Cedar Creek confluence creates a natural holding area for winter steelhead</li>
        <li>Hester Bridge area has deep pools that hold fish even during low water periods</li>
        <li>The upper river (Farmer Creek Road) is less pressured and good for fly fishing</li>
        <li><strong>Tactics:</strong> Drift eggs, yarn balls, or beads under floats in 2-4 foot visibility water</li>
      </ul>
    </div>
  );
};
