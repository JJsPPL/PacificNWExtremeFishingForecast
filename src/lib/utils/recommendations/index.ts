
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
    
    // Add Willamette-specific spring Chinook recommendation when hatchery counts are peaking
    if (month === 3 && date.getDate() > 15) { // Second half of April = peak spring Chinook
      recommendations.push({
        species: "Chinook Salmon (King)",
        location: "Willamette River - Oregon City Falls",
        tactics: "Trolling with flashers and herring near the falls, focus on deeper holding water below the falls",
        bait: "Herring with green/chartreuse flashers, sardine-wrapped plugs",
        waterConditions: "Target areas with moderate current and depths of 15-30 feet. Spring Chinook hold in deeper water before ascending the fish ladder.",
        bestTime: "Early morning hours when boat traffic is minimal. Hatchery data shows peak passage at Willamette Falls from mid-April through early May."
      });
    }
  } else if (month >= 5 && month <= 7) {
    // Summer - good time for tuna fishing off the coast
    if (date.getDate() % 7 === 0) { // Occasionally recommend tuna in summer
      recommendations.push({
        species: "Albacore Tuna",
        location: date.getDate() % 2 === 0 ? "Oregon Coast - 30-50 miles offshore" : "Washington Coast - 40-60 miles offshore",
        tactics: "Trolling with cedar plugs and clones at 6-7 knots. Watch for temperature breaks and bird activity.",
        bait: "Cedar plugs, tuna clones, and live anchovies when available",
        waterConditions: "Target offshore waters with temperatures between 58-64°F. Look for clean blue water and clear temperature breaks.",
        bestTime: "Early morning and late afternoon typically produce the best bite."
      });
    }
    
    // Add Willamette-specific summer recommendation based on Columbia counts
    if (month === 6 && (date.getDate() % 4 === 0)) { // July, occasional recommendation
      recommendations.push({
        species: "Smallmouth Bass",
        location: "Willamette River - Newberg",
        tactics: "Cast crankbaits along rocky banks and drop-offs, or use soft plastics in deeper holes",
        bait: "Crankbaits, soft plastic tubes, or drop shot rigs with finesse worms",
        waterConditions: "Focus on rocky structure and current breaks. Smallmouth become more active as water temperatures reach 65-75°F.",
        bestTime: "Early morning and late evening for topwater action, midday in deeper water"
      });
    }
    
    recommendations.push(...createSummerRecommendations(date));
  } else {
    // Fall
    recommendations.push(...createFallRecommendations(date));
    
    // Add fall Coho recommendation for Willamette based on Columbia River tributary counts
    if (month === 9 && date.getDate() > 15) { // October - peak of Coho migration
      recommendations.push({
        species: "Coho Salmon (Silver)",
        location: "Willamette River - Multnomah Channel",
        tactics: "Trolling with spinners or herring in the deeper channel, focus on current breaks and eddies",
        bait: "Blue/silver spinners, cut-plug herring, or cured eggs",
        waterConditions: "Coho enter the system with increasing fall flows. Target slightly stained water with 2-4 feet of visibility.",
        bestTime: "Early morning hours, especially after rainfall has increased flows. Hatchery data from Columbia tributaries indicates peak Coho returns in mid to late October."
      });
    }
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
