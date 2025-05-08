
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
      } else {
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.length >= 4 ? 
          [...washingtonLocations.slice(0, 4)] : 
          [...washingtonLocations]; // Ocean/sound locations
      }
    } else {
      // In non-summer months, give more weight to river locations
      const dayMod = date.getDate() % 8; // Changed from 6 to 8 to incorporate Tillamook
      
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
          loc && (loc.includes("Sequim") || loc === "Bogachiel River")
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
          "Kilchis River - Alderbrook"
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
  } else if (species === "Halibut" || species === "Lingcod") {
    // Saltwater species
    locationPool = ["Puget Sound", "Hood Canal", "Strait of Juan De Fuca", "San Juan Islands", "Sequim - Discovery Bay", "Tillamook Bay"];
  } else if (species.includes("Bass")) {
    // Bass in Columbia River or its sloughs
    locationPool = [
      "Columbia River", 
      "John Day River", 
      "Umatilla River",
      "Snake River - C.J. Strike Reservoir",
      "Snake River - Twin Falls",
      "Willamette River - Newberg",
      "Willamette River - Corvallis"
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
  } else {
    // Crab, shrimp, etc.
    locationPool = ["Puget Sound", "Hood Canal", "Columbia River Estuary", "Tillamook Bay", "Sequim - Washington Harbor", "Sequim - Discovery Bay"];
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
