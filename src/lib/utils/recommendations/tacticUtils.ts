
import { FISHING_TACTICS, FISHING_BAITS } from "../../constants/fishingSpecies";

// Functions for fishing tactics and bait recommendations
export const getTacticsForSpecies = (species: string): string[] => {
  if (species.includes("Salmon")) {
    return FISHING_TACTICS.salmon;
  } else if (species.includes("Steelhead")) {
    return FISHING_TACTICS.steelhead;
  } else if (species === "Halibut") {
    return FISHING_TACTICS.halibut;
  } else if (species === "Lingcod") {
    return FISHING_TACTICS.lingcod;
  } else if (species === "Rockfish" || species === "Black Sea Bass" || species === "Cabezon") {
    return FISHING_TACTICS.rockfish;
  } else if (species.includes("Trout")) {
    return FISHING_TACTICS.trout;
  } else if (species.includes("Bass") && !species.includes("Sea")) {
    return FISHING_TACTICS.bass;
  } else if (species === "Sturgeon") {
    return FISHING_TACTICS.sturgeon;
  } else if (species.includes("Tuna")) {
    return FISHING_TACTICS.tuna;
  } else {
    return FISHING_TACTICS.crab;
  }
};

export const getBaitForSpecies = (species: string): string[] => {
  if (species.includes("Salmon")) {
    return FISHING_BAITS.salmon;
  } else if (species.includes("Steelhead")) {
    return FISHING_BAITS.steelhead;
  } else if (species === "Lingcod") {
    return FISHING_BAITS.lingcod;
  } else if (species === "Rockfish" || species === "Black Sea Bass" || species === "Cabezon") {
    return FISHING_BAITS.rockfish;
  } else if (species.includes("Trout")) {
    return FISHING_BAITS.trout;
  } else if (species.includes("Bass") && !species.includes("Sea")) {
    return FISHING_BAITS.bass;
  } else if (species === "Sturgeon") {
    return FISHING_BAITS.sturgeon;
  } else if (species.includes("Tuna")) {
    return FISHING_BAITS.tuna;
  } else {
    return FISHING_BAITS.bottomfish;
  }
};

export const enhanceTactics = (tactics: string, species: string, location: string): string => {
  let enhancedTactics = tactics;
  
  // Enhance tactics with more detailed information based on species and location
  if (species === "Winter Steelhead") {
    if (location && location.includes("Sandy")) {
      enhancedTactics += " Use 15lb mainline with 10-12lb leader and size 2 hooks. Focus on inside seams where fast water meets slow pools. Look for fish to hold along current breaks.";
    } else if (location && location.includes("Cowlitz")) {
      enhancedTactics += " Target water depths of 4-8 feet with moderate flow. Use 3/8-1/2 oz weights to maintain proper depth. Pink and orange presentations are especially effective during winter months.";
    }
  } else if (species === "Coho Salmon") {
    if (location && location.includes("Nestucca")) {
      enhancedTactics += " Fresh chrome fish respond well to bright colors - chartreuse, hot pink, and orange. Look for fish to hold behind large boulders and along current seams.";
    } else if (location && location.includes("Snohomish")) {
      enhancedTactics += " Target the lower sections with tidewater influence. Coho often hold in deeper pools with wood cover. Scent is critical - use additional squid oil or herring scent on lures.";
    }
  } else if (species === "Lingcod") {
    if (location && (location.includes("Puget Sound") || location.includes("Hood Canal"))) {
      enhancedTactics += " Focus on rock piles, underwater ledges and artificial reefs in 60-120 feet of water. Fish the slower parts of tide changes when current allows your jig to stay near bottom.";
    } else if (location && location.includes("Juan De Fuca")) {
      enhancedTactics += " Target underwater plateaus and pinnacles in 80-160 feet. Use heavy jigs (12-16oz) to maintain bottom contact in strong currents. Best fishing occurs during slack tide periods.";
    }
  } else if (species === "Rockfish") {
    if (location && location.includes("Neah Bay")) {
      enhancedTactics += " Fish close to bottom structure in 60-120 feet of water. Use lighter jigs (4-8oz) and keep your presentation within 10 feet of the bottom. Work jigs with sharp, erratic movements.";
    } else if (location && location.includes("San Juan")) {
      enhancedTactics += " Target rocky reefs in 50-100 feet. Multiple hook setups with shrimp flies work well. Fish early morning or evening hours when rockfish are most active.";
    }
  }
  
  // Tuna enhancements
  if (species.includes("Tuna")) {
    enhancedTactics += " Best 25-50 miles offshore in 58-65°F water. Look for temperature breaks, current edges, and bird activity. Albacore typically arrive off the OR/WA coast July through October, with peak action August-September.";
  }

  return enhancedTactics;
};

export const enhanceBait = (bait: string, species: string, location: string): string => {
  let enhancedBait = bait;
  
  // Enhance bait recommendations
  if (species === "Winter Steelhead" && location && location.includes("Nestucca")) {
    enhancedBait += ". Cure eggs with salt, sugar and sodium sulfite for at least 24 hours. Add pink or orange BorX O Fire for additional color.";
  } else if (species === "Coho Salmon" && location && location.includes("Cowlitz")) {
    enhancedBait += ". For spinners, sizes 4-5 work best. Tie cluster eggs in netting material for longer lasting presentations.";
  } else if (species === "Lingcod" && (location && location.includes("Puget Sound") || location.includes("Hood Canal"))) {
    enhancedBait += ". Use extra-large curly tail grubs in white, chartreuse or glow colors. Add scent oils to soft plastics for increased attraction in deeper water.";
  } else if (species === "Rockfish" && location && location.includes("Hood Canal")) {
    enhancedBait += ". Smaller presentations often work better for rockfish. Use 2-4 inch soft plastics or small strips of squid on jigheads for best results.";
  }
  
  return enhancedBait;
};
