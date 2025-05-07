
import { FishingRecommendation } from "../types/fishingTypes";
import { FISHING_TACTICS, FISHING_BAITS } from "../constants/fishingSpecies";
import { FISHING_LOCATIONS } from "../constants/fishingLocations";

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
  
  // Seasonal species availability (simplified)
  let availableSpecies: string[] = [];
  
  // Winter (Dec-Feb): Winter steelhead, resident Chinook
  if (month === 11 || month === 0 || month === 1) {
    availableSpecies = ["Steelhead", "Chinook Salmon (resident)", "Dungeness Crab", "Sturgeon", "Cutthroat Trout"];
    
    // Special winter steelhead focus for Oregon rivers
    if (date.getDate() % 3 === 0) {
      recommendations.push({
        species: "Steelhead",
        location: "Nestucca River - Beaver",
        tactics: "Drift fishing with eggs or yarn balls in deeper slots"
      });
    }
  } 
  // Spring (Mar-May): Spring Chinook, early steelhead, halibut
  else if (month >= 2 && month <= 4) {
    availableSpecies = ["Chinook Salmon (Spring)", "Steelhead", "Halibut", "Lingcod", "Sturgeon"];
    
    // Special spring Chinook focus for Columbia River
    if (date.getDate() % 4 === 0) {
      recommendations.push({
        species: "Chinook Salmon (Spring)",
        location: "Columbia River",
        tactics: "Trolling with herring near deep channel edges. Target incoming tide for best results."
      });
    }
  }
  // Summer (Jun-Aug): Summer Chinook, sockeye, pink (odd years), coho
  else if (month >= 5 && month <= 7) {
    availableSpecies = [
      "Chinook Salmon (Summer)", 
      "Sockeye Salmon", 
      date.getFullYear() % 2 === 1 ? "Pink Salmon" : "Coho Salmon (early)",
      "Halibut",
      "Lingcod",
      "Smallmouth Bass",
      "Sturgeon"
    ];
    
    // Special summer steelhead focus for Nestucca
    if (date.getDate() % 3 === 1) {
      recommendations.push({
        species: "Summer Steelhead",
        location: "Nestucca River - Three Rivers",
        tactics: "Early morning with small spinners or flies in riffles and tailouts"
      });
    }
  }
  // Fall (Sep-Nov): Fall Chinook, coho, chum
  else {
    availableSpecies = ["Chinook Salmon (Fall)", "Coho Salmon", "Chum Salmon", "Dungeness Crab", "Cutthroat Trout"];
    
    // Special fall Chinook and coho focus for Oregon coastal rivers
    if (date.getDate() % 2 === 0) {
      recommendations.push({
        species: "Coho Salmon",
        location: "Nestucca River - Cloverdale",
        tactics: "Tidewater bobber fishing with eggs or spinners during the first push of tide"
      });
    }
  }
  
  // Generate unique recommendations
  while (recommendations.length < numRecommendations) {
    if (availableSpecies.length === 0) break;
    
    // Select a species
    const speciesIndex = (date.getDate() + recommendations.length) % availableSpecies.length;
    const species = availableSpecies[speciesIndex];
    availableSpecies.splice(speciesIndex, 1); // Remove to avoid duplicates
    
    // Select appropriate location based on species and time of year
    let locationPool: string[];
    
    // Enhanced location selection logic with focus on Oregon rivers
    if (species.includes("Salmon") || species === "Steelhead") {
      // For salmon/steelhead - choose rivers in fall/winter, sound/ocean in summer
      if (month >= 5 && month <= 7) { // Summer
        if (date.getDate() % 5 === 0) {
          // Focus on Oregon locations sometimes
          locationPool = FISHING_LOCATIONS.oregon.filter(loc => loc.includes("Nestucca") || loc.includes("Columbia"));
        } else {
          locationPool = [...FISHING_LOCATIONS.washington.slice(0, 4)]; // Ocean/sound locations
        }
      } else {
        // In non-summer months, increase focus on Oregon rivers
        if (date.getDate() % 3 === 0) {
          // Focus on Oregon locations
          locationPool = FISHING_LOCATIONS.oregon.filter(loc => loc.includes("Nestucca") || loc.includes("Columbia"));
        } else {
          locationPool = [
            ...FISHING_LOCATIONS.oregon,
            ...FISHING_LOCATIONS.washington.slice(4)
          ]; // River locations
        }
      }
    } else if (species === "Halibut" || species === "Lingcod") {
      // Saltwater species
      locationPool = FISHING_LOCATIONS.washington.slice(0, 4);
    } else if (species.includes("Bass")) {
      // Bass in Columbia River or its sloughs
      locationPool = ["Columbia River", "John Day River", "Umatilla River"];
    } else if (species === "Sturgeon") {
      // Sturgeon in deeper holes and channel edges
      locationPool = ["Columbia River", "Willamette River", "John Day River"];
    } else {
      // Crab, shrimp, etc.
      locationPool = ["Puget Sound", "Hood Canal", "Columbia River Estuary", "Tillamook Bay"];
    }
    
    const locationIndex = (date.getDate() * (recommendations.length+1)) % locationPool.length;
    const location = locationPool[locationIndex];
    
    // Select appropriate tactics
    let tacticsPool: string[];
    if (species.includes("Salmon")) {
      tacticsPool = FISHING_TACTICS.salmon;
    } else if (species === "Steelhead") {
      tacticsPool = FISHING_TACTICS.steelhead;
    } else if (species === "Halibut" || species === "Lingcod") {
      tacticsPool = FISHING_TACTICS.halibut;
    } else if (species.includes("Trout")) {
      tacticsPool = FISHING_TACTICS.trout;
    } else if (species.includes("Bass")) {
      tacticsPool = FISHING_TACTICS.bass;
    } else if (species === "Sturgeon") {
      tacticsPool = FISHING_TACTICS.sturgeon;
    } else {
      tacticsPool = FISHING_TACTICS.crab;
    }
    
    const tacticIndex = (date.getDate() * (recommendations.length+2)) % tacticsPool.length;
    const tactics = tacticsPool[tacticIndex];
    
    // Select bait
    let baitPool: string[];
    if (species.includes("Salmon")) {
      baitPool = FISHING_BAITS.salmon;
    } else if (species === "Steelhead") {
      baitPool = FISHING_BAITS.steelhead;
    } else if (species.includes("Trout")) {
      baitPool = FISHING_BAITS.trout;
    } else if (species.includes("Bass")) {
      baitPool = FISHING_BAITS.bass;
    } else if (species === "Sturgeon") {
      baitPool = FISHING_BAITS.sturgeon;
    } else {
      baitPool = FISHING_BAITS.bottomfish;
    }
    
    const baitIndex = (date.getDate() * (recommendations.length+3)) % baitPool.length;
    const bait = baitPool[baitIndex];
    
    // Add recommendation
    recommendations.push({
      species,
      location,
      tactics,
      bait
    });
  }
  
  return recommendations;
};
