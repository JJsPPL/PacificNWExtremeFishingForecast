
export const WinterSteelheadTips = () => {
  return (
    <div className="text-sm">
      <p className="font-medium text-blue-700 dark:text-blue-300">
        Winter Steelhead - 2025-26 Season (Dec 1 - March 31)
      </p>
      
      {/* 2026 Drought Alert Banner */}
      <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded border border-amber-300 dark:border-amber-700">
        <p className="text-amber-800 dark:text-amber-200 font-medium text-xs">
          ⚠️ 2026 DROUGHT ALERT: Pacific NW at 50% normal precipitation (similar to 2001, 2015, 2021)
        </p>
        <ul className="mt-1 text-xs text-amber-700 dark:text-amber-300 list-disc list-inside">
          <li><strong>Historic Pattern:</strong> In 2015 drought (48% precip), steelhead survival dropped to 52%. Fish concentrated in deeper holes.</li>
          <li><strong>Expected Impacts:</strong> Low, clear water through spring. Fish spookier. Delayed spawning migration possible.</li>
          <li><strong>Probability:</strong> 60-70% chance of reduced catch rates vs. normal years. Dam-controlled rivers (Cowlitz, Lewis) faring better.</li>
        </ul>
      </div>
      
      <ul className="mt-2 list-disc list-inside text-muted-foreground">
        <li>
          <strong>WDFW 2025-26 Coastal Regulations:</strong> Most major rivers open Dec 1 - March 31. Notable exceptions: Humptulips closes Feb 2, Chehalis closes Feb 16.
        </li>
        <li>
          <strong>Oregon Coastal:</strong> Tillamook, Nestucca, Nehalem systems CLOSED to Chinook Dec 1-31 per ODFW. Steelhead fishing remains open.
        </li>
        <li>
          <strong>🌊 DROUGHT TACTICS (2026):</strong> Downsize to 6-8lb fluorocarbon. Use 1/16-1/8oz jigs in darker colors (black, purple). Target "broken water" - riffles and tailouts where steelhead feel secure in low visibility.
        </li>
        <li>
          <strong>Low Water Strategy:</strong> Fish early AM (first light to 9AM) or late PM. Steelhead in clear water are extremely wary. Long casts, stealthy approach essential.
        </li>
        <li>
          <strong>Prime Holding Water:</strong> Focus on deeper pockets (4-8ft), turbulent water below structure, inside seams. Fish concentrated in limited cover.
        </li>
        <li>
          <strong>Best Bets (Drought Year):</strong> Dam-controlled rivers (Cowlitz, Lewis, Wynoochee) have more consistent flows. Rain-dependent coastal streams very low.
        </li>
        <li>
          <strong>Must Release:</strong> Wild steelhead required to be released on most Washington coastal rivers per 2025-26 regulations.
        </li>
      </ul>
    </div>
  );
};
