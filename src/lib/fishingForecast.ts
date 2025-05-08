
import { addDays, format, isSameDay } from "date-fns";
import { FishingForecast, FishingRecommendation, MoonPhase } from "./types/fishingTypes";
import { generateRecommendations } from "./utils/recommendations";

// Generate mock data for a fishing forecast
export const getForecastForDate = (date: Date): FishingForecast => {
  // Create deterministic "random" value based on the date
  const dateValue = date.getDate() + (date.getMonth() * 31);
  const randomSeed = dateValue * 13 % 100;
  
  // Determine moon phase (simplified calculation)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
  const moonCycle = dayOfYear % 29.5; // Approximate lunar cycle
  
  let moonPhase: string;
  let moonBonus = 0;
  
  if (moonCycle < 1) {
    moonPhase = MoonPhase.New;
    moonBonus = 10;
  } else if (moonCycle < 7.4) {
    moonPhase = MoonPhase.WaxingCrescent;
    moonBonus = 15;
  } else if (moonCycle < 8.4) {
    moonPhase = MoonPhase.FirstQuarter;
    moonBonus = 25; // Bonus for first quarter (very prime)
  } else if (moonCycle < 14.8) {
    moonPhase = MoonPhase.WaxingGibbous;
    moonBonus = 15;
  } else if (moonCycle < 16.8) {
    moonPhase = MoonPhase.Full;
    moonBonus = 20;
  } else if (moonCycle < 22.1) {
    moonPhase = MoonPhase.WaningGibbous;
    moonBonus = 10;
  } else if (moonCycle < 23.1) {
    moonPhase = MoonPhase.LastQuarter;
    moonBonus = 15;
  } else {
    moonPhase = MoonPhase.WaningCrescent;
    moonBonus = 5;
  }
  
  // Add extra bonus for 3 days leading to first quarter
  if (moonCycle >= 4.4 && moonCycle < 7.4) {
    moonBonus += 15; // Three days leading to first quarter
  }
  
  // Determine if moon is rising (simplified)
  const hourOfDay = date.getHours();
  const moonRising = hourOfDay >= 12 && hourOfDay <= 24; // Simplification: moon rises in evening
  if (moonRising) {
    moonBonus += 10; // Bonus for moon rising
  }
  
  // Calculate barometric pressure (simplified simulation)
  const baseBarometricPressure = 29.92; // Standard sea level pressure
  const pressureVariation = (Math.sin(dateValue / 5) * 0.5); // Simulated variation
  const barometricPressure = +(baseBarometricPressure + pressureVariation).toFixed(2);
  
  // Determine pressure trend
  let pressureTrend = "Stable";
  let pressureBonus = 0;
  
  if (pressureVariation < -0.1) {
    pressureTrend = "Falling";
    pressureBonus = 15;
    
    // Extra bonus for low and falling pressure
    if (barometricPressure < 29.7) {
      pressureBonus += 15;
    }
  } else if (pressureVariation > 0.1) {
    pressureTrend = "Rising";
    pressureBonus = 5;
  } else {
    pressureTrend = "Stable";
    pressureBonus = 10;
  }
  
  // Calculate base rating from random seed
  let baseRating = 30 + (randomSeed % 20);
  
  // Add bonuses
  let rating = baseRating + moonBonus + pressureBonus;
  
  // Seasonal adjustments (simplified)
  const month = date.getMonth();
  
  // Spring and fall are generally better fishing seasons
  if (month >= 3 && month <= 5) { // Spring
    rating += 10;
  } else if (month >= 8 && month <= 10) { // Fall
    rating += 15;
  } else if (month >= 11 || month <= 1) { // Winter
    rating -= 5;
  }
  
  // Ensure rating is between 0-100
  rating = Math.max(0, Math.min(100, rating));
  
  // Generate recommendations based on season, location, and conditions
  const recommendations = generateRecommendations(date, rating, moonPhase, barometricPressure);
  
  return {
    date,
    rating: Math.round(rating),
    moonPhase,
    moonRising,
    barometricPressure,
    pressureTrend,
    recommendations
  };
};
