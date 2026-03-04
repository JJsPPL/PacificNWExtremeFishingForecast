// Enhanced fishing score engine modeled on tides4fishing.com methodology
// Multi-factor scoring: pressure, moon, season, species sensitivity, time-of-day

import type { PressureData } from './weatherApi';
import type { MoonData } from './moonApi';
import type { TideData } from './tidesApi';

export type FishActivityLevel = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';

export interface FishingScore {
  total: number; // 0-100
  activityLevel: FishActivityLevel;
  pressureScore: number;
  moonScore: number;
  seasonScore: number;
  timeOfDayScore: number;
  tideScore: number;
  factors: ScoreFactor[];
}

export interface ScoreFactor {
  name: string;
  value: string;
  impact: 'positive' | 'neutral' | 'negative';
  points: number;
  description: string;
}

// Species sensitivity to barometric pressure (multiplier)
export const SPECIES_PRESSURE_SENSITIVITY: Record<string, number> = {
  'Winter Steelhead': 1.30,
  'Summer Steelhead': 1.25,
  'Steelhead': 1.25,
  'Chinook Salmon (King)': 1.20,
  'Chinook Salmon (Spring)': 1.20,
  'Chinook Salmon (Summer)': 1.20,
  'Chinook Salmon (Fall)': 1.20,
  'Chinook Salmon (resident)': 1.15,
  'Coho Salmon (Silver)': 1.20,
  'Coho Salmon': 1.20,
  'Coho Salmon (early)': 1.15,
  'Sockeye Salmon (Red)': 1.15,
  'Sockeye Salmon': 1.15,
  'Pink Salmon (Humpy)': 1.10,
  'Pink Salmon': 1.10,
  'Chum Salmon (Dog)': 1.10,
  'Chum Salmon': 1.10,
  'Cutthroat Trout': 1.15,
  'Rainbow Trout': 1.15,
  'Brown Trout': 1.15,
  'Largemouth Bass': 1.20,
  'Smallmouth Bass': 1.15,
  'Sturgeon': 1.05,
  'Halibut': 0.90,
  'Lingcod': 0.95,
  'Rockfish': 1.00,
  'Black Sea Bass': 1.00,
  'Cabezon': 0.95,
  'Surfperch': 1.00,
  'Dungeness Crab': 0.80,
  'Shrimp': 0.80,
  'Flounder': 0.90,
  'Sole': 0.90,
  'Albacore Tuna': 0.85,
  'Bluefin Tuna': 0.85,
  'Shad': 1.00,
};

// A. Pressure Value Score (0-25 points)
function getPressureValueScore(pressureInHg: number): { score: number; description: string } {
  if (pressureInHg < 29.50) return { score: 5, description: 'Extreme low pressure - storm conditions' };
  if (pressureInHg < 29.65) return { score: 10, description: 'Low pressure - fishable but challenging' };
  if (pressureInHg < 29.80) return { score: 15, description: 'Good low pressure zone' };
  if (pressureInHg <= 30.20) return { score: 25, description: 'Optimal normal pressure range' };
  if (pressureInHg <= 30.50) return { score: 20, description: 'Moderate high pressure' };
  if (pressureInHg <= 30.80) return { score: 10, description: 'High pressure - fish may be sluggish' };
  return { score: 5, description: 'Extreme high pressure - poor conditions' };
}

// B. Pressure Trend Score (0-35 points) - THE most important factor
function getPressureTrendScore(trend: PressureData['trend'], changeRate: number): { score: number; description: string } {
  switch (trend) {
    case 'Rapidly Falling':
      return { score: 35, description: 'BEST trigger - pre-storm feeding frenzy! Fish sense approaching front' };
    case 'Falling':
      return { score: 30, description: 'Excellent - fish feeding aggressively before front arrives' };
    case 'Slowly Falling':
      return { score: 22, description: 'Good - gradual pressure drop triggering feeding activity' };
    case 'Stable':
      return { score: 15, description: 'Average - fish in predictable feeding patterns' };
    case 'Slowly Rising':
      return { score: 10, description: 'Below average - fish still adjusting post-front' };
    case 'Rising':
      return { score: 5, description: 'Poor - post-front recovery, fish lethargic' };
    case 'Rapidly Rising':
      return { score: 0, description: 'Worst conditions - fish disoriented and inactive' };
    default:
      return { score: 15, description: 'Stable conditions' };
  }
}

