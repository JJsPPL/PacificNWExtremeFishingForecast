
import { FishingRecommendation } from "../../types/fishingTypes";

// Functions for seasonal recommendations
export const getSeasonalSpecies = (month: number): string[] => {
  let availableSpecies: string[] = [];
  
  // Winter (Dec-Feb): Winter steelhead, resident Chinook
  if (month === 11 || month === 0 || month === 1) {
    availableSpecies = ["Winter Steelhead", "Chinook Salmon (resident)", "Dungeness Crab", "Sturgeon", "Cutthroat Trout", "Rockfish"];
  } 
  // Spring (Mar-May): Spring Chinook, early steelhead, halibut, lingcod season opens
  else if (month >= 2 && month <= 4) {
    availableSpecies = ["Chinook Salmon (Spring)", "Steelhead", "Halibut", "Lingcod", "Rockfish", "Sturgeon", "Surfperch"];
  }
  // Summer (Jun-Aug): Summer Chinook, sockeye, pink (odd years), coho, good bottomfishing
  else if (month >= 5 && month <= 7) {
    availableSpecies = [
      "Chinook Salmon (Summer)", 
      "Sockeye Salmon", 
      new Date().getFullYear() % 2 === 1 ? "Pink Salmon" : "Coho Salmon (early)",
      "Halibut",
      "Lingcod",
      "Rockfish",
      "Black Sea Bass",
      "Cabezon",
      "Smallmouth Bass",
      "Sturgeon"
    ];
  }
  // Fall (Sep-Nov): Fall Chinook, coho, chum, lingcod and rockfish still open
  else {
    availableSpecies = ["Chinook Salmon (Fall)", "Coho Salmon", "Chum Salmon", "Lingcod", "Rockfish", "Dungeness Crab", "Cutthroat Trout", "Flounder"];
  }
  
  return availableSpecies;
};

export const createWinterRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  if (date.getDate() % 3 === 0) {
    const detailedTactics = "Drift fishing with eggs or yarn balls in deeper slots. Focus on slower water near the seam where fast water meets slow. Use 10-12lb leader and size 4 hooks with small clusters of eggs or yarn. Let your presentation drift naturally with the current.";
    
    recommendations.push({
      species: "Winter Steelhead",
      location: "Nestucca River - Beaver",
      tactics: detailedTactics,
      waterConditions: "Medium flow, slightly turbid, 42-45°F. Best after a rain event when water is dropping and clearing.",
      bestTime: "Early morning within an hour of sunrise or late afternoon when shadow lines form across the river."
    });
  } else if (date.getDate() % 3 === 1) {
    const detailedTactics = "Small presentations in clear water. Size 6 hooks with single eggs or 1/4 oz jigs in pink, orange, or purple. Maintain constant bottom contact while drifting through tailouts and transitional water.";
    
    recommendations.push({
      species: "Winter Steelhead",
      location: "Sequim - Dungeness River",
      tactics: detailedTactics,
      waterConditions: "Clear to slightly off-color, 38-42°F. Look for water with 2-3 feet of visibility.",
      bestTime: "Mid-morning after frost thaws, typically 9-11am when water temperature rises slightly."
    });
  } else if (date.getDate() % 3 === 2) {
    // Add more detailed winter tactics for Skykomish
    const detailedTactics = "Side drifting with 3/8 oz weight and 30-36 inch leader. Use pink or orange corky with yarn. Focus on the inside edge of seams where fast water transitions to walking-speed current.";
    
    recommendations.push({
      species: "Winter Steelhead",
      location: "Skykomish River - Reiter Ponds",
      tactics: detailedTactics,
      waterConditions: "Green water with 1-2 feet visibility, 40-44°F. Best when water levels are dropping after a rain event.",
      bestTime: "Best during stable barometric pressure, typically mid-day when the sun warms the water slightly."
    });
  }
  
  return recommendations;
};

export const createSpringRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  if (date.getDate() % 4 === 0) {
    const detailedTactics = "Trolling with herring near deep channel edges. Use green label herring in a tight spin at 30-45 feet depth. Maintain speed of 1.2-1.5mph with the current. Target incoming tide for best results and focus on current breaks where baitfish concentrate.";
    
    recommendations.push({
      species: "Chinook Salmon (Spring)",
      location: "Columbia River",
      tactics: detailedTactics,
      waterConditions: "Clear water, moderate flow, 48-52°F. Look for slight color changes indicating current seams.",
      bestTime: "Early morning or late afternoon when light penetration in the water is reduced."
    });
  } else if (date.getDate() % 4 === 1) {
    // Add Sandy River spring Chinook tactics
    const detailedTactics = "Back-bouncing eggs with 1-1.5 oz weight, 24-30 inch leader, and size 2/0 hook. Use cured salmon eggs with sand shrimp tails. Target the head and tail of deeper holes where current slows.";
    
    recommendations.push({
      species: "Chinook Salmon (Spring)",
      location: "Sandy River - Revenue Bridge",
      tactics: detailedTactics,
      waterConditions: "Slightly off-color, 46-52°F. Best when visibility is between 1-3 feet.",
      bestTime: "First light until mid-morning, especially during rising barometric pressure."
    });
  }
  
  return recommendations;
};

