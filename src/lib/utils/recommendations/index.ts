
import { FishingRecommendation } from "../../types/fishingTypes";
import { getSeasonalSpecies, createWinterRecommendations, createSpringRecommendations, createSummerRecommendations, createFallRecommendations } from "./seasonalUtils";
import { getLocationPool, enhanceLocationDetails } from "./locationUtils";
import { getTacticsForSpecies, getBaitForSpecies, enhanceTactics, enhanceBait } from "./tacticUtils";
import { generateWaterConditions, getBestTimeRecommendation } from "./conditionUtils";

// Generate fishing recommendations based on conditions
export const generateRecommendations = (
  date: Date, 
  rating: number, 
  moonPhase: string, 
  barometricPressure: number
): FishingRecommendation[] => {
  const month = date.getMonth();
  const recommendations: FishingRecommendation[] = [];
  
  // Number of recommendations based on rating
  const numRecommendations = rating >= 70 ? 4 : (rating >= 40 ? 3 : 2);
  
  // Seasonal species availability
  let availableSpecies: string[] = getSeasonalSpecies(month);
  
  // Add seasonal-specific recommendations
  if (month === 11 || month === 0 || month === 1) {
    // Winter
    recommendations.push(...createWinterRecommendations(date));
  } else if (month >= 2 && month <= 4) {
    // Spring
    recommendations.push(...createSpringRecommendations(date));
  } else if (month >= 5 && month <= 7) {
    // Summer
    recommendations.push(...createSummerRecommendations(date));
  } else {
    // Fall
    recommendations.push(...createFallRecommendations(date));
  }
  
  // Generate unique recommendations
  while (recommendations.length < numRecommendations) {
    if (!availableSpecies || availableSpecies.length === 0) break;
    
    // Select a species
    const speciesIndex = (date.getDate() + recommendations.length) % availableSpecies.length;
    const species = availableSpecies[speciesIndex];
    availableSpecies.splice(speciesIndex, 1); // Remove to avoid duplicates
    
    // Select appropriate location based on species and time of year
    const locationPool = getLocationPool(species, date, month);
    
    const locationIndex = (date.getDate() * (recommendations.length+1)) % locationPool.length;
    const location = locationPool[locationIndex];
    
    // Select appropriate tactics
    const tacticsPool = getTacticsForSpecies(species);
    
    const tacticIndex = (date.getDate() * (recommendations.length+2)) % tacticsPool.length;
    let tactics = tacticsPool[tacticIndex];
    
    // Enhance tactics with more detailed information
    tactics = enhanceTactics(tactics, species, location);
    
    // Select bait with detailed information
    const baitPool = getBaitForSpecies(species);
    
    const baitIndex = (date.getDate() * (recommendations.length+3)) % baitPool.length;
    let bait = baitPool[baitIndex];
    
    // Enhance bait recommendations
    bait = enhanceBait(bait, species, location);
    
    // Generate water conditions based on month and location
    const waterConditions = generateWaterConditions(location, month, date);
    
    // Get best time recommendation
    const bestTime = getBestTimeRecommendation(date);
    
    // Add recommendation with new fields
    recommendations.push({
      species,
      location: location || "Columbia River", // Provide fallback location
      tactics,
      bait,
      waterConditions,
      bestTime
    });
  }
  
  return recommendations;
};
