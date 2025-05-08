
import { FISHING_TACTICS, FISHING_BAITS } from "../../constants/fishingSpecies";

// Functions for fishing tactics and bait recommendations
export const getTacticsForSpecies = (species: string): string[] => {
  if (species.includes("Salmon")) {
    return FISHING_TACTICS.salmon;
  } else if (species.includes("Steelhead")) {
    return FISHING_TACTICS.steelhead;
  } else if (species === "Halibut" || species === "Lingcod") {
    return FISHING_TACTICS.halibut;
  } else if (species.includes("Trout")) {
    return FISHING_TACTICS.trout;
  } else if (species.includes("Bass")) {
    return FISHING_TACTICS.bass;
  } else if (species === "Sturgeon") {
    return FISHING_TACTICS.sturgeon;
  } else {
    return FISHING_TACTICS.crab;
  }
};

export const getBaitForSpecies = (species: string): string[] => {
  if (species.includes("Salmon")) {
    return FISHING_BAITS.salmon;
  } else if (species.includes("Steelhead")) {
    return FISHING_BAITS.steelhead;
  } else if (species.includes("Trout")) {
    return FISHING_BAITS.trout;
  } else if (species.includes("Bass")) {
    return FISHING_BAITS.bass;
  } else if (species === "Sturgeon") {
    return FISHING_BAITS.sturgeon;
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
  }
  
  return enhancedBait;
};
