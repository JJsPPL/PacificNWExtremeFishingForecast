// NOAA CO-OPS Tides API client for Pacific NW fishing forecast
// Free API, no key required - https://api.tidesandcurrents.noaa.gov/api/prod/datagetter

export interface TidePrediction {
  time: string;  // ISO string
  height: number; // feet
  type: 'H' | 'L'; // High or Low
}

export interface TideData {
  predictions: TidePrediction[];
  nextHighTide: string | null;
  nextLowTide: string | null;
  currentState: 'incoming' | 'outgoing' | 'slack' | 'unknown';
  isLastTwoHoursIncoming: boolean; // PRIME fishing per user
  stationId: string;
  stationName: string;
}

// NOAA raw response shape
interface NOAAResponse {
  predictions: Array<{
    t: string;   // "2024-01-15 06:23"
    v: string;   // "7.2"
    type: string; // "H" or "L"
  }>;
}

// --- NOAA CO-OPS tide stations for Pacific Northwest ---

const NOAA_TIDE_STATIONS: Record<string, { id: string; name: string }> = {
  'Astoria': { id: '9439040', name: 'Astoria, OR' },
  'Longview': { id: '9440422', name: 'Longview, WA' },
  'Westport': { id: '9441102', name: 'Westport, WA' },
  'Neah Bay': { id: '9443090', name: 'Neah Bay, WA' },
  'Port Angeles': { id: '9444090', name: 'Port Angeles, WA' },
  'Port Townsend': { id: '9444900', name: 'Port Townsend, WA' },
  'Seattle': { id: '9447130', name: 'Seattle, WA' },
  'Tacoma': { id: '9446484', name: 'Tacoma, WA' },
  'Olympia': { id: '9446969', name: 'Olympia, WA' },
  'Hoodsport': { id: '9445133', name: 'Hoodsport, WA' },
  'Anacortes': { id: '9448558', name: 'Anacortes, WA' },
  'Bellingham': { id: '9449211', name: 'Bellingham, WA' },
  'Friday Harbor': { id: '9449880', name: 'Friday Harbor, WA' },
  'Garibaldi': { id: '9437540', name: 'Garibaldi, OR' },
  'Newport': { id: '9435380', name: 'Newport, OR' },
  'Charleston': { id: '9432780', name: 'Charleston, OR' },
  'Columbia River Mouth': { id: '9439040', name: 'Columbia River Mouth' },
};

// Map fishing location name substrings to the nearest tide station key
const LOCATION_TO_STATION: Array<{ pattern: string; station: string }> = [
  { pattern: 'Puget Sound', station: 'Seattle' },
  { pattern: 'Hood Canal', station: 'Hoodsport' },
  { pattern: 'San Juan', station: 'Friday Harbor' },
  { pattern: 'Juan De Fuca', station: 'Port Angeles' },
  { pattern: 'Sequim', station: 'Port Angeles' },
  { pattern: 'Neah Bay', station: 'Neah Bay' },
  { pattern: 'Westport', station: 'Westport' },
  { pattern: 'Ilwaco', station: 'Astoria' },
  { pattern: 'Columbia River', station: 'Astoria' },
  { pattern: 'Astoria', station: 'Astoria' },
  { pattern: 'Buoy 10', station: 'Astoria' },
  { pattern: 'Tillamook', station: 'Garibaldi' },
  { pattern: 'Wilson River', station: 'Garibaldi' },
  { pattern: 'Trask River', station: 'Garibaldi' },
  { pattern: 'Nestucca', station: 'Garibaldi' },
  { pattern: 'Newport', station: 'Newport' },
  { pattern: 'Yaquina', station: 'Newport' },
  { pattern: 'Depoe Bay', station: 'Newport' },
  { pattern: 'Siletz', station: 'Newport' },
  { pattern: 'Charleston', station: 'Charleston' },
  { pattern: 'Coos Bay', station: 'Charleston' },
  { pattern: 'Coquille', station: 'Charleston' },
  { pattern: 'Florence', station: 'Newport' },
  { pattern: 'Siuslaw', station: 'Newport' },
  { pattern: 'Umpqua', station: 'Charleston' },
  { pattern: 'Rogue', station: 'Charleston' },
  { pattern: 'Brookings', station: 'Charleston' },
  { pattern: 'Tacoma', station: 'Tacoma' },
  { pattern: 'Olympia', station: 'Olympia' },
  { pattern: 'Anacortes', station: 'Anacortes' },
  { pattern: 'Bellingham', station: 'Bellingham' },
  { pattern: 'Skagit', station: 'Anacortes' },
  { pattern: 'Samish', station: 'Bellingham' },
  { pattern: 'Port Townsend', station: 'Port Townsend' },
  { pattern: 'Edmonds', station: 'Seattle' },
  { pattern: 'Possession', station: 'Seattle' },
  { pattern: 'Elliott Bay', station: 'Seattle' },
  { pattern: 'Point No Point', station: 'Seattle' },
  { pattern: 'Bainbridge', station: 'Seattle' },
  { pattern: 'Kingston', station: 'Seattle' },
  { pattern: 'Blake Island', station: 'Tacoma' },
  { pattern: 'Manchester', station: 'Seattle' },
  { pattern: 'Dash Point', station: 'Tacoma' },
  { pattern: 'La Push', station: 'Neah Bay' },
  { pattern: 'Longview', station: 'Longview' },
];

