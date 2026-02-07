import { FISHING_LOCATIONS, LOCATION_DETAILS } from "@/lib/constants/fishingLocations";
import { getForecastForDate } from "@/lib/fishingForecast";

// Explicitly add important species that should always be in filters - updated based on current runs
export const IMPORTANT_SPECIES = [
  "Chinook Salmon (King)", "Coho Salmon (Silver)", "Sockeye Salmon (Red)", 
  "Chum Salmon (Dog)", "Pink Salmon (Humpy)", "Steelhead", "Summer Steelhead", 
  "Winter Steelhead", "Sturgeon", "Albacore Tuna", "Halibut", "Rainbow Trout"
];

// Add important locations that should always be in filters
export const IMPORTANT_LOCATIONS = [
  // Washington locations
  "Sequim, WA",
  "Wind River - Mouth",
  "Wind River - Shipherd Falls", 
  "Wind River - Trout Creek",
  "Drano Lake",
  "Kalama River - Lower",
  "Kalama River - Upper",
  "Kalama River - Fallert Creek",
  "Lewis River - Mouth",
  "Lewis River - North Fork",
  "Lewis River - South Fork",
  "Lewis River - East Fork",
  "Lewis River - Hatchery",
  "Cowlitz River - Mouth",
  "Cowlitz River - Blue Creek",
  "Cowlitz River - Mission Bar",
  "Cowlitz River - Barrier Dam",
  "Cowlitz River - Salmon Hatchery",
  "Cowlitz River - Trout Hatchery",
  "Toutle River - Mouth",
  "Toutle River - North Fork",
  "Toutle River - South Fork",
  "Toutle River - Tower Road Bridge",
  "Toutle River - Hatchery",
  // Adding Wynochee River system
  "Wynochee River - Mouth",
  "Wynochee River - Black Creek",
  "Wynochee River - Schafer State Park",
  // Adding Bogachiel/Sol Duc/Calawah system
  "Bogachiel River - Mouth",
  "Bogachiel River - Leyendecker Park",
  "Sol Duc River - Salmon Cascades",
  "Calawah River - Mouth",
  // Additional Columbia River zones based on current creel data
  "Columbia River - Section 1 (Bonneville)",
  "Columbia River - Section 2 (Camas/Washougal)",
  "Columbia River - Section 3 (I-5 Area)",
  "Columbia River - Section 4 (Vancouver)",
  "Columbia River - Section 5 (Woodland)",
  "Columbia River - Section 6 (Kalama)",
  "Columbia River - Section 7 (Cowlitz)",
  "Columbia River - Section 8 (Longview)",
  "Columbia River - Section 9 (Cathlamet)",
  "Columbia River - Section 10 (Cathlamet)",
  // Upper Columbia dams with strong Sockeye runs
  "Columbia River - Rock Island Dam",
  "Columbia River - Wanapum Dam",
  "Columbia River - Priest Rapids Dam",
  "Columbia River - McNary Dam",
  "Columbia River - John Day Dam",
  "Columbia River - The Dalles Dam",
  
  // Oregon Locations
  "Columbia River - Buoy 10",
  "Columbia River - Astoria",
  "Columbia River - Portland",
  "Columbia River - Bonneville Dam",
  "Willamette River - Downtown Portland",
  "Willamette River - Oregon City",
  "Willamette River - Falls",
  "Sandy River - Mouth",
  "Sandy River - Oxbow Park",
  "Sandy River - Cedar Creek",
  "Clackamas River - McIver Park",
  "Clackamas River - Carver",
  "Nestucca River - Mouth",
  "Nestucca River - Three Rivers",
  
  // Tillamook System
  "Tillamook Bay",
  "Tillamook River - Mouth",
  "Wilson River - Sollie Smith Bridge",
  "Trask River - Loren's Drift",
  "Kilchis River - Alderbrook",
  "Miami River - Mouth",
  
  // Idaho Locations
  "Snake River - Lewiston",
  "Snake River - Hells Canyon Dam",
  "Snake River - C.J. Strike Reservoir"
];

// Get unique filters and sort them alphabetically
export const getUniqueFilters = () => {
  try {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    const species = new Set<string>(IMPORTANT_SPECIES);
    const locations = new Set<string>(IMPORTANT_LOCATIONS);
    
    // Generate dates for the next 30 days
    for (let d = new Date(today); d <= thirtyDaysLater; d.setDate(d.getDate() + 1)) {
      try {
        const forecast = getForecastForDate(new Date(d));
        forecast.recommendations.forEach(rec => {
          if (rec.species) species.add(rec.species);
          if (rec.location) locations.add(rec.location);
        });
      } catch (error) {
        console.error("Error getting forecast for date:", d, error);
      }
    }

    // Also add all location details from our constants
    if (LOCATION_DETAILS) {
      Object.keys(LOCATION_DETAILS).forEach(location => {
        if (location) locations.add(location);
      });
    }
    
    // Add all locations from FISHING_LOCATIONS
    if (FISHING_LOCATIONS) {
      for (const state in FISHING_LOCATIONS) {
        const stateLocations = FISHING_LOCATIONS[state as keyof typeof FISHING_LOCATIONS];
        if (stateLocations && Array.isArray(stateLocations)) {
          stateLocations.forEach(location => {
            if (location) locations.add(location);
          });
        }
      }
    }
    
    return {
      species: Array.from(species).sort(),
      locations: Array.from(locations).sort()
    };
  } catch (error) {
    console.error("Error in getUniqueFilters:", error);
    return { species: IMPORTANT_SPECIES, locations: IMPORTANT_LOCATIONS };
  }
};
