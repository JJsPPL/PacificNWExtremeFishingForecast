
import { addDays, format, isSameDay } from "date-fns";
import { FishingForecast, FishingRecommendation, MoonPhase } from "./types/fishingTypes";
import { generateRecommendations } from "./utils/recommendations";
import { fetchPressureData, fetchWeatherData, type PressureData, type WeatherData } from "./api/weatherApi";
import { getMoonData, getMoonFishingScore, type MoonData } from "./api/moonApi";
import { calculateFishingScore, type FishingScore } from "./api/fishingScoreEngine";

// Cache for live data to avoid redundant API calls
let cachedPressure: { data: PressureData; timestamp: number } | null = null;
let cachedWeather: { data: WeatherData; timestamp: number } | null = null;
const LIVE_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Fetch live data (called on page load and periodically)
export async function fetchLiveData(): Promise<{ pressure: PressureData; weather: WeatherData }> {
  const now = Date.now();

  // Check cache
  if (cachedPressure && cachedWeather &&
    now - cachedPressure.timestamp < LIVE_CACHE_DURATION &&
    now - cachedWeather.timestamp < LIVE_CACHE_DURATION) {
    return { pressure: cachedPressure.data, weather: cachedWeather.data };
  }

  const [pressure, weather] = await Promise.all([
    fetchPressureData(),
    fetchWeatherData(),
  ]);

  cachedPressure = { data: pressure, timestamp: now };
  cachedWeather = { data: weather, timestamp: now };

  return { pressure, weather };
}

// Generate forecast with live data (async version for today/current)
export async function getLiveForecastForDate(date: Date): Promise<FishingForecast> {
  try {
    const { pressure, weather } = await fetchLiveData();
    const moon = getMoonData(date);
    const score = calculateFishingScore(pressure, moon, date);

    return buildForecast(date, pressure, weather, moon, score, 'live');
  } catch (error) {
    console.warn('Live data fetch failed, falling back to simulated:', error);
    return getForecastForDate(date);
  }
}

// Generate forecast with simulated data (sync version for calendar/historical dates)
export const getForecastForDate = (date: Date): FishingForecast => {
  const moon = getMoonData(date);
  const pressure = getSimulatedPressure(date);
  const score = calculateFishingScore(pressure, moon, date);

  return buildForecast(date, pressure, null, moon, score, 'simulated');
};

// Build the forecast object from computed data
function buildForecast(
  date: Date,
  pressure: PressureData,
  weather: WeatherData | null,
  moon: MoonData,
  score: FishingScore,
  dataSource: 'live' | 'cached' | 'simulated'
): FishingForecast {
  // Map moon phase name to MoonPhase enum
  const moonPhaseMap: Record<string, string> = {
    'New Moon': MoonPhase.New,
    'Waxing Crescent': MoonPhase.WaxingCrescent,
    'First Quarter': MoonPhase.FirstQuarter,
    'Waxing Gibbous': MoonPhase.WaxingGibbous,
    'Full Moon': MoonPhase.Full,
    'Waning Gibbous': MoonPhase.WaningGibbous,
    'Last Quarter': MoonPhase.LastQuarter,
    'Waning Crescent': MoonPhase.WaningCrescent,
  };

  const moonPhase = moonPhaseMap[moon.phaseName] || moon.phaseName;

  // Determine moon rising based on approximate calculation
  const hourOfDay = date.getHours();
  const moonRiseMatch = moon.moonRiseApprox.match(/(\d+):(\d+) (AM|PM)/);
  let moonRiseHour = 12;
  if (moonRiseMatch) {
    moonRiseHour = parseInt(moonRiseMatch[1]);
    if (moonRiseMatch[3] === 'PM' && moonRiseHour !== 12) moonRiseHour += 12;
    if (moonRiseMatch[3] === 'AM' && moonRiseHour === 12) moonRiseHour = 0;
  }
  const moonRising = hourOfDay >= moonRiseHour || hourOfDay < (moonRiseHour + 12) % 24;

  // Generate recommendations
  const recommendations = generateRecommendations(date, score.total, moonPhase, pressure.currentInHg);

  return {
    date,
    rating: score.total,
    moonPhase,
    moonRising,
    barometricPressure: pressure.currentInHg,
    pressureTrend: pressure.trend,
    recommendations,
    // Enhanced fields
    activityLevel: score.activityLevel,
    moonIllumination: moon.illumination,
    moonRiseTime: moon.moonRiseApprox,
    moonOverhead: moon.moonOverhead,
    isFirstQuarterWindow: moon.isFirstQuarterWindow,
    solunarRating: moon.solunarRating,
    majorPeriods: moon.majorPeriods,
    minorPeriods: moon.minorPeriods,
    pressureChangeRate: pressure.changeRate,
    temperature: weather?.temperature,
    windSpeed: weather?.windSpeed,
    cloudCover: weather?.cloudCover,
    dataSource,
    lastUpdated: new Date().toISOString(),
    scoringFactors: score.factors,
  };
}

// Simulated pressure for non-today dates (uses seasonal patterns)
function getSimulatedPressure(date: Date): PressureData {
  const month = date.getMonth();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const dateValue = date.getDate() + (month * 31);

  // Seasonal base pressure (winter lower, summer higher)
  let basePressureHpa: number;
  if (month >= 11 || month <= 1) basePressureHpa = 1010; // Winter
  else if (month >= 5 && month <= 7) basePressureHpa = 1019; // Summer
  else basePressureHpa = 1014; // Spring/Fall

  // Add realistic variation based on date
  const variation = Math.sin(dayOfYear / 3.7) * 8 + Math.cos(dateValue / 2.3) * 4;
  const pressureHpa = basePressureHpa + variation;
  const pressureInHg = +(pressureHpa * 0.02953).toFixed(2);

  // Calculate a simulated trend
  const prevVariation = Math.sin((dayOfYear - 0.125) / 3.7) * 8 + Math.cos((dateValue - 0.125) / 2.3) * 4;
  const prevPressureHpa = basePressureHpa + prevVariation;
  const changeInHg = +(pressureInHg - (prevPressureHpa * 0.02953)).toFixed(3);
  const absChange = Math.abs(changeInHg);

  let trend: PressureData['trend'];
  if (absChange < 0.01) trend = 'Stable';
  else if (changeInHg < 0) {
    if (absChange > 0.06) trend = 'Rapidly Falling';
    else if (absChange > 0.02) trend = 'Falling';
    else trend = 'Slowly Falling';
  } else {
    if (absChange > 0.06) trend = 'Rapidly Rising';
    else if (absChange > 0.02) trend = 'Rising';
    else trend = 'Slowly Rising';
  }

  return {
    current: pressureHpa,
    currentInHg: pressureInHg,
    threeHoursAgo: prevPressureHpa,
    twentyFourHoursAgo: basePressureHpa,
    trend,
    changeRate: changeInHg,
    hourlyHistory: [],
  };
}
