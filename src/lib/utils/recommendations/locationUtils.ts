
import { FISHING_LOCATIONS, LOCATION_DETAILS } from "../../constants/fishingLocations";

// System-to-sublocation mapping for calendar systems where location names
// don't start with the system name (e.g., Tillamook System -> Wilson River, Trask River, etc.)
const SYSTEM_SUBLOCATION_PREFIXES: Record<string, string[]> = {
  'Tillamook System': ['Wilson River', 'Trask River', 'Kilchis River', 'Tillamook River', 'Miami River'],
  'Oregon Coast Offshore': ['Offshore Astoria', 'Offshore Newport', 'Offshore Garibaldi', 'Offshore Depoe Bay', 'Offshore Charleston', 'Offshore Florence', 'Offshore Brookings'],
  'WA Coast Offshore': ['Offshore Westport', 'Offshore Ilwaco', 'Offshore Neah Bay', 'Offshore La Push'],
  'Wind River': ['Wind River', 'Drano Lake'],
};

/**
 * Map a fish run calendar system name to a specific sub-location from FISHING_LOCATIONS.
 * Uses date + index for deterministic variety across recommendations.
 *
 * Example: "Cowlitz River" (calendar key) -> "Cowlitz River - Blue Creek" (specific location)
 */
export function getSpecificLocationForSystem(
  systemName: string,
  date: Date,
  index: number = 0
): string {
  // Collect all locations from all states
  const allLocations = [
    ...(FISHING_LOCATIONS.Washington || []),
    ...(FISHING_LOCATIONS.Oregon || []),
    ...(FISHING_LOCATIONS.Idaho || []),
    ...(FISHING_LOCATIONS.Montana || []),
  ];

  let matching: string[] = [];

  // Check special system mappings first
  const prefixes = SYSTEM_SUBLOCATION_PREFIXES[systemName];
  if (prefixes) {
    matching = allLocations.filter(loc =>
      prefixes.some(prefix => loc.startsWith(prefix) || loc === prefix)
    );
  }

  // Standard match: locations that start with the system name
  if (matching.length === 0) {
    matching = allLocations.filter(loc => {
      if (loc === systemName) return true;
      if (loc.startsWith(systemName + ' -')) return true;
      if (loc.startsWith(systemName + ' (')) return true;
      return false;
    });
  }

  if (matching.length > 0) {
    const offset = (date.getDate() + date.getMonth() + index) % matching.length;
    return matching[offset];
  }

  // Fallback: return the system name itself (may be a valid location name)
  return systemName;
}

/**
 * Legacy getLocationPool — kept for backward compatibility.
 * New code should use getSpecificLocationForSystem() instead.
 */
export const getLocationPool = (species: string, date: Date, month: number): string[] => {
  return [getSpecificLocationForSystem("Columbia River", date)];
};

export const enhanceLocationDetails = (location: string | undefined, species: string): string => {
  if (!location) return "Columbia River - Portland";
  return location;
};
