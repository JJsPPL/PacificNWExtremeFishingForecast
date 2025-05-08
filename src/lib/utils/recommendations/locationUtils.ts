
import { FISHING_LOCATIONS, LOCATION_DETAILS } from "../../constants/fishingLocations";

// Functions for location selection and management
export const getLocationPool = (species: string, date: Date, month: number): string[] => {
  let locationPool: string[] = [];
  
  // Enhanced location selection logic with focus on Oregon rivers and Sequim
  if (species.includes("Salmon") || species.includes("Steelhead")) {
    // For salmon/steelhead - choose rivers in fall/winter, sound/ocean in summer
    if (month >= 5 && month <= 7) { // Summer
      if (date.getDate() % 5 === 0) {
        // Focus on Oregon locations sometimes
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Nestucca") || loc.includes("Columbia") || loc.includes("Wilson"))
        );
      } else if (date.getDate() % 5 === 1) {
        // Sometimes focus on Sequim area
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => loc && loc.includes("Sequim"));
      } else {
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.length >= 4 ? 
          [...washingtonLocations.slice(0, 4)] : 
          [...washingtonLocations]; // Ocean/sound locations
      }
    } else {
      // In non-summer months, give more weight to river locations
      if (date.getDate() % 4 === 0) {
        // Focus on Oregon locations
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Nestucca") || 
          loc.includes("Sandy") || 
          loc.includes("Wilson") || 
          loc.includes("Clackamas"))
        );
      } else if (date.getDate() % 4 === 1) {
        // Focus on Sequim and Olympic Peninsula
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Sequim") || loc === "Bogachiel River")
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
          "Sequim - Dungeness River"
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
    locationPool = ["Puget Sound", "Hood Canal", "Strait of Juan De Fuca", "San Juan Islands", "Sequim - Discovery Bay"];
  } else if (species.includes("Bass")) {
    // Bass in Columbia River or its sloughs
    locationPool = ["Columbia River", "John Day River", "Umatilla River"];
  } else if (species === "Sturgeon") {
    // Sturgeon in deeper holes and channel edges
    locationPool = ["Columbia River", "Willamette River", "John Day River"];
  } else {
    // Crab, shrimp, etc.
    locationPool = ["Puget Sound", "Hood Canal", "Columbia River Estuary", "Tillamook Bay", "Sequim - Washington Harbor", "Sequim - Discovery Bay"];
  }
  
  // Ensure we have a valid location pool
  if (!locationPool || locationPool.length === 0) {
    locationPool = ["Columbia River"]; // Fallback location
  }
  
  return locationPool;
};

export const enhanceLocationDetails = (location: string | undefined, species: string): string => {
  if (!location) return "Columbia River"; // Fallback location
  
  // Get the location details if they exist
  const locationDetail = LOCATION_DETAILS[location as keyof typeof LOCATION_DETAILS];
  
  return location;
};
