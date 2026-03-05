// Gear recommendation utility — maps species to contextual gear
import {
  GEAR_BY_SPECIES,
  UNIVERSAL_GEAR,
  COLD_WEATHER_GEAR,
  SEASONAL_GEAR,
  type GearItem,
  type SpeciesGearProfile,
} from '@/lib/constants/gearRecommendations';

/** Map species names to gear profile keys */
function getGearKey(species: string): string {
  const s = species.toLowerCase();

  if (s.includes('chinook') || s.includes('coho') || s.includes('sockeye') ||
      s.includes('pink') || s.includes('chum') || s.includes('salmon')) {
    return 'salmon';
  }
  if (s.includes('steelhead')) return 'steelhead';
  if (s.includes('halibut')) return 'halibut';
  if (s.includes('lingcod')) return 'lingcod';
  if (s.includes('rockfish') || s.includes('sea bass') || s.includes('cabezon')) return 'rockfish';
  if (s.includes('trout') || s.includes('cutthroat') || s.includes('rainbow') || s.includes('brown')) return 'trout';
  if (s.includes('bass') && !s.includes('sea bass')) return 'bass';
  if (s.includes('sturgeon')) return 'sturgeon';
  if (s.includes('crab') || s.includes('dungeness')) return 'crab';
  if (s.includes('shrimp') || s.includes('prawn')) return 'shrimp';
  if (s.includes('tuna') || s.includes('albacore')) return 'tuna';
  if (s.includes('surfperch') || s.includes('perch')) return 'surfperch';
  if (s.includes('shad')) return 'shad';
  if (s.includes('flounder') || s.includes('sole')) return 'rockfish'; // similar gear

  return 'salmon'; // sensible default
}

/** Get the current season */
function getSeason(date: Date): 'winter' | 'spring' | 'summer' | 'fall' {
  const month = date.getMonth();
  if (month <= 1 || month === 11) return 'winter';
  if (month <= 4) return 'spring';
  if (month <= 7) return 'summer';
  return 'fall';
}

/** Check if cold weather gear should be shown */
function isColdWeatherSeason(date: Date, temperature?: number): boolean {
  if (temperature !== undefined && temperature < 45) return true;
  const month = date.getMonth();
  // Oct-Mar is cold season in PNW
  return month >= 9 || month <= 2;
}

export interface GearRecommendationResult {
  speciesGear: GearItem[];      // Species-specific essentials + recommended
  seasonalGear: GearItem[];     // Season-appropriate extras
  coldWeatherGear: GearItem[];  // Cold weather apparel/accessories
  universalGear: GearItem[];    // Always-useful gear
}

/**
 * Get contextual gear recommendations based on species, date, and conditions.
 * Returns a curated set — not everything, just what's relevant.
 */
export function getGearForSpecies(
  species: string[],
  date: Date,
  temperature?: number
): GearRecommendationResult {
  const seen = new Set<string>();
  const speciesGear: GearItem[] = [];

  // Deduplicate species gear across multiple recommendations
  const uniqueKeys = [...new Set(species.map(getGearKey))];

  for (const key of uniqueKeys) {
    const profile: SpeciesGearProfile | undefined = GEAR_BY_SPECIES[key];
    if (!profile) continue;

    // Add all essentials
    for (const item of profile.essentials) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        speciesGear.push(item);
      }
    }

    // Add 2-3 recommended items (deterministic based on date)
    const recCount = Math.min(3, profile.recommended.length);
    const startIdx = (date.getDate() + date.getMonth()) % Math.max(1, profile.recommended.length);
    for (let i = 0; i < recCount; i++) {
      const item = profile.recommended[(startIdx + i) % profile.recommended.length];
      if (!seen.has(item.name)) {
        seen.add(item.name);
        speciesGear.push(item);
      }
    }

    // Add cold weather gear from species profile
    if (isColdWeatherSeason(date, temperature) && profile.coldWeatherGear) {
      for (const item of profile.coldWeatherGear) {
        if (!seen.has(item.name)) {
          seen.add(item.name);
          speciesGear.push(item);
        }
      }
    }
  }

  // Seasonal gear
  const season = getSeason(date);
  const seasonalGear: GearItem[] = [];
  if (SEASONAL_GEAR[season]) {
    for (const item of SEASONAL_GEAR[season]) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        seasonalGear.push(item);
      }
    }
  }

  // Cold weather extras
  const coldGear: GearItem[] = [];
  if (isColdWeatherSeason(date, temperature)) {
    for (const item of COLD_WEATHER_GEAR) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        coldGear.push(item);
      }
    }
  }

  // Universal gear (limit to 2)
  const universalGear = UNIVERSAL_GEAR.filter(item => !seen.has(item.name)).slice(0, 2);

  return {
    speciesGear,
    seasonalGear,
    coldWeatherGear: coldGear,
    universalGear,
  };
}
