
import { FishingRecommendation } from "../../types/fishingTypes";
import { willametteRiverLocations } from "../../constants/locations/oregon/willamette";
import { getSeasonLabel, getCurrentYear } from "../dateUtils";

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

  // Summer ocean species (June-September) - includes Albacore Tuna
  if (month >= 5 && month <= 8) {
    species.push("Albacore Tuna", "Bluefin Tuna", "Halibut");
  }

  // Fall tuna season (September-October) - Albacore Tuna still available
  if (month >= 8 && month <= 9) {
    species.push("Albacore Tuna");
  }

  // Trout - best in spring and fall
  if ((month >= 2 && month <= 5) || (month >= 8 && month <= 10)) {
    species.push("Rainbow Trout", "Cutthroat Trout", "Brown Trout");
  }

  // Dungeness Crab - winter season
  if (month >= 11 || month <= 1) {
    species.push("Dungeness Crab");
  }

  // Flounder - fall/winter
  if (month >= 8 && month <= 11) {
    species.push("Flounder");
  }

  return species;
};

// Create winter recommendations (updated regulations)
export const createWinterRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();
  const seasonLabel = getSeasonLabel();
  const year = getCurrentYear();

  // Winter steelhead recommendations - WDFW season (Dec 1 - March 31)
  recommendations.push({
    species: "Steelhead",
    location: "Sandy River - Oxbow Park",
    tactics: "Drift fishing with eggs or yarn in deeper runs. Focus on slower water when temperatures are coldest.",
    bait: "Cured eggs, yarn balls, or small jigs under a float",
    waterConditions: "Look for water temperatures between 38-45\u00B0F with moderate visibility. Winter steelhead prefer moderate flows rather than high or low water conditions.",
    bestTime: "Mid-day when water temperatures have risen slightly is often best in winter."
  });

  // Washington Coastal Steelhead - current season (Dec 1 - March 31)
  // Humptulips closes Feb 2, Chehalis closes Feb 16 per WDFW announcement
  if (date.getDate() % 5 === 0 || date.getDate() % 5 === 1) {
    recommendations.push({
      species: "Steelhead",
      location: "Cowlitz River - Blue Creek",
      tactics: "Drift fish with cured eggs or corky and yarn. Target inside seams and tailouts of deeper holes.",
      bait: "Cured salmon eggs with shrimp oil, or pink/orange yarn with scent",
      waterConditions: "Best fishing during moderate flows of 4,000-8,000 cfs. Check Mayfield Dam releases for current conditions.",
      bestTime: `Early morning and late afternoon. ${seasonLabel} coastal steelhead season runs Dec 1 - March 31.`
    });
  }

  // Chehalis River system - open until Feb 16 per WDFW regulations
  if (date.getDate() % 5 === 2) {
    recommendations.push({
      species: "Steelhead",
      location: "Chehalis River - Porter",
      tactics: "Drift fishing with eggs or jigs under a float. Focus on deeper slots and current seams.",
      bait: "Cured eggs, pink/orange jigs, or beads under a float",
      waterConditions: "Best with 2-4 feet visibility and moderate flows. Winter steelhead staging in lower river reaches.",
      bestTime: "Mid-morning through early afternoon. Note: Chehalis system closes to steelhead Feb 16 per WDFW emergency rules."
    });
  }

  // Humptulips River - open until Feb 2 per WDFW regulations
  if (month === 11 || (month === 0 && date.getDate() <= 31) || (month === 1 && date.getDate() <= 2)) {
    if (date.getDate() % 6 === 3) {
      recommendations.push({
        species: "Steelhead",
        location: "Humptulips River",
        tactics: "Drift fishing with eggs or floating jigs in deeper runs. Target inside seams and tailouts.",
        bait: "Cured salmon eggs, pink/cerise jigs under float, or yarn balls",
        waterConditions: "Best during moderate winter flows with slight color. Target water temps between 38-45\u00B0F.",
        bestTime: "Mid-day hours when water has warmed slightly. Note: Humptulips closes to steelhead Feb 2 per WDFW emergency rules."
      });
    }
  }

  // Wynoochee River winter steelhead
  if (date.getDate() % 5 === 4) {
    recommendations.push({
      species: "Steelhead",
      location: "Wynoochee River - Dam Access",
      tactics: "Drift fishing with eggs or swing flies through deeper runs. Focus on tailouts and current seams below dam.",
      bait: "Cured eggs, beads, or steelhead flies in purple/pink",
      waterConditions: "Dam-controlled flows provide consistent conditions. Best with 2-4 feet visibility.",
      bestTime: `Mid-morning through mid-afternoon. Dec 1 - March 31 season per WDFW ${seasonLabel} regulations.`
    });
  }

  // Lewis River winter steelhead
  if (date.getDate() % 5 === 2 || date.getDate() % 5 === 3) {
    recommendations.push({
      species: "Steelhead",
      location: "Lewis River - Hatchery",
      tactics: "Side-drifting eggs or bobber dogging with jigs. Focus on water 3-8 feet deep with moderate current.",
      bait: "Pink or orange jigs under a float, or cured eggs with light leader",
      waterConditions: "Look for 2-4 feet of visibility. Water releases from Merwin Dam influence conditions - check flow data before fishing.",
      bestTime: "Late morning through mid-afternoon when water temperatures rise slightly."
    });
  }

  // Nestucca River winter steelhead - Oregon regulation update Dec 1-31: closed to Chinook
  if (date.getDate() % 5 === 4 || date.getDate() % 4 === 0) {
    recommendations.push({
      species: "Steelhead",
      location: "Nestucca River - Three Rivers",
      tactics: "Drift fishing with yarn or beads, or swing flies through deeper runs. Focus on inside seams and tailouts.",
      bait: "Pink or orange yarn balls, beads, or egg patterns",
      waterConditions: "Best action during dropping flows after a rain event. Look for water with slight green tint and 2-4 feet of visibility.",
      bestTime: "Mid-day hours when water temperatures have risen slightly. Note: Chinook salmon closed Dec 1-31 per ODFW regulations."
    });
  }

  // Tillamook Bay rivers winter steelhead - Oregon regulation update Dec 1-31: closed to Chinook
  if (date.getDate() % 6 === 1) {
    recommendations.push({
      species: "Steelhead",
      location: "Wilson River - Mills Bridge",
      tactics: "Drift fishing with eggs or jigs under a float. Target deeper holes and current seams.",
      bait: "Cured salmon eggs, pink/cerise jigs, or yarn balls",
      waterConditions: "Best during moderate flows with 2-4 feet visibility after rain.",
      bestTime: "Mid-morning through early afternoon. Note: All Tillamook rivers closed to Chinook Dec 1-31 per ODFW regulations."
    });
  }

  // Sturgeon recommendations - winter/spring prime season
  // Columbia River sturgeon season updates: delayed openers in Bonneville/The Dalles pools
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

  // John Day Pool sturgeon - opens Jan 1 per ODFW regulations
  if (month === 11 && date.getDate() % 4 === 2) {
    recommendations.push({
      species: "Sturgeon",
      location: "Columbia River - John Day Dam",
      tactics: "Anchor fishing with heavy tackle in deeper water. Focus on main channel and deep holes.",
      bait: "Smelt, sand shrimp, salmon heads, or pickled herring",
      waterConditions: "Target 30-60 foot depths in main channel with moderate current.",
      bestTime: `Mid-day on incoming tide. Note: John Day Pool retention opens Jan 1 - 43-54 inch fork length legal size per ODFW.`
    });
  }

  return recommendations;
};

