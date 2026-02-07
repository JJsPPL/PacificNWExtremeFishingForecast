
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
  runForecast?: string; // Salmon run forecast data for current year
  tideInfo?: string;  // Added tide information
  bookReference?: string;  // Added for book references
}

export interface FishingForecast {
  date: Date;
  rating: number;
  moonPhase: string;
  moonRising?: boolean;  // Kept for backward compatibility
  moonPosition: string;  // Changed from moonRising to more detailed position
  barometricPressure: number;
  pressureTrend: string;
  tideData?: {       // Added tide data structure
    highTide?: string;
    lowTide?: string;
    slackTide?: string;
    currentDirection?: string; // incoming/outgoing
  };
  salmonRunStatus?: string; // Added salmon run status
  recommendations: FishingRecommendation[];
  // Enhanced fields from live API + scoring engine
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
  isDuplicate?: boolean; // Added this property to fix TypeScript errors
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

// Moon positions
export enum MoonPosition {
  Overhead = "Moon Overhead",
  Rising = "Moon Rising",
  Setting = "Moon Setting",
  Underfoot = "Moon Underfoot"
}

// Tide states
export enum TideState {
  HighTide = "High Tide",
  LowTide = "Low Tide",
  SlackTide = "Slack Tide",
  IncomingTide = "Incoming Tide",
  OutgoingTide = "Outgoing Tide"
}