// --- Cache (30-minute TTL, keyed by stationId + date) ---

const tideCache: Map<string, { data: TidePrediction[]; timestamp: number }> = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getTideCacheKey(stationId: string, date: Date): string {
  const dateStr = formatDateForNOAA(date);
  return `${stationId}_${dateStr}`;
}

// --- Helpers ---

/** Format a Date as YYYYMMDD for NOAA API params */
function formatDateForNOAA(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/** Parse NOAA time string "YYYY-MM-DD HH:MM" into a Date (local time) */
function parseNOAATime(t: string): Date {
  // NOAA returns "2024-01-15 06:23" in local time (lst_ldt)
  const [datePart, timePart] = t.split(' ');
  return new Date(`${datePart}T${timePart}:00`);
}

/** Format a Date into a readable time string like "6:23 AM" */
function formatTimeString(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

// --- Station lookup ---

/**
 * Find the nearest tide station for a given fishing location name.
 * Performs case-insensitive substring matching against LOCATION_TO_STATION patterns.
 * Falls back to 'Astoria' if no match is found.
 */
export function getNearestTideStation(locationName: string): { id: string; name: string } {
  const lowerName = locationName.toLowerCase();

  for (const entry of LOCATION_TO_STATION) {
    if (lowerName.includes(entry.pattern.toLowerCase())) {
      const station = NOAA_TIDE_STATIONS[entry.station];
      if (station) return station;
    }
  }

  // Default to Astoria (Columbia River / coastal fallback)
  return NOAA_TIDE_STATIONS['Astoria'];
}

// --- NOAA API fetch ---

/**
 * Fetch high/low tide predictions from NOAA CO-OPS for a given station and date.
 * Uses 30-minute cache. Returns parsed TidePrediction array or null on error.
 */
async function fetchTideData(stationId: string, date: Date): Promise<TidePrediction[] | null> {
  const cacheKey = getTideCacheKey(stationId, date);

  // Check cache
  const cached = tideCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const beginDate = formatDateForNOAA(date);
    // Fetch two days so we always have a next tide even near midnight
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDate = formatDateForNOAA(nextDay);

    const params = new URLSearchParams({
      begin_date: beginDate,
      end_date: endDate,
      station: stationId,
      product: 'predictions',
      datum: 'MLLW',
      time_zone: 'lst_ldt',
      interval: 'hilo',
      units: 'english',
      format: 'json',
      application: 'PacificNWFishingForecast',
    });

    const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NOAA API error: ${response.status}`);

    const json: NOAAResponse = await response.json();

    if (!json.predictions || !Array.isArray(json.predictions)) {
      console.warn('NOAA returned unexpected response shape:', json);
      return null;
    }

    const predictions: TidePrediction[] = json.predictions.map((p) => ({
      time: parseNOAATime(p.t).toISOString(),
      height: parseFloat(p.v),
      type: p.type as 'H' | 'L',
    }));

    // Cache the result
    tideCache.set(cacheKey, { data: predictions, timestamp: Date.now() });

    return predictions;
  } catch (error) {
    console.warn('Failed to fetch NOAA tide data:', error);
    return null;
  }
}

// --- Main exported function ---

/**
 * Get tide data for a fishing location on a given date.
 * Resolves the nearest NOAA station, fetches predictions, and computes
 * current tide state and the "last 2 hours incoming" prime-fishing flag.
 */
export async function getTideDataForLocation(
  locationName: string,
  date: Date
): Promise<TideData | null> {
  try {
    const station = getNearestTideStation(locationName);
    const predictions = await fetchTideData(station.id, date);

    if (!predictions || predictions.length === 0) {
      return null;
    }

    const now = date.getTime();

    // Find next high and low tides from current time
    let nextHighTide: TidePrediction | null = null;
    let nextLowTide: TidePrediction | null = null;
    let prevTide: TidePrediction | null = null;

    for (const p of predictions) {
      const pTime = new Date(p.time).getTime();

      // Track the most recent tide before now
      if (pTime <= now) {
        prevTide = p;
      }

      // Find first upcoming high tide
      if (!nextHighTide && p.type === 'H' && pTime > now) {
        nextHighTide = p;
      }

      // Find first upcoming low tide
      if (!nextLowTide && p.type === 'L' && pTime > now) {
        nextLowTide = p;
      }

      // Stop early once we have both
      if (nextHighTide && nextLowTide) break;
    }

    // Determine current tide state
    let currentState: TideData['currentState'] = 'unknown';

    if (prevTide && (nextHighTide || nextLowTide)) {
      if (prevTide.type === 'L') {
        // Previous was Low, so tide is incoming toward next High
        currentState = 'incoming';
      } else if (prevTide.type === 'H') {
        // Previous was High, so tide is outgoing toward next Low
        currentState = 'outgoing';
      }

      // Check for slack tide: within 15 minutes of a high or low prediction
      const SLACK_WINDOW = 15 * 60 * 1000; // 15 minutes
      const prevTime = new Date(prevTide.time).getTime();
      if (now - prevTime < SLACK_WINDOW) {
        currentState = 'slack';
      }
      if (nextHighTide) {
        const nextHTime = new Date(nextHighTide.time).getTime();
        if (nextHTime - now < SLACK_WINDOW) {
          currentState = 'slack';
        }
      }
      if (nextLowTide) {
        const nextLTime = new Date(nextLowTide.time).getTime();
        if (nextLTime - now < SLACK_WINDOW) {
          currentState = 'slack';
        }
      }
    }

    // Compute isLastTwoHoursIncoming: true if within 2 hours before the next high tide
    // This is PRIME fishing time per user specification
    let isLastTwoHoursIncoming = false;
    if (nextHighTide) {
      const nextHTime = new Date(nextHighTide.time).getTime();
      const twoHoursMs = 2 * 60 * 60 * 1000;
      const timeUntilHigh = nextHTime - now;
      if (timeUntilHigh > 0 && timeUntilHigh <= twoHoursMs && currentState === 'incoming') {
        isLastTwoHoursIncoming = true;
      }
    }

    // Determine station name for display
    // Look up from the NOAA_TIDE_STATIONS by id
    let stationName = station.name;
    for (const key of Object.keys(NOAA_TIDE_STATIONS)) {
      if (NOAA_TIDE_STATIONS[key].id === station.id) {
        stationName = NOAA_TIDE_STATIONS[key].name;
        break;
      }
    }

    return {
      predictions,
      nextHighTide: nextHighTide ? formatTimeString(new Date(nextHighTide.time)) : null,
      nextLowTide: nextLowTide ? formatTimeString(new Date(nextLowTide.time)) : null,
      currentState,
      isLastTwoHoursIncoming,
      stationId: station.id,
      stationName,
    };
  } catch (error) {
    console.warn('Failed to get tide data for location:', error);
    return null;
  }
}

/** Expose the stations map for UI dropdowns or debugging */
export { NOAA_TIDE_STATIONS };