// Create spring recommendations
export const createSpringRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();

  // Spring Chinook recommendations - Columbia River priority
  if (month >= 2 && month <= 4) {  // March to May
    // Columbia River Spring Chinook recommendation
    const columbiaLocations = [
      "Columbia River - Bonneville Dam",
      "Columbia River - Portland",
      "Columbia River - Vancouver"
    ];

    const locationIndex = date.getDate() % columbiaLocations.length;
    const columbiaLocation = columbiaLocations[locationIndex];

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: columbiaLocation,
      tactics: "Trolling with flashers and herring near deeper channels. Target depths of 15-30 feet.",
      bait: "Herring with flashers, sardine-wrapped K15 Kwikfish, or 3.5 spinners",
      waterConditions: "Spring Chinook prefer water temperatures between 48-56\u00B0F with moderate clarity. Look for areas with 2-4 feet of visibility.",
      bestTime: "Early morning hours are most productive. Bonneville Dam counts show strongest Spring Chinook returns from mid-April through May."
    });

    // Willamette River Spring Chinook recommendation
    const willametteLocations = [
      "Willamette River - Oregon City",
      "Willamette River - Downtown Portland",
      "Willamette River - Falls"
    ];

    const willametteIndex = date.getDate() % willametteLocations.length;
    const willametteLocation = willametteLocations[willametteIndex];

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: willametteLocation,
      tactics: "Trolling with flashers and herring or back-bouncing eggs in deeper holes. Target depths of 15-30 feet in the main river channel.",
      bait: "Herring, spinners, or cured eggs",
      waterConditions: "Spring Chinook prefer water temperatures between 48-56\u00B0F and moderate flows. Look for areas with clarity of 2-4 feet.",
      bestTime: "Early morning and late afternoon typically produce the best bite. Willamette Falls fish ladder counts show strongest spring Chinook returns from mid-April through May."
    });
  }

  // Add Cowlitz River Spring Chinook recommendations
  if (month >= 2 && month <= 4) { // March to May
    const cowlitzLocations = [
      "Cowlitz River - Blue Creek",
      "Cowlitz River - Mission Bar"
    ];

    const locationIndex = date.getDate() % cowlitzLocations.length;

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: cowlitzLocations[locationIndex],
      tactics: "Back-bouncing eggs or pulling plugs in deeper holes. Focus on current seams and deeper slots.",
      bait: "Cured salmon eggs, K15 Kwikfish in sardine wrap, or size 5 spinners in red/chartreuse",
      waterConditions: "Spring Chinook prefer moderate flows with slight color. Best fishing when visibility is 2-4 feet.",
      bestTime: "Early morning through mid-day. Cowlitz Salmon Hatchery returns typically peak in late April through mid-May."
    });
  }

  // Add Lewis River Spring Chinook recommendations
  if (month >= 2 && month <= 4 && (date.getDate() % 3 === 0)) { // March to May, every third day
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: "Lewis River - Mouth",
      tactics: "Trolling with herring or spinners near the confluence with the Columbia. Target depths of 12-25 feet.",
      bait: "Cut-plug herring with green flashers, or size 5 spinners in red/copper",
      waterConditions: "Best fishing when Columbia River flows are moderate. Spring Chinook stage near the mouth before moving upstream.",
      bestTime: "Early morning hours through mid-day. Lewis River hatchery returns typically peak in May."
    });
  }

  return recommendations;
};

