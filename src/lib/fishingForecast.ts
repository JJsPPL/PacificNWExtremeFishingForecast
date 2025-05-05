
import { addDays, format, isSameDay } from "date-fns";

// Types for our fishing forecast data
export interface FishingRecommendation {
  species: string;
  location: string;
  tactics: string;
  bait?: string;
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

// List of fish species in the PNW
const PNW_FISH_SPECIES = [
  "Chinook Salmon (King)",
  "Coho Salmon (Silver)",
  "Sockeye Salmon (Red)",
  "Pink Salmon (Humpy)",
  "Chum Salmon (Dog)",
  "Steelhead",
  "Halibut",
  "Lingcod",
  "Dungeness Crab",
  "Shrimp"
];

// List of popular fishing locations
const FISHING_LOCATIONS = {
  washington: [
    "Puget Sound",
    "Hood Canal",
    "Strait of Juan De Fuca",
    "San Juan Islands",
    "Columbia River",
    "Cowlitz River",
    "Lewis River",
    "Kalama River",
    "Wynoochee River",
    "Humptulips River",
    "Chehalis River"
  ],
  oregon: [
    "Columbia River",
    "Willamette River",
    "Sandy River",
    "Clackamas River",
    "Tillamook Bay",
    "Nehalem River",
    "Nestucca River",
    "Siletz River",
    "Alsea River",
    "Umpqua River"
  ]
};

// Fishing tactics based on species
const FISHING_TACTICS = {
  salmon: [
    "Trolling with flashers and herring",
    "Jigging with buzz bombs",
    "Drift fishing with eggs",
    "Bobber fishing with eggs",
    "Back-bouncing roe",
    "Plunking with Spin-N-Glo",
    "Float fishing with sand shrimp"
  ],
  steelhead: [
    "Drift fishing with eggs",
    "Swinging flies",
    "Float fishing with jigs",
    "Side drifting with yarn balls",
    "Casting spinners in pocket water"
  ],
  halibut: [
    "Jigging with large jigs",
    "Drift fishing with herring",
    "Weighted bait near bottom"
  ],
  crab: [
    "Pot fishing with chicken or turkey",
    "Ring nets in estuaries"
  ]
};

// Baits commonly used
const FISHING_BAITS = {
  salmon: ["Herring", "Anchovy", "Sand shrimp", "Eggs", "Prawns", "Spinners", "Plugs"],
  steelhead: ["Eggs", "Yarn", "Worms", "Jigs", "Spinners", "Flies"],
  bottomfish: ["Herring", "Squid", "Octopus", "Jigs"]
};

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

// Generate fishing recommendations based on conditions
const generateRecommendations = (
  date: Date, 
  rating: number, 
  moonPhase: string, 
  barometricPressure: number
): FishingRecommendation[] => {
  const month = date.getMonth();
  const recommendations: FishingRecommendation[] = [];
  
  // Number of recommendations based on rating
  const numRecommendations = rating >= 70 ? 3 : (rating >= 40 ? 2 : 1);
  
  // Seasonal species availability (simplified)
  let availableSpecies: string[] = [];
  
  // Winter (Dec-Feb): Winter steelhead, resident Chinook
  if (month === 11 || month === 0 || month === 1) {
    availableSpecies = ["Steelhead", "Chinook Salmon (resident)", "Dungeness Crab"];
  } 
  // Spring (Mar-May): Spring Chinook, early steelhead, halibut
  else if (month >= 2 && month <= 4) {
    availableSpecies = ["Chinook Salmon (Spring)", "Steelhead", "Halibut", "Lingcod"];
  }
  // Summer (Jun-Aug): Summer Chinook, sockeye, pink (odd years), coho
  else if (month >= 5 && month <= 7) {
    availableSpecies = [
      "Chinook Salmon (Summer)", 
      "Sockeye Salmon", 
      date.getFullYear() % 2 === 1 ? "Pink Salmon" : "Coho Salmon (early)",
      "Halibut",
      "Lingcod"
    ];
  }
  // Fall (Sep-Nov): Fall Chinook, coho, chum
  else {
    availableSpecies = ["Chinook Salmon (Fall)", "Coho Salmon", "Chum Salmon", "Dungeness Crab"];
  }
  
  // Generate unique recommendations
  for (let i = 0; i < numRecommendations; i++) {
    if (availableSpecies.length === 0) break;
    
    // Select a species
    const speciesIndex = (date.getDate() + i) % availableSpecies.length;
    const species = availableSpecies[speciesIndex];
    availableSpecies.splice(speciesIndex, 1); // Remove to avoid duplicates
    
    // Select appropriate location based on species and time of year
    let locationPool: string[];
    if (species.includes("Salmon") || species === "Steelhead") {
      // For salmon/steelhead - choose rivers in fall/winter, sound/ocean in summer
      if (month >= 5 && month <= 7) { // Summer
        locationPool = [...FISHING_LOCATIONS.washington.slice(0, 4)]; // Ocean/sound locations
      } else {
        locationPool = [
          ...FISHING_LOCATIONS.washington.slice(4), 
          ...FISHING_LOCATIONS.oregon
        ]; // River locations
      }
    } else if (species === "Halibut" || species === "Lingcod") {
      // Saltwater species
      locationPool = FISHING_LOCATIONS.washington.slice(0, 4);
    } else {
      // Crab, shrimp, etc.
      locationPool = ["Puget Sound", "Hood Canal", "Columbia River Estuary", "Tillamook Bay"];
    }
    
    const locationIndex = (date.getDate() * (i+1)) % locationPool.length;
    const location = locationPool[locationIndex];
    
    // Select appropriate tactics
    let tacticsPool: string[];
    if (species.includes("Salmon")) {
      tacticsPool = FISHING_TACTICS.salmon;
    } else if (species === "Steelhead") {
      tacticsPool = FISHING_TACTICS.steelhead;
    } else if (species === "Halibut" || species === "Lingcod") {
      tacticsPool = FISHING_TACTICS.halibut;
    } else {
      tacticsPool = FISHING_TACTICS.crab;
    }
    
    const tacticIndex = (date.getDate() * (i+2)) % tacticsPool.length;
    const tactics = tacticsPool[tacticIndex];
    
    // Select bait
    let baitPool: string[];
    if (species.includes("Salmon")) {
      baitPool = FISHING_BAITS.salmon;
    } else if (species === "Steelhead") {
      baitPool = FISHING_BAITS.steelhead;
    } else {
      baitPool = FISHING_BAITS.bottomfish;
    }
    
    const baitIndex = (date.getDate() * (i+3)) % baitPool.length;
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
