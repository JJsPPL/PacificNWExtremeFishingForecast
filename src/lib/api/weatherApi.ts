// Real-time weather and barometric pressure data from Open-Meteo API (free, no key required)

interface PressureData {
  current: number; // hPa
  currentInHg: number;
  threeHoursAgo: number;
  twentyFourHoursAgo: number;
  trend: 'Rapidly Falling' | 'Falling' | 'Slowly Falling' | 'Stable' | 'Slowly Rising' | 'Rising' | 'Rapidly Rising';
  changeRate: number; // inHg per 3 hours
  hourlyHistory: { time: string; pressure: number }[];
}

interface WeatherData {
  temperature: number; // Fahrenheit
  windSpeed: number; // mph
  windDirection: number; // degrees
  cloudCover: number; // percent
  precipitation: number; // mm
  weatherCode: number;
  isDay: boolean;
}

interface LocationCoords {
  lat: number;
  lon: number;
  name: string;
}

// Key fishing locations with coordinates
export const LOCATION_COORDS: Record<string, LocationCoords> = {
  'Portland': { lat: 45.52, lon: -122.67, name: 'Portland, OR' },
  'Longview': { lat: 46.14, lon: -122.94, name: 'Longview, WA' },
  'Astoria': { lat: 46.19, lon: -123.83, name: 'Astoria, OR' },
  'Sequim': { lat: 48.08, lon: -123.10, name: 'Sequim, WA' },
  'Westport': { lat: 46.89, lon: -124.10, name: 'Westport, WA' },
  'Neah Bay': { lat: 48.37, lon: -124.62, name: 'Neah Bay, WA' },
  'Tillamook': { lat: 45.46, lon: -123.84, name: 'Tillamook, OR' },
  'Tacoma': { lat: 47.25, lon: -122.44, name: 'Tacoma, WA' },
  'Olympia': { lat: 47.04, lon: -122.90, name: 'Olympia, WA' },
  'Seattle': { lat: 47.61, lon: -122.33, name: 'Seattle, WA' },
  'Hoodsport': { lat: 47.40, lon: -123.14, name: 'Hoodsport, WA (Hood Canal)' },
  'ForkWA': { lat: 47.95, lon: -124.38, name: 'Forks, WA (Olympic Peninsula)' },
  'Kelso': { lat: 46.15, lon: -122.91, name: 'Kelso, WA (Cowlitz)' },
  'Newport': { lat: 44.64, lon: -124.05, name: 'Newport, OR' },
};

// Default location for forecast
const DEFAULT_LOCATION: LocationCoords = LOCATION_COORDS['Portland'];

// Convert hPa to inHg
const hpaToInHg = (hpa: number): number => +(hpa * 0.02953).toFixed(2);

// Cache for API responses (30 min cache)
const pressureCache: Map<string, { data: PressureData; timestamp: number }> = new Map();
const weatherCache: Map<string, { data: WeatherData; timestamp: number }> = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getCacheKey(lat: number, lon: number): string {
  return `${lat.toFixed(2)},${lon.toFixed(2)}`;
}

export async function fetchPressureData(location?: LocationCoords): Promise<PressureData> {
  const loc = location || DEFAULT_LOCATION;
  const cacheKey = getCacheKey(loc.lat, loc.lon);

  // Check cache
  const cached = pressureCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&hourly=pressure_msl,surface_pressure&past_hours=48&forecast_hours=24&timezone=America%2FLos_Angeles`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const json = await response.json();
    const times: string[] = json.hourly.time;
    const pressures: number[] = json.hourly.pressure_msl;

    // Find current hour index (closest to now)
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 13); // YYYY-MM-DDTHH
    let currentIdx = times.findIndex(t => t.startsWith(nowStr));
    if (currentIdx === -1) currentIdx = Math.max(0, times.length - 25); // fallback

    const currentPressure = pressures[currentIdx] || 1013.25;
    const threeHoursAgoIdx = Math.max(0, currentIdx - 3);
    const twentyFourHoursAgoIdx = Math.max(0, currentIdx - 24);

    const threeHoursAgo = pressures[threeHoursAgoIdx] || currentPressure;
    const twentyFourHoursAgo = pressures[twentyFourHoursAgoIdx] || currentPressure;

    // Calculate trend
    const changeInHg = hpaToInHg(currentPressure) - hpaToInHg(threeHoursAgo);
    const absChange = Math.abs(changeInHg);

    let trend: PressureData['trend'];
    if (absChange < 0.01) {
      trend = 'Stable';
    } else if (changeInHg < 0) {
      if (absChange > 0.06) trend = 'Rapidly Falling';
      else if (absChange > 0.02) trend = 'Falling';
      else trend = 'Slowly Falling';
    } else {
      if (absChange > 0.06) trend = 'Rapidly Rising';
      else if (absChange > 0.02) trend = 'Rising';
      else trend = 'Slowly Rising';
    }

    // Build hourly history (last 24 hours)
    const historyStart = Math.max(0, currentIdx - 24);
    const hourlyHistory = times.slice(historyStart, currentIdx + 1).map((time, i) => ({
      time,
      pressure: hpaToInHg(pressures[historyStart + i] || 1013.25),
    }));

    const data: PressureData = {
      current: currentPressure,
      currentInHg: hpaToInHg(currentPressure),
      threeHoursAgo,
      twentyFourHoursAgo,
      trend,
      changeRate: +changeInHg.toFixed(3),
      hourlyHistory,
    };

    pressureCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.warn('Failed to fetch pressure data, using fallback:', error);
    return getFallbackPressureData();
  }
}

export async function fetchWeatherData(location?: LocationCoords): Promise<WeatherData> {
  const loc = location || DEFAULT_LOCATION;
  const cacheKey = getCacheKey(loc.lat, loc.lon);

  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,cloud_cover,precipitation,weather_code,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const json = await response.json();
    const current = json.current;

    const data: WeatherData = {
      temperature: current.temperature_2m,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      cloudCover: current.cloud_cover,
      precipitation: current.precipitation,
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
    };

    weatherCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.warn('Failed to fetch weather data, using fallback:', error);
    return {
      temperature: 45,
      windSpeed: 8,
      windDirection: 225,
      cloudCover: 60,
      precipitation: 0,
      weatherCode: 3,
      isDay: true,
    };
  }
}

// Fallback when API is unavailable - uses seasonal estimates
function getFallbackPressureData(): PressureData {
  const now = new Date();
  const month = now.getMonth();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);

  // Seasonal base pressure (winter lower, summer higher)
  let basePressure: number;
  if (month >= 11 || month <= 1) basePressure = 1010; // Winter
  else if (month >= 5 && month <= 7) basePressure = 1019; // Summer
  else basePressure = 1014; // Spring/Fall

  // Add some variation based on day
  const variation = Math.sin(dayOfYear / 3.7) * 8;
  const pressure = basePressure + variation;

  return {
    current: pressure,
    currentInHg: hpaToInHg(pressure),
    threeHoursAgo: pressure + 1, // slight falling trend
    twentyFourHoursAgo: pressure + 3,
    trend: 'Slowly Falling',
    changeRate: -0.03,
    hourlyHistory: [],
  };
}

export type { PressureData, WeatherData, LocationCoords };