// Create summer recommendations
export const createSummerRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();

  // Summer Chinook in Columbia River
  if (month >= 5 && month <= 7) {  // June to August
    const columbiaLocations = [
      "Columbia River - Bonneville Dam",
      "Columbia River - Astoria",
      "Columbia River - Portland"
    ];

    const locationIndex = date.getDate() % columbiaLocations.length;

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: columbiaLocations[locationIndex],
      tactics: "Trolling with flashers and herring, back-trolling with plugs, or anchored with spinners in current seams.",
      bait: "Herring with chartreuse or red flashers, K15 or K16 Kwikfish, size 5 or 6 spinners",
      waterConditions: "Target water temperatures between 58-64\u00B0F. Look for current seams and structure where salmon hold.",
      bestTime: "Early morning hours. Bonneville Dam counts show peak summer Chinook passage from mid-June through July."
    });
  }

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
      waterConditions: "Summer steelhead prefer water temperatures between 52-64\u00B0F. Target areas with good oxygenation near the falls.",
      bestTime: "Early morning and evening hours when water temperatures are coolest. Hatchery counts show peak summer steelhead passage at Willamette Falls from June through early August."
    });
  }

  // Summer Steelhead in Cowlitz River
  if (month >= 5 && month <= 7) {  // June to August
    recommendations.push({
      species: "Steelhead",
      location: "Cowlitz River - Blue Creek",
      tactics: "Cast spinners upstream and retrieve through runs, or drift corky and yarn under a float.",
      bait: "Size 4 or 5 spinners in silver/blue, or pink/chartreuse jigs under a float",
      waterConditions: "Target water temperatures between 52-64\u00B0F with moderate flows. Early morning fishing is best when temps rise above 65\u00B0F.",
      bestTime: "Early morning and evening hours. Cowlitz Salmon Hatchery returns show peak summer run timing from late June through July."
    });
  }

  // Lewis River Summer Steelhead
  if (month >= 5 && month <= 7 && date.getDate() % 4 === 0) { // June to August, every fourth day
    recommendations.push({
      species: "Steelhead",
      location: "Lewis River - Hatchery",
      tactics: "Cast spinners or jigs under floats through current seams and tailouts.",
      bait: "Blue/silver spinners, or cerise/orange jigs under a float",
      waterConditions: "Best fishing when water temperatures are between 52-62\u00B0F with moderate clarity.",
      bestTime: "Early morning through mid-morning. Lewis River Hatchery reports typically show peak returns in late June through July."
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
      waterConditions: "Target areas with rocky structure, current breaks, or drop-offs. Smallmouth are most active in water temperatures between 65-75\u00B0F.",
      bestTime: "Early morning, late evening, or night during the hottest parts of summer. Midday fishing can be productive in slightly deeper water."
    });
  }

  // Summer Chinook in Nestucca River
  if (month === 5 && (date.getDate() % 4 === 0 || date.getDate() % 4 === 1)) { // June, more frequently
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: "Nestucca River - Three Rivers",
      tactics: "Drift fishing with eggs or pulling plugs through deeper holes. Focus on deeper slots and current seams.",
      bait: "Cured salmon eggs, or K15/K16 Kwikfish with sardine wrap",
      waterConditions: "Best fishing during moderate flows with slight color. Target water temperatures between 52-62\u00B0F.",
      bestTime: "Early morning hours. ODFW hatchery returns show peak summer Chinook passage from mid-June through early July."
    });
  }

  // Add Tuna recommendations in summer (high priority)
  if (month >= 6 && month <= 8) {  // July to September
    const tunaLocations = ["Oregon Coast - 30-50 miles offshore", "Washington Coast - 40-60 miles offshore"];
    const locationIndex = date.getDate() % tunaLocations.length;

    recommendations.push({
      species: "Albacore Tuna",
      location: tunaLocations[locationIndex],
      tactics: "Trolling with cedar plugs and clones at 6-7 knots. Watch for temperature breaks, bird activity, and jumpers.",
      bait: "Cedar plugs, tuna clones, and live anchovies when available",
      waterConditions: "Target offshore waters with temperatures between 58-64\u00B0F. Look for clean blue water and clear temperature breaks.",
      bestTime: "Early morning and late afternoon typically produce the best bite. Fish the last two hours of incoming tide and first hour of outgoing tide for optimal results.",
      tideInfo: "Fish the last two hours of incoming tide and first hour of outgoing tide for optimal results."
    });
  }

  return recommendations;
};

