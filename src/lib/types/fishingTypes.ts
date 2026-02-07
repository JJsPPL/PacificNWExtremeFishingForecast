import { Dispatch, SetStateAction } from "react";

// Types for our fishing forecast data
export interface FishingRecommendation {
  species: string;
  location: string;
  tactics: string;
  bait?: string;
  waterConditions?: string;
  bestTime?: string;
  speciesScore?: number; // Species-specific fishing score 0-100
  runForecast?: string; // Salmon run forecast data for 2026
}

export interface FishingForecast {
  date: Date;
  rating: number;
  moonPhase: string;
  moonRising: boolean;
  barometricPressure: number;
  pressureTrend: string;
  recommendations: FishingRecommendation[];
  // Enhanced fields
  activityLevel?: string; // 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor'
  moonIllumination?: number;
  moonRiseTime?: string;
  moonOverhead?: string;
  isFirstQuarterWindow?: boolean;
  solunarRating?: string;
  majorPeriods?: { start: string; end: string }[];
  minorPeriods?: { start: string; end: string }[];
  pressureChangeRate?: number;
  temperature?: number;
  windSpeed?: number;
  cloudCover?: number;
  dataSource?: 'live' | 'cached' | 'simulated';
  lastUpdated?: string;
  scoringFactors?: {
    name: string;
    value: string;
    impact: 'positive' | 'neutral' | 'negative';
    points: number;
    description: string;
  }[];
}

// Moon phases used in calculations
export enum MoonPhase {
  New = "New Moon",
  WaxingCrescent = "Waxing Crescent",
  FirstQuarter = "First Quarter",
  WaxingGibbous = "Waxing Gibbous",
  Full = "Full Moon",
  WaningGibbous = "Waning Gibbous",
  LastQuarter = "Last Quarter",
  WaningCrescent = "Waning Crescent"
}