// C. Seasonal Score (0-25 points)
function getSeasonScore(month: number, species?: string): { score: number; description: string } {
  // General seasonal fishing quality for PNW
  const seasonalScores: Record<number, { score: number; description: string }> = {
    0: { score: 12, description: 'Winter - prime steelhead, crab season' },
    1: { score: 14, description: 'Late winter - steelhead peak, early spring planning' },
    2: { score: 18, description: 'Early spring - Spring Chinook arriving, lingcod opens' },
    3: { score: 22, description: 'Spring - Spring Chinook peak, halibut opening' },
    4: { score: 25, description: 'Late spring - excellent multi-species opportunities' },
    5: { score: 25, description: 'Early summer - peak salmon season begins' },
    6: { score: 23, description: 'Summer - sockeye, summer chinook, tuna offshore' },
    7: { score: 22, description: 'Late summer - fall chinook starting, tuna peak' },
    8: { score: 25, description: 'Early fall - Buoy 10, coho, fall chinook peak' },
    9: { score: 22, description: 'Fall - coho, chum, late chinook' },
    10: { score: 15, description: 'Late fall - winter steelhead beginning, crab opener' },
    11: { score: 12, description: 'Early winter - winter steelhead, dungeness crab' },
  };

  return seasonalScores[month] || { score: 15, description: 'Moderate fishing conditions' };
}

// D. Time of Day Score (0-15 points)
function getTimeOfDayScore(hour: number, moonOverheadHour?: number): { score: number; description: string } {
  // Dawn: 5-7am, Dusk: 5-7pm are prime
  // Moon overhead hour is also prime (user emphasis)
  let score = 0;
  let description = '';

  if (hour >= 5 && hour <= 7) {
    score = 15;
    description = 'Prime dawn fishing window';
  } else if (hour >= 17 && hour <= 19) {
    score = 13;
    description = 'Prime dusk fishing window';
  } else if (hour >= 7 && hour < 10) {
    score = 10;
    description = 'Good morning window';
  } else if (hour >= 15 && hour < 17) {
    score = 9;
    description = 'Good afternoon window';
  } else if (hour >= 10 && hour < 15) {
    score = 5;
    description = 'Midday - slower fishing expected';
  } else {
    score = 3;
    description = 'Night fishing - limited species active';
  }

  // Bonus if moon is overhead during this hour (user emphasis: "especially the hour when moon is directly above")
  if (moonOverheadHour !== undefined && Math.abs(hour - moonOverheadHour) <= 1) {
    score = Math.min(15, score + 5);
    description += ' + Moon directly overhead (prime feeding!)';
  }

  return { score, description };
}

// E. Tide Score (0-15 points)
function getTideScore(tideData: TideData | null | undefined): { score: number; description: string; value: string } {
  if (!tideData) {
    return { score: 7, description: 'No tide data available - neutral score applied', value: 'No data' };
  }

  if (tideData.isLastTwoHoursIncoming) {
    return { score: 15, description: 'PRIME: Last 2 hours of incoming tide - fish feeding aggressively!', value: 'Incoming (PRIME)' };
  }

  switch (tideData.currentState) {
    case 'incoming':
      return { score: 10, description: 'Incoming tide - bait and fish moving with current', value: 'Incoming' };
    case 'slack':
      return { score: 8, description: 'Slack tide - brief window, fish repositioning', value: 'Slack' };
    case 'outgoing':
      return { score: 5, description: 'Outgoing tide - slower fishing, fish retreating', value: 'Outgoing' };
    default:
      return { score: 7, description: 'Tide state unknown - neutral score', value: 'Unknown' };
  }
}

