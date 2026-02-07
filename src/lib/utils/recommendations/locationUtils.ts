
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
                 loc.includes("Miami") ||
                 loc.includes("Wind"))
        );
      } else if (date.getDate() % 5 === 1) {
        // Focus on Sequim and San Juan areas
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Sequim") || loc.includes("San Juan"))
        );
      } else if (date.getDate() % 5 === 2) {
        // Focus on Snake River
        const idahoLocations = FISHING_LOCATIONS.Idaho || [];
        locationPool = idahoLocations.filter(loc => loc && loc.includes("Snake"));
      } else if (date.getDate() % 5 === 3) {
        // Focus on Wynochee/Bogachiel system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Wynochee") || 
                loc.includes("Bogachiel") || 
                loc.includes("Sol Duc") || 
                loc.includes("Calawah"))
        );
      } else {
        // Columbia River tributaries - specifically highlight these
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        const tributaryLocations = washingtonLocations.filter(loc => 
          loc && (loc.includes("Cowlitz") || 
                loc.includes("Lewis") || 
                loc.includes("Kalama") ||
                loc.includes("Wind"))
        );
        
        // Include ALL relevant Columbia tributaries, not just a few
        locationPool = tributaryLocations;
      }
    } else {
      // In non-summer months, give more weight to river locations
      const dayMod = date.getDate() % 11;
      
      if (dayMod === 0) {
        // Focus on Oregon locations - Include ALL major Oregon rivers
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        locationPool = oregonLocations.filter(loc => 
          loc && (loc.includes("Nestucca") || 
                 loc.includes("Sandy") || 
                 loc.includes("Willamette") ||
                 loc.includes("Clackamas") ||
                 loc.includes("Tillamook") ||
                 loc.includes("Wilson") ||
                 loc.includes("Trask"))
        );
      } else if (dayMod === 1) {
        // Focus on Sequim and San Juan Islands
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Sequim") || 
                 loc.includes("San Juan") || 
                 loc === "Bogachiel River - Mouth")
        );
      } else if (dayMod === 2) {
        // Focus on Columbia River sections and Wind River
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        const windLocations = washingtonLocations.filter(loc => loc && loc.includes("Wind"));
        const columbiaLocations = oregonLocations.filter(loc => loc && loc.includes("Columbia"));
        
        locationPool = [...columbiaLocations, ...windLocations];
      } else if (dayMod === 3) {
        // Focus on Snake River
        const idahoLocations = FISHING_LOCATIONS.Idaho || [];
        locationPool = idahoLocations.filter(loc => 
          loc && loc.includes("Snake")
        );
      } else if (dayMod === 4) {
        // Focus on Tillamook River system - include ALL Tillamook basin rivers
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
        // Focus on Olympic Peninsula rivers
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && (loc.includes("Bogachiel") || 
                loc.includes("Sol Duc") || 
                loc.includes("Calawah"))
        );
      } else if (dayMod === 7) {
        // Focus specifically on Cowlitz River system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && loc.includes("Cowlitz")
        );
      } else if (dayMod === 8) {
        // Focus specifically on Lewis River system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && loc.includes("Lewis")
        );
      } else if (dayMod === 9) {
        // Focus specifically on Wind River system
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        locationPool = washingtonLocations.filter(loc => 
          loc && loc.includes("Wind")
        );
      } else if (species === "Coho Salmon" || species === "Winter Steelhead") {
        // For Coho and Winter Steelhead - include ALL tributary rivers, not just a selection
        locationPool = [
          // Columbia River
          "Columbia River - Bonneville Dam",
          "Columbia River - Astoria", 
          "Columbia River - Portland",
          
          // Cowlitz River system
          "Cowlitz River - Blue Creek",
          "Cowlitz River - Mission Bar",
          "Cowlitz River - Barrier Dam",
          "Cowlitz River - Salmon Hatchery",
          "Cowlitz River - Trout Hatchery",
          
          // Lewis River system
          "Lewis River - Mouth", 
          "Lewis River - Hatchery",
          "Lewis River - East Fork",
          "Lewis River - North Fork",
          "Lewis River - South Fork",
          
          // Wind River system
          "Wind River - Mouth",
          "Wind River - Shipherd Falls",
          "Wind River - Trout Creek",
          "Drano Lake",
          
          // Kalama River
          "Kalama River - Lower",
          "Kalama River - Upper",
          "Kalama River - Fallert Creek",
          
          // Other Washington systems
          "Skagit River",
          "Skagit River - Rockport",
          "Skykomish River - Reiter Ponds",
          "Snohomish River",
          "Snohomish River - Pilchuck Mouth",
          "Sequim - Dungeness River",
          
          // Oregon systems
          "Sandy River - Oxbow Park",
          "Sandy River - Cedar Creek",
          "Sandy River - Revenue Bridge",
          "Sandy River - Dodge Park",
          "Clackamas River - McIver Park",
          "Clackamas River - Carver",
          "Clackamas River - Barton",
          "Willamette River - Falls",
          
          // Tillamook system
          "Wilson River - Sollie Smith Bridge",
          "Trask River - Loren's Drift",
          "Kilchis River - Alderbrook",
          "Tillamook River - Highway 101 Bridge",
          
          // Nestucca system
          "Nestucca River - Three Rivers",
          "Nestucca River - First Bridge",
          "Nestucca River - Beaver",
          
          // Olympic Peninsula
          "Bogachiel River - Mouth",
          "Bogachiel River - Leyendecker Park",
          "Sol Duc River - Salmon Cascades",
          "Wynochee River - Black Creek"
        ];
      } else if (species === "Chinook Salmon") {
        // Special rivers known for Chinook - include ALL known Chinook hotspots
        locationPool = [
          // Columbia River
          "Columbia River - Bonneville Dam",
          "Columbia River - Astoria", 
          "Columbia River - Portland",
          
          // Cowlitz River system
          "Cowlitz River - Blue Creek",
          "Cowlitz River - Mission Bar",
          "Cowlitz River - Barrier Dam",
          
          // Lewis River system
          "Lewis River - Mouth", 
          "Lewis River - Hatchery",
          "Lewis River - North Fork",
          
          // Wind River system
          "Wind River - Mouth",
          "Wind River - Shipherd Falls",
          
          // Kalama River
          "Kalama River - Lower",
          "Kalama River - Upper",
          
          // Oregon systems
          "Willamette River - Oregon City",
          "Willamette River - Falls",
          "Sandy River - Oxbow Park",
          "Sandy River - Dodge Park",
          "Clackamas River - McIver Park",
          "Clackamas River - Carver",
          "Nestucca River - Three Rivers",
          "Nestucca River - First Bridge",
          
          // Tillamook system
          "Tillamook Bay",
          "Wilson River - Sollie Smith Bridge",
          "Trask River - Loren's Drift",
          
          // Sequim/San Juan
          "Sequim - Dungeness River", 
          "San Juan Islands - Thatcher Pass",
          "San Juan Islands - Rosario Strait"
        ];
      } else {
        // Make sure we have valid data before trying to use it
        const oregonLocations = FISHING_LOCATIONS.Oregon || [];
        const washingtonLocations = FISHING_LOCATIONS.Washington || [];
        
        // Include ALL tributary rivers, not just a selection
        const tributaryLocations = [
          // Cowlitz River locations
          "Cowlitz River - Blue Creek",
          "Cowlitz River - Mission Bar",
          "Cowlitz River - Barrier Dam",
          "Cowlitz River - Salmon Hatchery",
          
          // Lewis River locations
          "Lewis River - Mouth",
          "Lewis River - Hatchery",
          "Lewis River - East Fork",
          
          // Wind River locations
          "Wind River - Mouth",
          "Wind River - Shipherd Falls",
          "Wind River - Trout Creek",
          
          // Kalama River locations
          "Kalama River - Lower",
          "Kalama River - Upper",
          
          // Nestucca River
          "Nestucca River - Three Rivers",
          "Nestucca River - First Bridge",
          "Nestucca River - Beaver",
          
          // Tillamook system
          "Wilson River - Sollie Smith Bridge",
          "Trask River - Loren's Drift"
        ];
        
        locationPool = tributaryLocations;
      }
    }
  } else if (species === "Halibut") {
    // Saltwater species - include expanded Puget Sound, Strait, and San Juan locations
    locationPool = [
      "Puget Sound", 
      "Hood Canal", 
      "Strait of Juan De Fuca",
      "Strait of Juan De Fuca - Neah Bay", 
      "Strait of Juan De Fuca - Port Angeles",
      "Strait of Juan De Fuca - Freshwater Bay",
      "San Juan Islands", 
      "San Juan Islands - Thatcher Pass", 
      "San Juan Islands - Obstruction Pass", 
      "San Juan Islands - Rosario Strait",
      "Sequim - Discovery Bay", 
      "Tillamook Bay"
    ];
  } else if (species === "Lingcod" || species === "Rockfish" || species === "Black Sea Bass" || species === "Cabezon") {
    // Rocky habitat for lingcod and rockfish species - include expanded San Juan locations
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
      "San Juan Islands - Thatcher Pass",
      "San Juan Islands - Rosario Strait",
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
  } else if (species.includes("Tuna")) {
    // Tuna fishing offshore OR/WA coast
    locationPool = [
      "Offshore Westport, WA (25-50 miles)",
      "Offshore Ilwaco, WA (30-50 miles)",
      "Offshore Astoria, OR (25-45 miles)",
      "Offshore Newport, OR (30-60 miles)",
      "Offshore Garibaldi, OR (25-50 miles)",
      "Offshore Charleston, OR (30-50 miles)",
      "Offshore Depoe Bay, OR (25-45 miles)",
      "Offshore Neah Bay, WA (20-40 miles)",
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
      "Sequim - Discovery Bay",
      "San Juan Islands"
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
