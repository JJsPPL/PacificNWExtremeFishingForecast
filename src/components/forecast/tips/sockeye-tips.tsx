import { getCurrentMonthYear, getCurrentMonthYearShort } from "@/lib/utils/dateUtils";

export const SockeyeTips = () => {
  const monthYear = getCurrentMonthYear();
  const monthYearShort = getCurrentMonthYearShort();

  return (
    <div>
      <h5 className="text-sm font-medium">Sockeye Salmon Insider Tips ({monthYear} Update):</h5>
      <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
        <li>STRONG RUNS: Rock Island Dam showing 400-978 Sockeye daily ({monthYearShort}) - exceptional numbers</li>
        <li>Bonneville Dam counts: 122-388 Sockeye daily passage - peak summer timing</li>
        <li>Upper Columbia dams (Wanapum, Priest Rapids) also showing excellent counts</li>
        <li>Target areas near dam tailraces where fish stage before continuing upstream</li>
        <li>Use smaller presentations - Sockeye have smaller mouths than Chinook salmon</li>
        <li>Red/pink/blue colors most effective - match their spawning coloration preference</li>
        <li>Fish early morning when water temperatures are coolest (55-62°F optimal range)</li>
        <li>Small hoochies, spinners, and spoons work better than large plugs for Sockeye</li>
        <li>Focus on current seams and eddies below dam structures and spillways</li>
        <li>Sockeye travel in schools - when you find one, there are usually many more nearby</li>
        <li>They prefer clear, well-oxygenated water with moderate to strong current flow</li>
        <li>Check daily fish passage counts at major Columbia River dams for timing</li>
        <li>Light line (8-12 lb test) and small terminal tackle increase success rates significantly</li>
        <li>Morning bite typically strongest - target first light through 10 AM</li>
      </ul>
    </div>
  );
};
