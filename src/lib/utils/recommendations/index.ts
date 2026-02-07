
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
  
  // Priority species order (based on user requirements: Salmon > Steelhead > Sturgeon > Tuna > Halibut > Others)
  const priorityOrder: { [key: string]: number } = {
    "Chinook Salmon (King)": 1,
    "Coho Salmon (Silver)": 2,
    "Sockeye Salmon (Red)": 3,
    "Chum Salmon (Dog)": 4,
    "Pink Salmon (Humpy)": 5,
    "Steelhead": 6,
    "Sturgeon": 7,
    "Albacore Tuna": 8,
    "Halibut": 9,
    "Lingcod": 20,
    "Black Sea Bass": 30,
    "Rockfish": 40,
    "Smallmouth Bass": 50,
    "Rainbow Trout": 25
  };
  
  // Sort species by priority
  availableSpecies.sort((a, b) => {
    const priorityA = priorityOrder[a] || 100;
    const priorityB = priorityOrder[b] || 100;
    return priorityA - priorityB;
  });
  
  // Add seasonal-specific recommendations
  if (month === 11 || month === 0 || month === 1) {
    // Winter (December-February) - 2025-26 coastal steelhead season active
    recommendations.push(...createWinterRecommendations(date));
    
    // December 2025 specific: Oregon coastal rivers closed to Chinook salmon
    // Tillamook, Nestucca, Nehalem, Necanicum per ODFW Dec 1, 2025 regulations
    
    // Add Sturgeon recommendation - winter/spring is peak season
    // Note: 2026 Columbia River sturgeon delayed openers in Bonneville/The Dalles pools per ODFW
    if ((month === 1 || month === 0) && (date.getDate() % 3 === 0)) { // January-February
      recommendations.push({
        species: "Sturgeon",
        location: "Columbia River - Below Bonneville Dam",
        tactics: "Anchor fishing with heavy sinkers. Use circle hooks and be prepared for long fights.",
        bait: "Sand shrimp, salmon eggs, anchovies, or sardines",
        waterConditions: "Target deeper holes and channels with moderate to strong current. Sturgeon prefer water temperatures between 45-55°F.",
        bestTime: "Incoming tides. Note: 2026 sturgeon retention fisheries have delayed openers - check ODFW for current status."
      });
    }
    
    // Late season Coho - Columbia Zone open through December per ODFW
    if (month === 11 && (date.getDate() % 4 === 1)) {
      recommendations.push({
        species: "Coho Salmon (Silver)",
        location: "Columbia River - Buoy 10 to Tongue Point",
        tactics: "Trolling with spinners or herring. Wild coho must be released per current regulations.",
        bait: "Green/blue spinners, herring with green flashers",
        waterConditions: "Late-season Coho available in lower Columbia. Target water temps 45-52°F.",
        bestTime: "Early morning hours. Check ODFW regulation updates for current bag limits and open areas."
      });
    }
  } else if (month >= 2 && month <= 4) {
    // Spring
    recommendations.push(...createSpringRecommendations(date));
    
    // Add Spring Trout recommendation
    if ((month === 2 || month === 3) && (date.getDate() % 4 === 0)) { // March-April
      recommendations.push({
        species: "Rainbow Trout",
        location: "Clackamas River - Carver",
        tactics: "Drift fishing with eggs or casting spinners in deeper pools. Focus on current seams and drop-offs.",
        bait: "Cured salmon eggs, small spinners, or PowerBait in deeper holes",
        waterConditions: "Spring trout fishing is best with water temperatures between 45-58°F and moderate visibility.",
        bestTime: "Early morning through late morning. Spring conditions often provide excellent trout fishing."
      });
    }
    
    // Add Spring Sturgeon recommendation - continuation from winter
    if (month === 2 && (date.getDate() % 3 === 1)) { // March
      recommendations.push({
        species: "Sturgeon",
        location: "Columbia River - Portland",
        tactics: "Anchor fishing with heavy sinkers in deeper holes. Target areas with strong current.",
        bait: "Sand shrimp, salmon eggs, anchovies, or sardines",
        waterConditions: "Target deeper holes and channels with moderate to strong current. Spring sturgeon prefer water temperatures between 48-58°F.",
        bestTime: "Incoming tides typically produce the best action. Spring is peak time for keeper-sized sturgeon."
      });
    }
    
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
    
    // Add current summer steelhead runs - Cowlitz River system (July 2025 data)
    if (month === 6 && (date.getDate() % 3 === 2)) { // July summer steelhead
      recommendations.push({
        species: "Steelhead",
        location: "Cowlitz River - Blue Creek",
        tactics: "Drift fishing with cured eggs or casting spinners in deeper holes. Focus on current seams and structure.",
        bait: "Cured salmon eggs, blue/silver or green/silver spinners, small spoons",
        waterConditions: "Current conditions: 2,340 CFS flow, 12-foot visibility, 53.6°F water temp. Excellent summer steelhead conditions.",
        bestTime: "Early morning through late morning. Tacoma Power reports 407 summer steelhead collected at separator in recent week - strong run timing."
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
    
    // Add Sockeye Salmon recommendation - Current strong runs in Columbia River system (July 2025 data)
    if (month === 6 && (date.getDate() % 2 === 0)) { // July, frequent recommendation for current strong Sockeye run
      recommendations.push({
        species: "Sockeye Salmon (Red)",
        location: "Columbia River - Bonneville Dam",
        tactics: "Trolling with small spoons and hoochies, or drift fishing with flies near dam structures. Target current breaks below spillway.",
        bait: "Red/pink hoochies, silver/blue spoons, or cured roe with red dye. Small presentations are key for Sockeye.",
        waterConditions: "Sockeye prefer cooler water temperatures (55-62°F). Target areas near current breaks and dam structures where fish stage. Water visibility 8-12 feet ideal.",
        bestTime: "Early morning hours when water temps are coolest. Current Bonneville Dam counts show 122-388 Sockeye daily passage in July 2025, indicating strong summer run timing."
      });
    }
    
    // Add strong Columbia River Sockeye runs at upper dams - peak summer migration
    if (month === 6 && (date.getDate() % 3 === 1)) { // July, Rock Island/Wanapum areas
      recommendations.push({
        species: "Sockeye Salmon (Red)",
        location: "Columbia River - Rock Island Dam area",
        tactics: "Trolling with small spoons and spinners in deeper water near dam tailraces. Focus on morning and evening bites.",
        bait: "Small silver/blue spoons, red hoochies, or sockeye flies. Match natural salmon fry colors.",
        waterConditions: "Target deeper pools with good current flow. Sockeye are schooling fish - when you find one, there are usually more nearby.",
        bestTime: "Early morning prime time. Current Rock Island Dam counts show 400-978 Sockeye daily in July 2025 - exceptional numbers for summer run."
      });
    }
    
    // Add Pink Salmon recommendation - odd years have massive runs (2025 is odd year)
    if (month === 6 && date.getFullYear() % 2 === 1 && (date.getDate() % 3 === 0)) { // July, odd years only
      recommendations.push({
        species: "Pink Salmon (Humpy)",
        location: "Puget Sound - Edmonds",
        tactics: "Small spinners, spoons, or pink hoochies. Fish near structure and current edges.",
        bait: "Pink hoochies, small silver spoons, or size 2-3 spinners in pink/silver",
        waterConditions: "Pink salmon prefer saltwater temperatures between 52-60°F. Target areas with good current flow and structure.",
        bestTime: "Early morning and evening hours. Pink salmon runs peak in odd years with massive numbers entering Puget Sound."
      });
    }
    
    // Add Halibut recommendation - summer ocean fishing
    if ((month === 5 || month === 6) && (date.getDate() % 4 === 0)) { // June-July
      recommendations.push({
        species: "Halibut",
        location: "Oregon Coast - 20-40 miles offshore",
        tactics: "Bottom fishing with heavy sinkers and circle hooks. Target sandy/muddy bottoms near underwater structure.",
        bait: "Whole salmon heads, large herring, or octopus",
        waterConditions: "Target depths of 100-300 feet over sandy bottoms. Look for areas with good current flow and baitfish activity.",
        bestTime: "All day fishing can be productive, but early morning often produces the best bite for larger fish."
      });
    }
    
    recommendations.push(...createSummerRecommendations(date));
  } else {
    // Fall
    recommendations.push(...createFallRecommendations(date));
    
    // Add Chum Salmon recommendation - fall run
    if (month === 9 && (date.getDate() % 3 === 0)) { // October
      recommendations.push({
        species: "Chum Salmon (Dog)",
        location: "Puget Sound - Edmonds",
        tactics: "Cast spinners or drift with flies near creek mouths and spawning areas",
        bait: "Small spinners in silver/green, or fly patterns that mimic small baitfish",
        waterConditions: "Chum prefer water temperatures between 45-55°F. Target areas near freshwater inflows and spawning tributaries.",
        bestTime: "Early morning and evening hours. Chum runs peak in October with fish staging near spawning areas."
      });
    }
    
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
    
    // Add current Columbia River steelhead fishing - strong summer runs (July 2025 data)
    if (month === 6 && (date.getDate() % 4 === 3)) { // July steelhead opportunities
      recommendations.push({
        species: "Steelhead", 
        location: "Columbia River - Section 8 (Longview area)",
        tactics: "Bank fishing with spinners and drift fishing with eggs near current breaks. Boat trolling also productive.",
        bait: "Blue/silver or chartreuse spinners, cured eggs, or small spoons",
        waterConditions: "Target areas with moderate current and structure. Steelhead are actively feeding in the mainstem.",
        bestTime: "Early morning and evening hours most productive. Current creel surveys show consistent steelhead retention in Section 8 with 11 fish kept by 27 boats on recent survey day."
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
  
  // Remove duplicates based on species + location combination
  const uniqueRecommendations = recommendations.filter((rec, index, self) => 
    index === self.findIndex(r => r.species === rec.species && r.location === rec.location)
  );
  
  return uniqueRecommendations;
};
