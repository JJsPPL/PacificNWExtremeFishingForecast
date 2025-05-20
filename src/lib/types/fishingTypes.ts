
import { Dispatch, SetStateAction } from "react";

// Types for our fishing forecast data
export interface FishingRecommendation {
  species: string;
  location: string;
  tactics: string;
  bait?: string;
  waterConditions?: string;
  bestTime?: string;
  tideInfo?: string;  // Added tide information
  bookReference?: string;  // Added for book references
}

export interface FishingForecast {
  date: Date;
  rating: number;
  moonPhase: string;
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
