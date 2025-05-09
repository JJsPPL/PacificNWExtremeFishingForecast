import { FISHING_LOCATIONS, LOCATION_DETAILS } from "../../constants/fishingLocations";

// Functions for location selection and management
export const getLocationPool = (species: string, date: Date, month: number): string[] => {
  let locationPool: string[] = [];
  
  // Enhanced location selection logic with new locations
  if (species.includes("Salmon") || species.includes("Steelhead")) {
    // For salmon/steelhead - choose rivers in fall/winter, sound/ocean in summer
    if (month >= 5 && month <= 7) { // Summer
      if (date.getDate() % 5 === 0) {
        // Focus on Oregon locations sometimes
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Nestucca") || 
                 loc.includes("Columbia") || 
                 loc.includes("Willamette") || 
                 loc.includes("Sandy") || 
                 loc.includes("Clackamas") ||
                 loc.includes("Tillamook") ||
                 loc.includes("Trask") ||
                 loc.includes("Wilson") ||
                 loc.includes("Kilchis") ||
                 loc.includes("Miami"))
        );
      } else if (date.getDate() % 5 === 1) {
        // Sometimes focus on Sequim area
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => loc && loc.includes("Sequim"));
      } else if (date.getDate() % 5 === 2) {
        // Sometimes focus on Snake River
        const idahoLocations = FISHING_LOCATIONS.Idaho || [];
        locationPool = idahoLocations.filter(loc => loc && loc.includes("Snake"));
      } else if (date.getDate() % 5 === 3) {
        // Sometimes focus on Wynochee/Bogachiel system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Wynochee") || 
                loc.includes("Bogachiel") || 
                loc.includes("Sol Duc") || 
                loc.includes("Calawah"))
        );
      } else {
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.length >= 4 ? 
          [...washingtonLocations.slice(0, 4)] : 
          [...washingtonLocations]; // Ocean/sound locations
      }
    } else {
      // In non-summer months, give more weight to river locations
      const dayMod = date.getDate() % 9; // Changed from 8 to 9 to incorporate Olympic Peninsula rivers
      
      if (dayMod === 0) {
        // Focus on Oregon locations
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Nestucca") || 
                 loc.includes("Sandy") || 
                 loc.includes("Willamette") ||
                 loc.includes("Clackamas"))
        );
      } else if (dayMod === 1) {
        // Focus on Sequim and Olympic Peninsula
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Sequim") || loc === "Bogachiel River - Mouth")
        );
      } else if (dayMod === 2) {
        // Focus on Columbia River sections
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && loc.includes("Columbia")
        );
      } else if (dayMod === 3) {
        // Focus on Snake River
        const idahoLocations = FISHING_LOCATIONS.Idaho || [];
        locationPool = idahoLocations.filter(loc => 
          loc && loc.includes("Snake")
        );
      } else if (dayMod === 4) {
        // Focus on Tillamook River system
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Tillamook") || 
                 loc.includes("Trask") || 
                 loc.includes("Wilson") || 
                 loc.includes("Kilchis") ||
                 loc.includes("Miami"))
        );
      } else if (dayMod === 5) {
        // Focus on Wynochee River system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && loc.includes("Wynochee")
        );
      } else if (dayMod === 6) {
        // Focus on Bogachiel/Sol Duc/Calawah system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Bogachiel") || 
                loc.includes("Sol Duc") || 
                loc.includes("Calawah"))
        );
      } else if (species === "Coho Salmon" || species === "Winter Steelhead") {
        // Special rivers known for coho and winter steelhead
        locationPool = [
          "Cowlitz River", 
          "Cowlitz River - Blue Creek",
          "Cowlitz River - Mission Bar",
          "Lewis River", 
          "Kalama River",
          "Skagit River",
          "Skagit River - Rockport",
          "Skykomish River - Reiter Ponds",
          "Snohomish River",
          "Snohomish River - Pilchuck Mouth",
          "Sequim - Dungeness River",
          "Sandy River - Oxbow Park",
          "Clackamas River - McIver Park",
          "Willamette River - Falls",
          "Wilson River - Sollie Smith Bridge",
          "Trask River - Loren's Drift",
          "Kilchis River - Alderbrook",
          "Bogachiel River - Mouth",
          "Bogachiel River - Leyendecker Park",
          "Sol Duc River - Salmon Cascades",
          "Wynochee River - Black Creek"
        ];
      } else {
        // Make sure we have valid data before trying to use it
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        
        locationPool = [
          ...(oregonLocations || []),
          ...(washingtonLocations.length >= 4 ? washingtonLocations.slice(4) : (washingtonLocations || []))
        ]; // River locations
      }
    }
  } else if (species === "Halibut") {
    // Saltwater species - deeper water
    locationPool = [
      "Puget Sound", 
      "Hood Canal", 
      "Strait of Juan De Fuca",
      "Strait of Juan De Fuca - Neah Bay", 
      "Strait of Juan De Fuca - Port Angeles",
      "Strait of Juan De Fuca - Freshwater Bay",
      "San Juan Islands", 
      "Sequim - Discovery Bay", 
      "Tillamook Bay"
    ];
  } else if (species === "Lingcod" || species === "Rockfish" || species === "Black Sea Bass" || species === "Cabezon") {
    // Rocky habitat for lingcod and rockfish species
    locationPool = [
      "Puget Sound",
      "Puget Sound - Tacoma Narrows",
      "Puget Sound - Point No Point", 
      "Puget Sound - Jefferson Head",
      "Hood Canal",
      "Hood Canal - Point Whitney",
      "Hood Canal - Seabeck", 
      "Strait of Juan De Fuca", 
      "Strait of Juan De Fuca - Neah Bay",
      "Strait of Juan De Fuca - Sekiu",
      "Strait of Juan De Fuca - Pillar Point",
      "San Juan Islands",
      "San Juan Islands - Obstruction Pass",
      "San Juan Islands - Lopez Island",
      "Sequim - Washington Harbor"
    ];
  } else if (species.includes("Bass") && !species.includes("Sea")) {
    // Bass in Columbia River or its sloughs
    locationPool = [
      "Columbia River", 
      "John Day River", 
      "Umatilla River",
      "Snake River - C.J. Strike Reservoir",
      "Snake River - Twin Falls",
      "Willamette River - Newberg",
      "Willamette River - Corvallis",
      "Wynochee Lake"
    ];
  } else if (species === "Sturgeon") {
    // Sturgeon in deeper holes and channel edges
    locationPool = [
      "Columbia River", 
      "Columbia River - Astoria", 
      "Columbia River - Bonneville Dam",
      "Willamette River", 
      "Willamette River - Downtown Portland",
      "Snake River - Hells Canyon Dam",
      "John Day River",
      "Tillamook Bay"
    ];
  } else if (species === "Flounder" || species === "Sole") {
    // Flatfish in sandy/muddy areas
    locationPool = [
      "Puget Sound - Edmonds",
      "Puget Sound - Des Moines", 
      "Puget Sound - Redondo",
      "Hood Canal - Quilcene Bay",
      "Hood Canal - Dabob Bay",
      "Sequim - Washington Harbor",
      "Sequim - Discovery Bay",
      "Tillamook Bay"
    ];
  } else {
    // Crab, shrimp, etc.
    locationPool = [
      "Puget Sound", 
      "Hood Canal", 
      "Hood Canal - Quilcene Bay",
      "Hood Canal - Dabob Bay",
      "Columbia River Estuary", 
      "Tillamook Bay", 
      "Sequim - Washington Harbor", 
      "Sequim - Discovery Bay"
    ];
  }
  
  // Ensure we have a valid location pool
  if (!locationPool || locationPool.length === 0) {
    locationPool = ["Columbia River - Portland"]; // Fallback location
  }
  
  return locationPool;
};

export const enhanceLocationDetails = (location: string | undefined, species: string): string => {
  if (!location) return "Columbia River - Portland"; // Fallback location
  
  // Get the location details if they exist
  const locationDetail = LOCATION_DETAILS[location as keyof typeof LOCATION_DETAILS];
  
  return location;
};
