
import { FishingRecommendation } from "../../types/fishingTypes";
import { getActiveRunsForDate } from "../../constants/fishRunCalendar";
import { getSpecificLocationForSystem } from "./locationUtils";
import { getTacticsForSpecies, getBaitForSpecies, enhanceTactics, enhanceBait } from "./tacticUtils";
import { generateWaterConditions, getBestTimeRecommendation } from "./conditionUtils";

// Maximum same-species recommendations to ensure variety
const MAX_PER_SPECIES = 3;

// Emphasis systems — these get priority in recommendations
const EMPHASIS_SYSTEMS = [
  'Cowlitz River', 'Lewis River', 'Kalama River', 'Columbia River',
  'Puget Sound', 'Hood Canal', 'Willamette River', 'Nestucca River',
  'Sandy River', 'Clackamas River', 'Wind River', 'Toutle River',
  'Tillamook System', 'San Juan Islands', 'Strait of Juan De Fuca',
  'Chehalis River', 'Wynochee River', 'Skagit River',
];

type ActiveRun = ReturnType<typeof getActiveRunsForDate>[0];

// ============================================================================
// Generate fishing recommendations — DATA-DRIVEN from fish run calendar
// ============================================================================
// This replaces the old code-driven approach (hardcoded seasonal blocks +
// getSeasonalSpecies + getLocationPool) with a centralized fish run calendar
// lookup. Every recommendation is backed by real run timing data.
// ============================================================================

export const generateRecommendations = (
  date: Date,
  rating: number,
  moonPhase: string,
  barometricPressure: number
): FishingRecommendation[] => {
  const month = date.getMonth();
  const recommendations: FishingRecommendation[] = [];

  // Scale recommendation count with rating
  const numRecommendations = rating >= 70 ? 6 : (rating >= 40 ? 4 : 3);

  // Get active runs from the fish run calendar (already sorted: peak first, then species priority)
  const activeRuns = getActiveRunsForDate(date);

  if (activeRuns.length === 0) return recommendations;

  // Track used species+system combos and species counts for variety
  const usedSystemSpecies = new Set<string>();
  const speciesCount: Record<string, number> = {};

  // PASS 1: Peak runs from emphasis areas (highest quality recommendations)
  addRunRecommendations(activeRuns, recommendations, date, month,
    numRecommendations, usedSystemSpecies, speciesCount,
    run => run.isPeak && EMPHASIS_SYSTEMS.includes(run.location));

  // PASS 2: Any peak runs (expands to non-emphasis areas)
  addRunRecommendations(activeRuns, recommendations, date, month,
    numRecommendations, usedSystemSpecies, speciesCount,
    run => run.isPeak);

  // PASS 3: Non-peak runs from emphasis areas
  addRunRecommendations(activeRuns, recommendations, date, month,
    numRecommendations, usedSystemSpecies, speciesCount,
    run => EMPHASIS_SYSTEMS.includes(run.location));

  // PASS 4: Fill remaining from any active runs
  addRunRecommendations(activeRuns, recommendations, date, month,
    numRecommendations, usedSystemSpecies, speciesCount,
    () => true);

  return recommendations;
};

function addRunRecommendations(
  runs: ActiveRun[],
  recommendations: FishingRecommendation[],
  date: Date,
  month: number,
  maxRecs: number,
  usedSystemSpecies: Set<string>,
  speciesCount: Record<string, number>,
  filter: (run: ActiveRun) => boolean,
): void {
  for (const run of runs) {
    if (recommendations.length >= maxRecs) return;
    if (!filter(run)) continue;

    // Deduplicate by species + calendar system
    const systemKey = `${run.species}|${run.location}`;
    if (usedSystemSpecies.has(systemKey)) continue;

    // Cap same species to ensure variety
    const count = speciesCount[run.species] || 0;
    if (count >= MAX_PER_SPECIES) continue;

    usedSystemSpecies.add(systemKey);
    speciesCount[run.species] = count + 1;

    // Map calendar system to a specific sub-location
    const specificLocation = getSpecificLocationForSystem(run.location, date, recommendations.length);

    // Get tactics and bait (deterministic selection based on date)
    const tacticsPool = getTacticsForSpecies(run.species);
    const tacticIdx = (date.getDate() * (recommendations.length + 2)) % tacticsPool.length;
    let tactics = enhanceTactics(tacticsPool[tacticIdx], run.species, specificLocation);

    const baitPool = getBaitForSpecies(run.species);
    const baitIdx = (date.getDate() * (recommendations.length + 3)) % baitPool.length;
    let bait = enhanceBait(baitPool[baitIdx], run.species, specificLocation);

    // Generate water conditions and timing
    const waterConditions = generateWaterConditions(specificLocation, month, date);
    const bestTime = getBestTimeRecommendation(date);

    // Build run forecast from calendar data
    let runForecast = run.isPeak ? `PEAK RUN: ${run.notes}` : run.notes;
    if (run.regulations) {
      runForecast += ` | Regulations: ${run.regulations}`;
    }

    recommendations.push({
      species: run.species,
      location: specificLocation,
      tactics,
      bait,
      waterConditions,
      bestTime,
      runForecast,
    });
  }
}