// Create fall recommendations
export const createFallRecommendations = (date: Date): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  const month = date.getMonth();

  // Fall Chinook recommendations - Columbia River priority
  if (month >= 8 && month <= 10) {  // September to November
    // Columbia River Fall Chinook
    const columbiaLocations = [
      "Columbia River - Bonneville Dam",
      "Columbia River - Astoria",
      "Columbia River - Portland"
    ];

    const locationIndex = date.getDate() % columbiaLocations.length;

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: columbiaLocations[locationIndex],
      tactics: "Trolling with flashers and herring, back-trolling with plugs, or anchored with spinners in current seams.",
      bait: "Herring, sardine-wrapped plugs, or spinners with red/orange/chartreuse blades",
      waterConditions: "Fall Chinook enter the system with the first significant fall rains. Target water temperatures between 50-62\u00B0F.",
      bestTime: "Early morning and evening hours. Bonneville Dam counts show peak returns from late August through early October."
    });

    // Willamette River Fall Chinook
    const fallChinookLocations = [
      "Willamette River - Portland",
      "Willamette River - Oregon City",
      "Multnomah Channel"
    ];

    const willametteIndex = date.getDate() % fallChinookLocations.length;

    recommendations.push({
      species: "Chinook Salmon (King)",
      location: fallChinookLocations[willametteIndex],
      tactics: "Trolling with flashers and herring or back-trolling with plugs in deeper holes and current seams.",
      bait: "Herring, sardine-wrapped plugs, or spinners",
      waterConditions: "Fall Chinook enter the system with the first significant fall rains. Target water temperatures between 50-62\u00B0F.",
      bestTime: "Early morning and evening hours. Columbia River hatchery counts show peak returns in late September through mid-October."
    });
  }

  // Coho recommendations - priority for Columbia and tributaries
  if (month >= 8 && month <= 10) {  // September to November
    // Columbia River Coho
    recommendations.push({
      species: "Coho Salmon (Silver)",
      location: "Columbia River - Astoria",
      tactics: "Trolling with spinners or herring along current seams and near river mouths.",
      bait: "Green/blue spinners, herring with green flashers, or tuna belly strips",
      waterConditions: "Look for water temperatures between 48-58\u00B0F. Coho often move into the system with fall rains.",
      bestTime: "Morning hours, especially after a rain event has increased flows. Peak runs typically occur from mid-September through October based on Columbia River tributary hatchery returns."
    });

    // Willamette/Multnomah Channel Coho
    recommendations.push({
      species: "Coho Salmon (Silver)",
      location: "Multnomah Channel",
      tactics: "Trolling with spinners or herring, or casting spinners from the bank where access allows.",
      bait: "Blue/green spinners, herring, or cured eggs",
      waterConditions: "Look for water temperatures between 48-58\u00B0F. Coho often move into the Willamette system with fall rains, following Columbia River migration patterns.",
      bestTime: "Morning hours, especially after a rain event has increased flows. Peak runs typically occur from mid-September through October based on Columbia River tributary hatchery returns."
    });
  }

  // Cowlitz River Fall Chinook
  if (month >= 8 && month <= 9) { // September and October
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: "Cowlitz River - Mission Bar",
      tactics: "Back-bouncing eggs or pulling plugs along deeper seams and slots. Focus on current breaks and structure.",
      bait: "Cured salmon eggs with tuna oil, or K16 Kwikfish in metallic red/copper",
      waterConditions: "Fall Chinook enter with increasing flows from fall rains. Target water temperatures between 52-62\u00B0F.",
      bestTime: "Early morning and evening hours. Cowlitz Salmon Hatchery reports show peak returns from mid-September through early October."
    });
  }

  // Lewis River Fall Chinook
  if (month >= 8 && month <= 9 && (date.getDate() % 3 === 0)) { // September and October, every third day
    recommendations.push({
      species: "Chinook Salmon (King)",
      location: "Lewis River - Mouth",
      tactics: "Trolling with herring near the confluence with the Columbia, or pulling plugs through deeper holes.",
      bait: "Cut-plug herring with flashers, or K16 Kwikfish with sardine wrap",
      waterConditions: "Fall Chinook stage at the mouth before moving upstream. Target water temperatures between 52-62\u00B0F.",
      bestTime: "Early morning hours. Lewis River Hatchery returns typically peak in late September."
    });
  }

  // Coho in Cowlitz River
  if (month >= 9 && month <= 10) { // October and November
    recommendations.push({
      species: "Coho Salmon (Silver)",
      location: "Cowlitz River - Blue Creek",
      tactics: "Drift fishing with cured eggs or casting spinners in areas with moderate current. Focus on tailouts and current seams.",
      bait: "Blue/silver or green/silver spinners, or cured eggs with blue dye",
      waterConditions: "Coho prefer water temperatures between 48-56\u00B0F with moderate visibility. Look for slightly stained water after rain events.",
      bestTime: "Morning hours, especially after rainfall has increased flows. Cowlitz Salmon Hatchery returns typically show peak Coho returns in mid to late October."
    });
  }

  // Coho in Lewis River
  if (month >= 9 && month <= 10 && (date.getDate() % 3 === 0 || date.getDate() % 3 === 1)) { // October and November, more frequently
    recommendations.push({
      species: "Coho Salmon (Silver)",
      location: "Lewis River - Hatchery",
      tactics: "Casting spinners or drift fishing with eggs. Focus on current seams and tailouts.",
      bait: "Blue/silver spinners, or cured eggs with blue dye",
      waterConditions: "Best fishing when water levels are dropping after a rain event. Target water temperatures between 48-56\u00B0F.",
      bestTime: "Morning hours through mid-day. Lewis River Hatchery typically shows peak Coho returns in mid to late October."
    });
  }

  // Nestucca River Fall Chinook and Coho
  if (month >= 9 && month <= 10) { // October and November
    // Alternate between Chinook and Coho based on date
    if (date.getDate() % 2 === 0) {
      recommendations.push({
        species: "Chinook Salmon (King)",
        location: "Nestucca River - First Bridge",
        tactics: "Drift fishing with eggs or bobber fishing with prawns. Focus on deeper slots and current breaks.",
        bait: "Cured salmon eggs with tuna oil, or fresh prawns",
        waterConditions: "Fall Chinook move upriver with increasing flows from rain events. Target water temperatures between 48-58\u00B0F.",
        bestTime: "Morning hours after rainfall has increased river flows. ODFW fish trap data shows peak returns in early to mid-October."
      });
    } else {
      recommendations.push({
        species: "Coho Salmon (Silver)",
        location: "Nestucca River - Three Rivers",
        tactics: "Casting blue/silver spinners or drift fishing with blue-dyed eggs. Target current seams and tailouts.",
        bait: "Blue/silver spinners, or cured eggs with blue dye",
        waterConditions: "Coho prefer water temperatures between 44-54\u00B0F with moderate visibility. Best fishing when river is dropping after a rain event.",
        bestTime: "Morning hours, especially after rainfall. ODFW fish trap returns typically show peak Coho returns in late October through mid-November."
      });
    }
  }

  return recommendations;
};