// Calculate overall fishing score
export function calculateFishingScore(
  pressure: PressureData,
  moon: MoonData,
  date: Date,
  species?: string,
  tideData?: TideData | null
): FishingScore {
  const factors: ScoreFactor[] = [];
  const hour = date.getHours();
  const month = date.getMonth();

  // 1. Pressure value score (0-25)
  const pressureValue = getPressureValueScore(pressure.currentInHg);
  factors.push({
    name: 'Barometric Pressure',
    value: `${pressure.currentInHg} inHg`,
    impact: pressureValue.score >= 15 ? 'positive' : pressureValue.score >= 10 ? 'neutral' : 'negative',
    points: pressureValue.score,
    description: pressureValue.description,
  });

  // 2. Pressure trend score (0-35) - MOST IMPORTANT
  const pressureTrend = getPressureTrendScore(pressure.trend, pressure.changeRate);
  factors.push({
    name: 'Pressure Trend',
    value: pressure.trend,
    impact: pressureTrend.score >= 22 ? 'positive' : pressureTrend.score >= 10 ? 'neutral' : 'negative',
    points: pressureTrend.score,
    description: pressureTrend.description,
  });

  // 3. Moon phase factor
  let moonScore = 0;
  if (moon.isFirstQuarterWindow) {
    moonScore = 20;
    factors.push({
      name: 'Moon Phase',
      value: `${moon.phaseName} (First Quarter Window!)`,
      impact: 'positive',
      points: 20,
      description: 'PRIME fishing window - 3 days leading into First Quarter moon',
    });
  } else if (moon.phase === 'new' || moon.phase === 'full') {
    moonScore = 16;
    factors.push({
      name: 'Moon Phase',
      value: moon.phaseName,
      impact: 'positive',
      points: 16,
      description: 'Strong gravitational pull triggers fish feeding activity',
    });
  } else {
    moonScore = 8;
    factors.push({
      name: 'Moon Phase',
      value: moon.phaseName,
      impact: 'neutral',
      points: 8,
      description: `${moon.illumination}% illumination - moderate solunar influence`,
    });
  }

  // 4. Solunar periods bonus
  const solunarBonus = moon.solunarRating === 'Excellent' ? 5 :
    moon.solunarRating === 'Very Good' ? 4 :
    moon.solunarRating === 'Good' ? 3 : 1;
  factors.push({
    name: 'Solunar Activity',
    value: moon.solunarRating,
    impact: solunarBonus >= 4 ? 'positive' : 'neutral',
    points: solunarBonus,
    description: `Major periods: ${moon.majorPeriods.map(p => `${p.start}-${p.end}`).join(', ')}`,
  });

  // 5. Season score (0-25)
  const season = getSeasonScore(month, species);
  factors.push({
    name: 'Season',
    value: getSeasonName(month),
    impact: season.score >= 20 ? 'positive' : season.score >= 12 ? 'neutral' : 'negative',
    points: season.score,
    description: season.description,
  });

  // 6. Time of day (0-15)
  const moonOverheadMatch = moon.moonOverhead.match(/(\d+):(\d+) (AM|PM)/);
  let moonOverheadHour: number | undefined;
  if (moonOverheadMatch) {
    moonOverheadHour = parseInt(moonOverheadMatch[1]);
    if (moonOverheadMatch[3] === 'PM' && moonOverheadHour !== 12) moonOverheadHour += 12;
    if (moonOverheadMatch[3] === 'AM' && moonOverheadHour === 12) moonOverheadHour = 0;
  }
  const timeScore = getTimeOfDayScore(hour, moonOverheadHour);
  factors.push({
    name: 'Time of Day',
    value: formatTimeOfDay(hour),
    impact: timeScore.score >= 10 ? 'positive' : timeScore.score >= 5 ? 'neutral' : 'negative',
    points: timeScore.score,
    description: timeScore.description,
  });

  // 7. Tide score (0-15) - NEW
  const tide = getTideScore(tideData);
  factors.push({
    name: 'Tides',
    value: tide.value,
    impact: tide.score >= 10 ? 'positive' : tide.score >= 7 ? 'neutral' : 'negative',
    points: tide.score,
    description: tide.description,
  });

  // Calculate raw total (max: 25+35+20+5+25+15+15 = 140)
  const pressureScore = pressureValue.score + pressureTrend.score;
  const totalMoonScore = moonScore + solunarBonus;
  const rawTotal = pressureScore + totalMoonScore + season.score + timeScore.score + tide.score;

  // Apply species sensitivity modifier if provided
  let total = rawTotal;
  if (species) {
    const sensitivity = SPECIES_PRESSURE_SENSITIVITY[species] || 1.0;
    // Only apply sensitivity to pressure component
    const adjustedPressure = pressureScore * sensitivity;
    total = adjustedPressure + totalMoonScore + season.score + timeScore.score + tide.score;
  }

  // Normalize to 0-100 scale (max possible raw is ~140 with tide factor)
  total = Math.min(100, Math.max(0, Math.round((total / 140) * 100)));

  // Determine activity level
  let activityLevel: FishActivityLevel;
  if (total >= 80) activityLevel = 'Excellent';
  else if (total >= 65) activityLevel = 'Very Good';
  else if (total >= 45) activityLevel = 'Good';
  else if (total >= 25) activityLevel = 'Fair';
  else activityLevel = 'Poor';

  return {
    total,
    activityLevel,
    pressureScore: Math.round((pressureScore / 60) * 100),
    moonScore: Math.round((totalMoonScore / 25) * 100),
    seasonScore: Math.round((season.score / 25) * 100),
    timeOfDayScore: Math.round((timeScore.score / 15) * 100),
    tideScore: Math.round((tide.score / 15) * 100),
    factors,
  };
}

function getSeasonName(month: number): string {
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Fall';
  return 'Winter';
}

function formatTimeOfDay(hour: number): string {
  if (hour >= 5 && hour < 8) return 'Dawn';
  if (hour >= 8 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 14) return 'Midday';
  if (hour >= 14 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 20) return 'Dusk';
  return 'Night';
}
