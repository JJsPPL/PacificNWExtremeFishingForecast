
import { FishingRecommendation } from "../types/fishingTypes";
import { FISHING_TACTICS, FISHING_BAITS } from "../constants/fishingSpecies";
import { FISHING_LOCATIONS, LOCATION_DETAILS } from "../constants/fishingLocations";

// Generate fishing recommendations based on conditions
export const generateRecommendations = (
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
    availableSpecies = ["Winter Steelhead", "Chinook Salmon (resident)", "Dungeness Crab", "Sturgeon", "Cutthroat Trout"];
    
    // Special winter steelhead focus for Oregon and Washington rivers
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
  } 
  // Spring (Mar-May): Spring Chinook, early steelhead, halibut
  else if (month >= 2 && month <= 4) {
    availableSpecies = ["Chinook Salmon (Spring)", "Steelhead", "Halibut", "Lingcod", "Sturgeon"];
    
    // Special spring Chinook focus for Columbia River
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
  }
  // Fall (Sep-Nov): Fall Chinook, coho, chum
  else {
    availableSpecies = ["Chinook Salmon (Fall)", "Coho Salmon", "Chum Salmon", "Dungeness Crab", "Cutthroat Trout"];
    
    // Special fall coho focus for Oregon and Washington rivers
    if (date.getDate() % 3 === 0) {
      const detailedTactics = "Tidewater bobber fishing with eggs or spinners during the first push of tide. Set bobber depth to suspend bait 12-18 inches off bottom. Use cured salmon eggs with scent enhancement. For spinners, blue/silver or pink/silver in sizes 4-5 work best. Target current seams where brackish and fresh water mix.";
      
      recommendations.push({
        species: "Coho Salmon",
        location: "Nestucca River - Cloverdale",
        tactics: detailedTactics,
        waterConditions: "Tidal influence, brackish water, 54-62°F. Best on incoming tide, especially on morning high tides.",
        bestTime: "First light or on incoming tide, particularly when high tide occurs in early morning hours."
      });
    } else if (date.getDate() % 3 === 1) {
      const detailedTactics = "Small pink or orange spinners, size 3-4. Cast across stream and retrieve at medium speed with occasional twitches. Focus on deep pools below riffles and near woody debris. In clear water, switch to 1/4 oz pink jigs under a bobber set 2-3 feet deep.";
      
      recommendations.push({
        species: "Coho Salmon", 
        location: "Sequim - Dungeness River",
        tactics: detailedTactics,
        waterConditions: "Clear to slightly stained, 48-56°F. Best after light rainfall brings river up slightly.",
        bestTime: "First and last light when fish are most aggressive. Cloudy days extend the bite window substantially."
      });
    } else if (date.getDate() % 3 === 2) {
      const detailedTactics = "Back-bouncing eggs or drift fishing with corkies and yarn in deeper runs. Use 15-20lb mainline with 12lb leader. Pink or orange corkies with matching yarn on size 1/0-2/0 hook. Maintain contact with bottom while drifting through deep slots and tailouts.";
      
      recommendations.push({
        species: "Coho Salmon",
        location: "Cowlitz River",
        tactics: detailedTactics,
        waterConditions: "Medium flow, visibility 2-3 feet, 52-58°F. Fish congregate at tributary mouths and in deeper holes.",
        bestTime: "Overcast days during mid-morning when light penetration is moderate. After a front passes often triggers feeding."
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
            ...oregonLocations,
            ...(washingtonLocations.length >= 4 ? washingtonLocations.slice(4) : washingtonLocations)
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
    
    // Make sure we have locations before proceeding
    if (locationPool.length === 0) {
      locationPool = ["Columbia River"]; // Fallback location
    }
    
    const locationIndex = (date.getDate() * (recommendations.length+1)) % locationPool.length;
    const location = locationPool[locationIndex];
    
    // Select appropriate tactics
    let tacticsPool: string[];
    if (species.includes("Salmon")) {
      tacticsPool = FISHING_TACTICS.salmon;
    } else if (species.includes("Steelhead")) {
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
    let tactics = tacticsPool[tacticIndex];
    
    // Enhance tactics with more detailed information based on species and location
    if (species === "Winter Steelhead") {
      if (location && location.includes("Sandy")) {
        tactics += " Use 15lb mainline with 10-12lb leader and size 2 hooks. Focus on inside seams where fast water meets slow pools. Look for fish to hold along current breaks.";
      } else if (location && location.includes("Cowlitz")) {
        tactics += " Target water depths of 4-8 feet with moderate flow. Use 3/8-1/2 oz weights to maintain proper depth. Pink and orange presentations are especially effective during winter months.";
      }
    } else if (species === "Coho Salmon") {
      if (location && location.includes("Nestucca")) {
        tactics += " Fresh chrome fish respond well to bright colors - chartreuse, hot pink, and orange. Look for fish to hold behind large boulders and along current seams.";
      } else if (location && location.includes("Snohomish")) {
        tactics += " Target the lower sections with tidewater influence. Coho often hold in deeper pools with wood cover. Scent is critical - use additional squid oil or herring scent on lures.";
      }
    }
    
    // Select bait with detailed information
    let baitPool: string[];
    if (species.includes("Salmon")) {
      baitPool = FISHING_BAITS.salmon;
    } else if (species.includes("Steelhead")) {
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
    let bait = baitPool[baitIndex];
    
    // Enhance bait recommendations
    if (species === "Winter Steelhead" && location && location.includes("Nestucca")) {
      bait += ". Cure eggs with salt, sugar and sodium sulfite for at least 24 hours. Add pink or orange BorX O Fire for additional color.";
    } else if (species === "Coho Salmon" && location && location.includes("Cowlitz")) {
      bait += ". For spinners, sizes 4-5 work best. Tie cluster eggs in netting material for longer lasting presentations.";
    }
    
    // Get the location details if they exist
    const locationDetail = location ? (LOCATION_DETAILS[location as keyof typeof LOCATION_DETAILS]) : undefined;
    
    // Generate water conditions based on month and location
    let waterConditions: string;
    let bestTime: string;
    
    if (location && location.includes("River") && (month < 5 || month > 8)) {
      // More detailed river conditions in fall/winter/spring
      const conditions = [
        `Water levels fluctuating with rainfall, typically 42-46°F in winter months. Focus on periods of dropping water levels after rain.`,
        `Slightly off-color water with 1-3 feet visibility. Cold water temperatures between 38-44°F require slower presentations.`,
        `River running at moderate level with 2-4 feet visibility. Look for water temperatures in the 44-48°F range for active fish.`,
        `Clear conditions with excellent visibility. Early morning and late evening are key during these conditions.`
      ];
      waterConditions = conditions[(date.getDate() * (recommendations.length+1)) % conditions.length];
      
      // If we have location details, incorporate them
      if (locationDetail) {
        const notes = locationDetail.notes || "";
        waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
      }
    } else if (location && (location.includes("Sound") || location.includes("Bay"))) {
      // More detailed saltwater conditions
      const conditions = [
        `Tidal currents moderate with 55-58°F water temperature. Focus on pinnacles and drop-offs during tide changes.`,
        `Strong tidal exchange creating productive rip lines. Target structure during peak current flow.`,
        `Moderate visibility with tannin-stained water from river outflow. Focus on color breaks where fresh and salt water mix.`,
        `Clean ocean water with good visibility. Work deeper water during daylight hours and move shallower at dawn/dusk.`
      ];
      waterConditions = conditions[(date.getDate() * (recommendations.length+2)) % conditions.length];
    } else {
      // Default conditions with more detail
      waterConditions = date.getDate() % 2 === 0 ? 
        "Clear water with moderate flow, 48-54°F depending on season. Look for structure where fish can rest out of the main current." : 
        "Slightly turbid water with rising levels after recent rainfall. Water temperatures ranging from 42-50°F. Target inside corners and current seams.";
      
      // If we have location details, incorporate them
      if (locationDetail) {
        const notes = locationDetail.notes || "";
        waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
      }
    }
    
    // More specific best time recommendations
    const bestTimeOptions = [
      "Early morning when first light hits the water, particularly 30 minutes before to 2 hours after sunrise.", 
      "Late afternoon as shadows extend across the water, typically 2-3 hours before sunset.",
      "Overcast conditions with light drizzle, which reduces light penetration and can trigger feeding activity.",
      "After light rain when water levels are rising slightly, bringing fresh nutrients into the system.",
      "During incoming tide, especially the middle third when water flow is strongest.",
      "During stable barometric pressure following a weather front, particularly if pressure has been falling for 24+ hours."
    ];
    
    const bestTimeIndex = (date.getDate() * (recommendations.length+5)) % bestTimeOptions.length;
    bestTime = bestTimeOptions[bestTimeIndex];
    
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
  
  return recommendations;
};
