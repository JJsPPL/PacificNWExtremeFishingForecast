import { Dispatch, SetStateAction } from "react";

// Types for our fishing forecast data
export interface FishingRecommendation {
  species: string;
  location: string;
  tactics: string;
  bait?: string;
  waterConditions?: string;
  bestTime?: string;
}

export interface FishingForecast {
  date: Date;
  rating: number;
  moonPhase: string;
  moonRising: boolean;
  barometricPressure: number;
  pressureTrend: string;
  recommendations: FishingRecommendation[];
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