export const createSummerRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  if (date.getDate() % 3 === 1) {
    const detailedTactics = "Early morning with small spinners (size 4-5) or flies in riffles and tailouts. Gold, silver or copper spinners work best. When fly fishing, use smaller presentations - size 6-8 flies in pink, purple or orange. Work systematically through riffles and pocket water.";
    
    recommendations.push({
      species: "Summer Steelhead",
      location: "Nestucca River - Three Rivers",
      tactics: detailedTactics,
      waterConditions: "Clear water, moderate flow, 52-58°F. Look for oxygenated water with good bubble content.",
      bestTime: "Early morning or late afternoon when sun is off the water. Evening hatches can trigger feeding behavior."
    });
  } else if (date.getDate() % 3 === 0) {
    // Add Deschutes summer steelhead tactics
    const detailedTactics = "Swung flies with intermediate sink tip lines. Use traditional patterns like Freight Trains or Skunks in sizes 4-6. Maintain 45-degree downstream presentation and slow your swing through likely holding water.";
    
    recommendations.push({
      species: "Summer Steelhead",
      location: "Deschutes River",
      tactics: detailedTactics,
      waterConditions: "Clear with slight green tint, 58-64°F. Look for shaded areas during heat of day.",
      bestTime: "Early morning and evening hours, especially during caddis hatches. Fish deeper during midday heat."
    });
  }
  
  return recommendations;
};

export const createFallRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  if (date.getDate() % 4 === 0) {
    const detailedTactics = "Tidewater bobber fishing with eggs or spinners during the first push of tide. Set bobber depth to suspend bait 12-18 inches off bottom. Use cured salmon eggs with scent enhancement. For spinners, blue/silver or pink/silver in sizes 4-5 work best. Target current seams where brackish and fresh water mix.";
    
    recommendations.push({
      species: "Coho Salmon",
      location: "Nestucca River - Cloverdale",
      tactics: detailedTactics,
      waterConditions: "Tidal influence, brackish water, 54-62°F. Best on incoming tide, especially on morning high tides.",
      bestTime: "First light or on incoming tide, particularly when high tide occurs in early morning hours."
    });
  } else if (date.getDate() % 4 === 1) {
    const detailedTactics = "Small pink or orange spinners, size 3-4. Cast across stream and retrieve at medium speed with occasional twitches. Focus on deep pools below riffles and near woody debris. In clear water, switch to 1/4 oz pink jigs under a bobber set 2-3 feet deep.";
    
    recommendations.push({
      species: "Coho Salmon", 
      location: "Sequim - Dungeness River",
      tactics: detailedTactics,
      waterConditions: "Clear to slightly stained, 48-56°F. Best after light rainfall brings river up slightly.",
      bestTime: "First and last light when fish are most aggressive. Cloudy days extend the bite window substantially."
    });
  } else if (date.getDate() % 4 === 2) {
    const detailedTactics = "Back-bouncing eggs or drift fishing with corkies and yarn in deeper runs. Use 15-20lb mainline with 12lb leader. Pink or orange corkies with matching yarn on size 1/0-2/0 hook. Maintain contact with bottom while drifting through deep slots and tailouts.";
    
    recommendations.push({
      species: "Coho Salmon",
      location: "Cowlitz River",
      tactics: detailedTactics,
      waterConditions: "Medium flow, visibility 2-3 feet, 52-58°F. Fish congregate at tributary mouths and in deeper holes.",
      bestTime: "Overcast days during mid-morning when light penetration is moderate. After a front passes often triggers feeding."
    });
  } else if (date.getDate() % 4 === 3) {
    // Add new fall lingcod recommendation for Puget Sound
    const detailedTactics = "Drift fish rocky structures using heavy jigs (8-16oz) in white, glow, or chartreuse colors. Target underwater humps, rock piles and artificial reefs in 60-120 feet of water. Work jigs with sharp lift-and-drop motions, keeping contact with the bottom. Add scent to soft plastic tails for enhanced attraction.";
    
    recommendations.push({
      species: "Lingcod",
      location: "Puget Sound - Tacoma Narrows",
      tactics: detailedTactics,
      waterConditions: "Tidal currents, 52-58°F. Best fishing during moderate current flow rather than slack tide or maximum flow.",
      bestTime: "First few hours after sunrise, especially during neap tides when current flow is more moderate."
    });
  }
  
  return recommendations;
};
