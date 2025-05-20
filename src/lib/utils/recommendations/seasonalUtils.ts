
import { FishingRecommendation } from "../../types/fishingTypes";
import { willametteRiverLocations } from "../../constants/locations/oregon/willamette";

// Get species availability based on month (0-11)
export const getSeasonalSpecies = (month: number): string[] => {
  const species: string[] = [];
  
  // Spring Chinook (March-June)
  if (month >= 2 && month <= 5) {
    species.push("Chinook Salmon (King)");
  }
  
  // Summer Steelhead (May-October)
  if (month >= 4 && month <= 9) {
    species.push("Steelhead");
  }
  
  // Fall Chinook (August-November)
  if (month >= 7 && month <= 10) {
    species.push("Chinook Salmon (King)");
  }
  
  // Coho (September-December)
  if (month >= 8 && month <= 11) {
    species.push("Coho Salmon (Silver)");
  }
  
  // Winter Steelhead (November-April)
  if (month >= 10 || month <= 3) {
    species.push("Steelhead");
  }
  
  // Chum Salmon (October-December)
  if (month >= 9 && month <= 11) {
    species.push("Chum Salmon (Dog)");
  }
  
  // Sockeye Salmon (June-August)
  if (month >= 5 && month <= 7) {
    species.push("Sockeye Salmon (Red)");
  }
  
  // Year-round species
  species.push(
    "Lingcod",
    "Rockfish",
    "Black Sea Bass", 
    "Cabezon",
    "Surfperch",
    "Smallmouth Bass",
    "Largemouth Bass"
  );
  
  // Seasonal Sturgeon (best in winter/spring)
  if (month >= 10 || month <= 5) {
    species.push("Sturgeon");
  }
  
  // Summer ocean species (June-September)
  if (month >= 5 && month <= 8) {
    species.push("Albacore Tuna", "Halibut");
  }
  
  // Trout - best in spring and fall
  if ((month >= 2 && month <= 5) || (month >= 8 && month <= 10)) {
    species.push("Rainbow Trout", "Cutthroat Trout", "Brown Trout");
  }
  
  return species;
};

// Create winter recommendations
export const createWinterRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  // Winter steelhead recommendations
  recommendations.push({
    species: "Steelhead",
    location: "Sandy River - Oxbow Park",
    tactics: "Drift fishing with eggs or yarn in deeper runs. Focus on slower water when temperatures are coldest.",
    bait: "Cured eggs, yarn balls, or small jigs under a float",
    waterConditions: "Look for water temperatures between 38-45°F with moderate visibility. Winter steelhead prefer moderate flows rather than high or low water conditions.",
    bestTime: "Mid-day when water temperatures have risen slightly is often best in winter."
  });
  
  // Sturgeon recommendations
  if (date.getDate() % 3 === 0) {
    recommendations.push({
      species: "Sturgeon",
      location: "Willamette River - Downtown Portland",
      tactics: "Focus on deep holes with moderate current. Use heavy weights (6-10 oz) to hold bottom in winter flows.",
      bait: "Smelt, sand shrimp, or pickled herring",
      waterConditions: "Winter concentrations of sturgeon in the lower Willamette can be excellent, especially in deep holes with 15-40 feet of water.",
      bestTime: "Incoming tide during mid-day hours when water temperature is highest"
    });
  }
  
  return recommendations;
};

// Create spring recommendations
export const createSpringRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();
  
  // Spring Chinook recommendations
  if (month >= 2 && month <= 4) {  // March to May
    const willametteLocations = [
      "Willamette River - Oregon City", 
      "Willamette River - Downtown Portland",
      "Willamette River - Falls"
    ];
    
    const locationIndex = date.getDate() % willametteLocations.length;
    const selectedLocation = willametteLocations[locationIndex];
    
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: selectedLocation,
      tactics: "Trolling with flashers and herring or back-bouncing eggs in deeper holes. Target depths of 15-30 feet in the main river channel.",
      bait: "Herring, spinners, or cured eggs",
      waterConditions: "Spring Chinook prefer water temperatures between 48-56°F and moderate flows. Look for areas with clarity of 2-4 feet.",
      bestTime: "Early morning and late afternoon typically produce the best bite. Hatchery counts show strongest spring Chinook returns from mid-April through May."
    });
  }
  
  // Late spring fishery for shad
  if (month === 4 || month === 5) {  // May or June
    recommendations.push({
      species: "American Shad",
      location: "Willamette River - Oregon City Falls",
      tactics: "Cast small jigs, Dick Nite spoons, or shad darts across current and retrieve with the flow.",
      bait: "Shad darts, small jigs, or Dick Nite spoons",
      waterConditions: "Shad prefer water temperatures from 58-68°F. Look for zones with moderate current near the falls.",
      bestTime: "Mid-morning through afternoon when water temperatures are rising. Peak run timing coincides with Columbia River counts in late May through mid-June."
    });
  }
  
  return recommendations;
};

