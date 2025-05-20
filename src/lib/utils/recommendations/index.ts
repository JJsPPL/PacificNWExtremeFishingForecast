
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
  
  // Number of recommendations based on rating - increased for higher ratings
  const numRecommendations = rating >= 70 ? 6 : (rating >= 40 ? 4 : 3);
  
  // Seasonal species availability
  let availableSpecies: string[] = getSeasonalSpecies(month);
  
  // Priority species order (based on provided importance)
  const priorityOrder: { [key: string]: number } = {
    "Chinook Salmon (King)": 1,
    "Coho Salmon (Silver)": 2,
    "Chum Salmon (Dog)": 3,
    "Pink Salmon (Humpy)": 4,
    "Sockeye Salmon (Red)": 5,
    "Steelhead": 6,
    "Albacore Tuna": 7,
    "Halibut": 8,
    "Sturgeon": 9,
    "Lingcod": 10,
    "Black Sea Bass": 11,
    "Rockfish": 12
  };
  
  // Sort species by priority
  availableSpecies.sort((a, b) => {
    const priorityA = priorityOrder[a] || 100;
    const priorityB = priorityOrder[b] || 100;
    return priorityA - priorityB;
  });
  
  // Add seasonal-specific recommendations
  if (month === 11 || month === 0 || month === 1) {
    // Winter
    recommendations.push(...createWinterRecommendations(date));
  } else if (month >= 2 && month <= 4) {
    // Spring
    recommendations.push(...createSpringRecommendations(date));
    
    // Add Columbia-specific spring Chinook recommendation when hatchery counts are peaking
    if (month === 3 && date.getDate() > 10) { // April = peak spring Chinook
      recommendations.push({
        species: "Chinook Salmon (King)",
        location: "Columbia River - Bonneville Dam",
        tactics: "Trolling with flashers and herring, or pulling plugs in the deeper water below the dam",
        bait: "Herring with green/chartreuse flashers, sardine-wrapped K15/K16 Kwikfish",
        waterConditions: "Target areas with moderate current and depths of 15-30 feet. Spring Chinook hold in deeper water near structure and current breaks.",
        bestTime: "Early morning hours when boat traffic is minimal. Bonneville Dam counts show peak passage from mid-April through early May."
      });
    }
    
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
    
    // Add Cowlitz-specific spring Chinook recommendation when hatchery counts are peaking
    if (month === 3 && date.getDate() > 12) { // Mid-April = peak spring Chinook
      recommendations.push({
        species: "Chinook Salmon (King)",
        location: "Cowlitz River - Mission Bar",
        tactics: "Back-bouncing eggs or pulling plugs in deeper holes and current seams",
        bait: "Cured salmon eggs with shrimp oil, or sardine-wrapped K15 Kwikfish in copper/chartreuse",
        waterConditions: "Target areas with moderate current and depths of 6-15 feet. Spring Chinook hold in deeper water near structure.",
        bestTime: "Early morning hours. Cowlitz Salmon Hatchery data shows peak returns in mid to late April."
      });
    }
  } else if (month >= 5 && month <= 7) {
    // Summer - good time for tuna fishing off the coast
    if (date.getDate() % 4 <= 2) { // More frequently recommend tuna in summer (75% of days)
      recommendations.push({
        species: "Albacore Tuna",
        location: date.getDate() % 2 === 0 ? "Oregon Coast - 30-50 miles offshore" : "Washington Coast - 40-60 miles offshore",
        tactics: "Trolling with cedar plugs and clones at 6-7 knots. Watch for temperature breaks and bird activity.",
        bait: "Cedar plugs, tuna clones, and live anchovies when available",
        waterConditions: "Target offshore waters with temperatures between 58-64°F. Look for clean blue water and clear temperature breaks.",
        bestTime: "Early morning and late afternoon typically produce the best bite.",
        tideInfo: "Fish the last two hours of incoming tide and first hour of outgoing tide for optimal results."
      });
    }
    
    // Add Columbia-specific summer Chinook recommendation
    if (month === 6 && (date.getDate() % 3 === 0)) { // July, occasional recommendation
      recommendations.push({
        species: "Chinook Salmon (King)",
        location: "Columbia River - Bonneville Dam",
        tactics: "Trolling with flashers and herring in deeper channels, or pulling plugs along current seams",
        bait: "Herring with red/chartreuse flashers, K16 Kwikfish, or large spinners",
        waterConditions: "Target deeper holding water with temperatures between 58-64°F. Focus on current seams and structure.",
        bestTime: "Early morning hours. Bonneville Dam counts show peak summer Chinook passage from mid-June through July."
      });
    }
    
    // Add Cowlitz-specific summer steelhead recommendation
    if (month === 6 && (date.getDate() % 4 === 0)) { // July, occasional recommendation
      recommendations.push({
        species: "Steelhead",
        location: "Cowlitz River - Blue Creek",
        tactics: "Cast spinners upstream and retrieve through runs, or drift jigs under a float",
        bait: "Size 4 or 5 spinners in silver/blue, or pink/chartreuse jigs under a float",
        waterConditions: "Summer steelhead prefer moderate flows with water temperatures between 52-62°F.",
        bestTime: "Early morning hours when water temperatures are coolest. Cowlitz Salmon Hatchery shows peak summer steelhead returns in late June through July."
      });
    }
    
    recommendations.push(...createSummerRecommendations(date));
  } else {
    // Fall
    recommendations.push(...createFallRecommendations(date));
    
    // Add fall Coho recommendation for Columbia River system based on tributary counts
    if (month === 9 && date.getDate() > 10) { // October - peak of Coho migration
      recommendations.push({
        species: "Coho Salmon (Silver)",
        location: "Columbia River - Astoria",
        tactics: "Trolling with spinners or herring along current seams and near river mouths",
        bait: "Blue/silver spinners, cut-plug herring, or cured eggs",
        waterConditions: "Coho enter the system with increasing fall flows. Target slightly stained water with 2-4 feet of visibility.",
        bestTime: "Early morning hours, especially after rainfall has increased flows. Hatchery data indicates peak Coho returns in mid to late October."
      });
    }
    
    // Add fall Coho recommendation for Cowlitz River
    if (month === 9 && date.getDate() > 15) { // October - peak of Coho migration
      recommendations.push({
        species: "Coho Salmon (Silver)",
        location: "Cowlitz River - Blue Creek",
        tactics: "Drift fishing with cured eggs or casting spinners in areas with moderate current",
        bait: "Blue/silver or green/silver spinners, or cured eggs with blue dye",
        waterConditions: "Coho prefer water temperatures between 48-56°F with moderate visibility.",
        bestTime: "Morning hours, especially after rainfall has increased flows. Cowlitz Salmon Hatchery shows peak Coho returns in mid to late October."
      });
    }
  }
  
  // Generate unique recommendations
  while (recommendations.length < numRecommendations) {
    if (!availableSpecies || availableSpecies.length === 0) break;
    
    // Select a species (prioritizing salmon and steelhead)
    const speciesIndex = (date.getDate() + recommendations.length) % availableSpecies.length;
    const species = availableSpecies[speciesIndex];
    availableSpecies.splice(speciesIndex, 1); // Remove to avoid duplicates
    
    // Priority locations based on species - heavily prioritize Columbia River tributaries
    const locationPool = getLocationPool(species, date, month);
    
    // Prioritize high-value locations for salmon and steelhead
    let prioritizedLocationPool = [...locationPool];
    if (species.includes("Salmon") || species === "Steelhead") {
      // Priority order for salmon/steelhead locations - elevating tributary systems
      const locationPriority: { [key: string]: number } = {
        "Cowlitz River": 1, 
        "Lewis River": 2,
        "Kalama River": 3,
        "Columbia River": 4,
        "Willamette River": 5,
        "Nestucca River": 6,
        "Sandy River": 7,
        "Clackamas River": 8,
        "Miami River": 9,
        "Tillamook River": 10
      };
      
      // Sort locations by priority
      prioritizedLocationPool.sort((a, b) => {
        const getPriority = (loc: string) => {
          for (const key in locationPriority) {
            if (loc.includes(key)) return locationPriority[key];
          }
          return 100;
        };
        
        return getPriority(a) - getPriority(b);
      });
    }
    
    // Select from prioritized locations
    const locationIndex = (date.getDate() * (recommendations.length+1)) % prioritizedLocationPool.length;
    const location = prioritizedLocationPool[locationIndex];
    
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
