
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
  "Shrimp",
  "Sturgeon",
  "Smallmouth Bass",
  "Largemouth Bass",
  "Cutthroat Trout",
  "Rainbow Trout",
  "Brown Trout"
];

// Enhanced list of popular fishing locations
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
    "Chehalis River",
    "Willapa Bay",
    "Grays Harbor",
    "Washougal River",
    "Wind River",
    "Skagit River",
    "Snohomish River",
    "Yakima River"
  ],
  oregon: [
    "Columbia River",
    "Willamette River",
    "Sandy River",
    "Clackamas River",
    "Tillamook Bay",
    "Nehalem River",
    // Enhanced Nestucca River Information
    "Nestucca River - First Bridge",
    "Nestucca River - Three Rivers",
    "Nestucca River - Blaine",
    "Nestucca River - Beaver",
    "Nestucca River - Farmer Creek",
    "Nestucca River - Hebo",
    "Nestucca River - Cloverdale",
    // Enhanced Columbia River Tributaries
    "Deschutes River",
    "John Day River",
    "Umatilla River",
    "Grande Ronde River",
    "Hood River",
    "Siletz River",
    "Alsea River",
    "Umpqua River",
    "Rogue River",
    "Chetco River",
    "Siuslaw River",
    "Yaquina River",
    "Salmon River"
  ]
};

// Extended fishing tactics based on species
const FISHING_TACTICS = {
  salmon: [
    "Trolling with flashers and herring",
    "Jigging with buzz bombs",
    "Drift fishing with eggs",
    "Bobber fishing with eggs",
    "Back-bouncing roe",
    "Plunking with Spin-N-Glo",
    "Float fishing with sand shrimp",
    "Pulling plugs in deep holes",
    "Side drifting with yarn balls",
    "Trolling with Cut Plug herring",
    "Trolling with hoochies",
    "Backtrolling with Kwikfish",
    "Backtrolling with sardine-wrapped plugs",
    "Casting spinners in tailouts",
    "Fishing tidewater with herring"
  ],
  steelhead: [
    "Drift fishing with eggs",
    "Swinging flies",
    "Float fishing with jigs",
    "Side drifting with yarn balls",
    "Casting spinners in pocket water",
    "Plunking with Spin-N-Glo in high water",
    "Bobber dogging with beads",
    "Float fishing with prawns",
    "Run-and-gun with spoons",
    "Swinging intruder patterns on sink tips",
    "Nymphing with stonefly patterns",
    "High-sticking pocket water"
  ],
  halibut: [
    "Jigging with large jigs",
    "Drift fishing with herring",
    "Weighted bait near bottom",
    "Trolling with heavy spreader bars",
    "Bouncing scented squid"
  ],
  trout: [
    "Dry fly fishing",
    "Nymphing with indicators",
    "Euro nymphing",
    "Streamer fishing",
    "Spinner casting",
    "Spoon casting",
    "Bait fishing with worms",
    "Trolling with wedding rings",
    "Trolling with flashers and worms"
  ],
  bass: [
    "Drop shotting soft plastics",
    "Crankbait fishing around structure",
    "Topwater at dawn and dusk",
    "Jerkbait fishing in clear water",
    "Jig fishing around rocks",
    "Carolina rig in deeper water",
    "Spinnerbait in murky water"
  ],
  crab: [
    "Pot fishing with chicken or turkey",
    "Ring nets in estuaries",
    "Baiting with fish carcasses",
    "Night fishing with lanterns"
  ],
  sturgeon: [
    "Bottom fishing with smelt",
    "Bottom fishing with sand shrimp",
    "Bottom fishing with lamprey",
    "Anchoring in deep holes",
    "Fishing mudlines during tide changes"
  ]
};

// Enhanced baits commonly used
const FISHING_BAITS = {
  salmon: ["Herring", "Anchovy", "Sand shrimp", "Eggs", "Prawns", "Spinners", "Plugs", "Cured eggs", "Sardine-wrapped plugs", "Tuna belly", "Sardines"],
  steelhead: ["Eggs", "Yarn", "Worms", "Jigs", "Spinners", "Flies", "Beads", "Prawns", "Corkies", "Shrimp"],
  bottomfish: ["Herring", "Squid", "Octopus", "Jigs", "Anchovies", "Clams", "Sand shrimp"],
  trout: ["Worms", "Powerbait", "Corn", "Spinners", "Spoons", "Flies", "Eggs", "Mealworms", "Maggots", "Nightcrawlers"],
  bass: ["Soft plastics", "Crankbaits", "Topwater lures", "Spinnerbaits", "Jigs", "Swimbaits", "Frogs", "Crawfish imitations"],
  sturgeon: ["Smelt", "Sand shrimp", "Lamprey", "Squid", "Herring", "Anchovies", "Salmon eggs", "Crawfish", "Pikeminnow"]
};

// Oregon peak fishing seasons by river system
const OREGON_RIVER_SEASONS = {
  "Nestucca River": {
    "Winter Steelhead": { start: 11, end: 2 }, // Dec-Mar
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Fall Chinook": { start: 7, end: 10 },     // Aug-Nov
    "Summer Steelhead": { start: 5, end: 7 },  // Jun-Aug
    "Coho Salmon": { start: 8, end: 11 }       // Sep-Dec
  },
  "Columbia River": {
    "Spring Chinook": { start: 2, end: 4 },    // Mar-May
    "Summer Chinook": { start: 5, end: 6 },    // Jun-Jul
    "Fall Chinook": { start: 7, end: 9 },      // Aug-Oct
    "Coho Salmon": { start: 7, end: 10 },      // Aug-Nov
    "Sockeye": { start: 5, end: 6 },           // Jun-Jul
    "Steelhead": { start: 5, end: 9 },         // Jun-Oct
    "Sturgeon": { start: 4, end: 8 }           // May-Sep
  }
};

// Enhanced description of fishing locations
const LOCATION_DETAILS = {
  "Nestucca River - First Bridge": "Access point with deep holes just downstream. Good for winter steelhead and fall Chinook.",
  "Nestucca River - Three Rivers": "Confluence area with added water volume. Excellent holding water for steelhead.",
  "Nestucca River - Blaine": "Series of riffles and pools. Great for drift fishing or fly fishing.",
  "Nestucca River - Beaver": "Boat ramp access with long drifts downstream. Prime spring Chinook water.",
  "Nestucca River - Farmer Creek": "Natural pinch point that concentrates fish. Good in high water conditions.",
  "Nestucca River - Hebo": "Public access with classic steelhead runs. Works well during winter months.",
  "Nestucca River - Cloverdale": "Tidewater section with sloughs and deeper channels. Great for bobber fishing.",
  "Columbia River": "Massive system with numerous salmon runs. Fish different sections based on season."
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

// Additional Oregon-specific information for remarkable locations
const OREGON_HOTSPOTS = {
  "Nestucca River": [
    "Known for some of the best winter steelhead fishing in Oregon",
    "Hatchery releases enhance both winter and summer steelhead returns",
    "Fall Chinook typically arrive in September and peak in November",
    "Best access points include Three Rivers, First Bridge, and Cloverdale",
    "Bobber and jig or bobber and bait work exceptionally well in the slower, deeper sections"
  ],
  "Columbia River": [
    "The largest river system in the PNW with multiple salmon and steelhead runs",
    "Buoy 10 fishery near the mouth is famous for fall salmon",
    "The Gorge section offers excellent smallmouth bass fishing",
    "Sturgeon fishing is productive year-round, with seasonal retention periods",
    "Tributary mouths concentrate fish during migration periods"
  ]
};