// Create summer recommendations
export const createSummerRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();
  const day = date.getDate();
  
  // Summer Steelhead in the Willamette system
  if (month >= 5 && month <= 7) {  // June to August
    const willametteSthdLocations = [
      "Willamette River - Oregon City Falls",
      "Willamette River - Falls"
    ];
    
    const locationIndex = date.getDate() % willametteSthdLocations.length;
    
    recommendations.push({
      species: "Steelhead",
      location: willametteSthdLocations[locationIndex],
      tactics: "Cast spinners, drift beads under floats, or swing flies in areas with moderate current.",
      bait: "Spinners, beads, or small flies",
      waterConditions: "Summer steelhead prefer water temperatures between 52-64°F. Target areas with good oxygenation near the falls.",
      bestTime: "Early morning and evening hours when water temperatures are coolest. Hatchery counts show peak summer steelhead passage at Willamette Falls from June through early August."
    });
  }
  
  // Smallmouth bass fishing in summer
  if (month >= 5 && month <= 8 && date.getDate() % 3 === 0) {  // June to September, occasionally
    const bassLocations = [
      "Willamette River - Newberg",
      "Willamette River - Salem",
      "Willamette River - Corvallis"
    ];
    
    const locationIndex = date.getDate() % bassLocations.length;
    
    recommendations.push({
      species: "Smallmouth Bass",
      location: bassLocations[locationIndex],
      tactics: "Cast crankbaits around rocky structure, use topwater lures early and late in the day, or drop-shot soft plastics in deeper holes.",
      bait: "Crankbaits, topwater poppers, or soft plastic drop-shot rigs",
      waterConditions: "Target areas with rocky structure, current breaks, or drop-offs. Smallmouth are most active in water temperatures between 65-75°F.",
      bestTime: "Early morning, late evening, or night during the hottest parts of summer. Midday fishing can be productive in slightly deeper water."
    });
  }
  
  return recommendations;
};

// Create fall recommendations
export const createFallRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();
  
  // Fall Chinook recommendations - data aligned with Columbia River counts
  if (month >= 8 && month <= 10) {  // September to November
    const fallChinookLocations = [
      "Willamette River - Portland",
      "Willamette River - Oregon City",
      "Multnomah Channel"
    ];
    
    const locationIndex = date.getDate() % fallChinookLocations.length;
    
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: fallChinookLocations[locationIndex],
      tactics: "Trolling with flashers and herring or back-trolling with plugs in deeper holes and current seams.",
      bait: "Herring, sardine-wrapped plugs, or spinners",
      waterConditions: "Fall Chinook enter the system with the first significant fall rains. Target water temperatures between 50-62°F.",
      bestTime: "Early morning and evening hours. Columbia River hatchery counts show peak returns in late September through mid-October."
    });
  }
  
  // Coho recommendations - data aligned with Columbia River tributary counts
  if (month >= 8 && month <= 10) {  // September to November
    recommendations.push({
      species: "Coho Salmon (Silver)",
      location: "Multnomah Channel",
      tactics: "Trolling with spinners or herring, or casting spinners from the bank where access allows.",
      bait: "Blue/green spinners, herring, or cured eggs",
      waterConditions: "Look for water temperatures between 48-58°F. Coho often move into the Willamette system with fall rains, following Columbia River migration patterns.",
      bestTime: "Morning hours, especially after a rain event has increased flows. Peak runs typically occur from mid-September through October based on Columbia River tributary hatchery returns."
    });
  }
  
  return recommendations;
};
