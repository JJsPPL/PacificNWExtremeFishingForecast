
import { addDays, format, isSameDay } from "date-fns";
import { FishingForecast, FishingRecommendation, MoonPhase, MoonPosition, TideState } from "./types/fishingTypes";
import { generateRecommendations } from "./utils/recommendations";
import { fetchPressureData, fetchWeatherData, type PressureData, type WeatherData } from "./api/weatherApi";
import { getMoonData, getMoonFishingScore, type MoonData } from "./api/moonApi";
import { calculateFishingScore, type FishingScore } from "./api/fishingScoreEngine";
import { IS_DROUGHT_YEAR } from "./utils/recommendations/conditionUtils";

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

  // Determine moon position (more detailed than just rising) - from upstream
  let moonPosition: string;
  if (hourOfDay >= 11 && hourOfDay <= 13) {
    moonPosition = MoonPosition.Overhead;
  } else if (hourOfDay >= 0 && hourOfDay <= 2) {
    moonPosition = MoonPosition.Underfoot;
  } else if (hourOfDay >= 6 && hourOfDay <= 10) {
    moonPosition = MoonPosition.Rising;
  } else {
    moonPosition = MoonPosition.Setting;
  }

  // DROUGHT ADJUSTMENT: Apply rating penalty based on historic patterns
  // Similar to 2001, 2015, 2021 when precipitation was 50% of normal
  const month = date.getMonth();
  let droughtAdjustedRating = score.total;
  if (IS_DROUGHT_YEAR) {
    // Winter steelhead season - moderate impact (fish concentrated but harder to catch)
    if (month >= 11 || month <= 3) {
      droughtAdjustedRating -= 8; // 8-point penalty for low, clear water conditions
    }
    // Summer - severe impact expected (heat stress, potential closures)
    if (month >= 5 && month <= 8) {
      droughtAdjustedRating -= 15; // Significant penalty - similar to 2015 conditions
    }
    // Fall salmon - delayed runs expected
    if (month >= 8 && month <= 10) {
      droughtAdjustedRating -= 10; // Salmon staging in estuaries longer, waiting for rain
    }
  }
  // Ensure rating is between 0-100
  droughtAdjustedRating = Math.max(0, Math.min(100, droughtAdjustedRating));

  // Generate tide data based on the date (upstream feature)
  const tideHour = (date.getHours() + date.getDate()) % 12;
  const tideData = {
    highTide: `${(tideHour + 2) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour < 6 ? 'AM' : 'PM'}`,
    lowTide: `${(tideHour + 8) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour >= 6 ? 'AM' : 'PM'}`,
    slackTide: `${(tideHour + 5) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour < 6 ? 'AM' : 'PM'} & ${(tideHour + 11) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour >= 6 ? 'AM' : 'PM'}`,
    currentDirection: tideHour < 6 ? TideState.IncomingTide : TideState.OutgoingTide
  };

  // Generate salmon run status based on month (upstream feature)
  let salmonRunStatus: string;
  if (month === 2 || month === 3) { // March-April
    salmonRunStatus = "Early Spring Chinook beginning to enter the Columbia and Willamette systems. Fish counts increasing at Willamette Falls fish ladder and Bonneville Dam. Columbia River hatchery returns are the primary indicator of run strength.";
  } else if (month === 4) { // May
    salmonRunStatus = "Spring Chinook runs at peak in Columbia and Willamette river systems. Strong numbers reported passing Bonneville Dam and Willamette Falls fish ladder. Best fishing typically occurs 3-5 days after large count increases at dams.";
  } else if (month === 5) { // June
    salmonRunStatus = "Late Spring Chinook and early Summer Chinook runs active in Columbia system. Summer steelhead entering both Columbia and Willamette systems with increasing numbers at Bonneville Dam and Willamette Falls.";
  } else if (month === 6 || month === 7) { // July-August
    salmonRunStatus = "Summer Chinook and Sockeye runs at peak in Columbia River system. Summer steelhead passing Bonneville Dam and Willamette Falls. Coho beginning to stage in estuaries. Columbia River salmon counts typically precede Willamette system arrivals by 3-5 days.";
  } else if (month === 8) { // September
    salmonRunStatus = "Fall Chinook entering the Columbia system with strong numbers at Bonneville Dam. Fall Chinook beginning to appear in the Willamette and tributaries. Early Coho appearing in tributary mouths and lower river sections.";
  } else if (month >= 9 && month <= 10) { // October-November
    salmonRunStatus = "Fall Chinook and Coho runs at peak throughout Columbia and Willamette systems. Strong returns reported in Cowlitz, Lewis, and Willamette Rivers based on Columbia River tributary hatchery counts. Best fishing typically occurs within a week of peak dam passage.";
  } else if (month === 11 || month === 0) { // December-January
    salmonRunStatus = "Late Fall Chinook tapering off. Winter steelhead beginning their run into Columbia River tributaries, Willamette tributaries and coastal streams. Clackamas and Sandy rivers showing increasing winter steelhead counts.";
  } else if (month === 1) { // February
    salmonRunStatus = "Winter steelhead at peak run in Columbia and Willamette tributaries. Early Spring Chinook beginning to enter lower Columbia and Willamette systems. First arrivals at Bonneville Dam typically forecast the upcoming spring run strength.";
  } else {
    salmonRunStatus = "Pre-season preparation. Check WDFW, ODFW hatchery reports and dam counts for updated forecasts on Columbia and Willamette river systems.";
  }

  // Generate recommendations using the scoring engine rating
  const recommendations = generateRecommendations(date, droughtAdjustedRating, moonPhase, pressure.currentInHg);

  // Enhance recommendations with tide-specific information (upstream feature)
  const enhancedRecommendations = recommendations.map(rec => {
    // If Columbia River or Nestucca River locations, provide specific tide tactics
    if (rec.location && (rec.location.includes("Columbia River") || rec.location.includes("Nestucca River"))) {
      return {
        ...rec,
        tideInfo: rec.tideInfo || "Best fishing on outgoing tides and slack tides when changing from low to high. Focus on current seams and deeper holes."
      };
    }
    // If Willamette River location, provide specific tide-influenced tactics based on location
    else if (rec.location && rec.location.includes("Willamette River")) {
      // Lower Willamette has more tidal influence
      if (rec.location.includes("Portland") || rec.location.includes("Multnomah Channel")) {
        return {
          ...rec,
          tideInfo: rec.tideInfo || "Tidal influence extends to Oregon City Falls. Best fishing during the last two hours of outgoing tide and first hour of incoming tide in lower sections."
        };
      }
      // Middle and upper Willamette sections
      else {
        return {
          ...rec,
          tideInfo: rec.tideInfo || "Limited tidal influence. Focus on current breaks, confluence areas, and structure during stable river flows."
        };
      }
    }
    // If species is salmon or steelhead (excluding specific rivers with custom tactics)
    else if ((rec.species.includes("Salmon") || rec.species.includes("Steelhead")) &&
             !(rec.location && (rec.location.includes("Columbia River") ||
                              rec.location.includes("Nestucca River") ||
                              rec.location.includes("Willamette River")))) {
      return {
        ...rec,
        tideInfo: rec.tideInfo || "Fish during tide changes with particular attention to current breaks and structure."
      };
    }
    // If species is Lingcod or Rockfish, include tidal information relevant to these species
    else if (rec.species === "Lingcod" || rec.species === "Rockfish") {
      return {
        ...rec,
        tideInfo: rec.tideInfo || "Fish during slack tide or moderate current periods for better bottom contact. Target structure during tide changes."
      };
    }
    // If albacore tuna, include specific tide tactics for tuna
    else if (rec.species && rec.species.includes("Tuna")) {
      return {
        ...rec,
        tideInfo: rec.tideInfo || "Fish the last two hours of incoming tide and first hour of outgoing tide for optimal results."
      };
    }
    return rec;
  });

  return {
    date,
    rating: droughtAdjustedRating,
    moonPhase,
    moonRising,
    moonPosition,
    barometricPressure: pressure.currentInHg,
    pressureTrend: pressure.trend,
    tideData,
    salmonRunStatus,
    recommendations: enhancedRecommendations,
    // Enhanced fields from scoring engine
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
