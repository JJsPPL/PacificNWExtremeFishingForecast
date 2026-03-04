
import { FISHING_TACTICS, FISHING_BAITS } from "../../constants/fishingSpecies";

// Functions for fishing tactics and bait recommendations
// Handles both base species ("Steelhead") and calendar sub-types ("Winter Steelhead", "Summer Steelhead")
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
  } else if (species === "Shad") {
    return FISHING_TACTICS.shad;
  } else if (species === "Shrimp" || species.includes("Spot Prawn")) {
    return FISHING_TACTICS.shrimp;
  } else if (species === "Dungeness Crab") {
    return FISHING_TACTICS.crab;
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
  } else if (species === "Shad") {
    return FISHING_BAITS.shad;
  } else if (species === "Shrimp" || species.includes("Spot Prawn")) {
    return FISHING_BAITS.shrimp;
  } else {
    return FISHING_BAITS.bottomfish;
  }
};

export const enhanceTactics = (tactics: string, species: string, location: string): string => {
  let enhancedTactics = tactics;

  // Winter Steelhead enhancements
  if (species === "Winter Steelhead" || (species === "Steelhead" && !species.includes("Summer"))) {
    if (location && location.includes("Sandy")) {
      enhancedTactics += " Use 15lb mainline with 10-12lb leader and size 2 hooks. Focus on inside seams where fast water meets slow pools.";
    } else if (location && location.includes("Cowlitz")) {
      enhancedTactics += " Target water depths of 4-8 feet with moderate flow. Use 3/8-1/2 oz weights. Pink and orange presentations are especially effective.";
    } else if (location && location.includes("Lewis")) {
      enhancedTactics += " Dam-controlled flows from Merwin Dam. Check release schedules. Side-drifting and bobber dogging productive.";
    } else if (location && location.includes("Nestucca")) {
      enhancedTactics += " Best on dropping flows after rain. Green-tinted water with 2-4 feet visibility. Inside seams and tailouts are prime.";
    } else if (location && location.includes("Wilson")) {
      enhancedTactics += " Mills Bridge is primary access. Target deeper holes and current seams after rain events.";
    }
  }

  // Summer Steelhead enhancements
  if (species === "Summer Steelhead") {
    if (location && location.includes("Cowlitz")) {
      enhancedTactics += " Cast spinners upstream and retrieve through runs. Target water 52-64°F. Early morning best when temps rise above 65°F.";
    } else if (location && location.includes("Willamette")) {
      enhancedTactics += " Target areas with good oxygenation near falls. Fish early morning and evening when water temps are coolest.";
    } else if (location && location.includes("Deschutes")) {
      enhancedTactics += " Premier fly water. Swing intruder patterns on sink tips. Focus on camp water and named runs.";
    }
  }

  // Chinook enhancements
  if (species.includes("Chinook")) {
    if (species.includes("Spring") && location && location.includes("Columbia")) {
      enhancedTactics += " Target depths of 15-30 feet. Bonneville Dam counts strongest mid-April through May.";
    } else if (species.includes("Spring") && location && location.includes("Cowlitz")) {
      enhancedTactics += " Focus on current seams and deeper slots. Mission Bar and Blue Creek are primary bank fishing spots.";
    } else if (species.includes("Fall") && location && location.includes("Cowlitz")) {
      enhancedTactics += " Back-bouncing eggs or pulling plugs along deeper seams. Fall Chinook enter with increasing flows.";
    }
  }

  // Coho enhancements
  if (species.includes("Coho")) {
    if (location && location.includes("Nestucca")) {
      enhancedTactics += " Fresh chrome fish respond well to bright colors - chartreuse, hot pink, and orange.";
    } else if (location && location.includes("Snohomish")) {
      enhancedTactics += " Target lower sections with tidewater influence. Scent is critical - use squid oil or herring scent.";
    } else if (location && location.includes("Columbia")) {
      enhancedTactics += " Troll with spinners or herring along current seams and near river mouths.";
    }
  }

  // Lingcod enhancements
  if (species === "Lingcod") {
    if (location && (location.includes("Puget Sound") || location.includes("Hood Canal"))) {
      enhancedTactics += " Focus on rock piles, underwater ledges and artificial reefs in 60-120 feet. Fish slower parts of tide changes.";
    } else if (location && location.includes("Juan De Fuca")) {
      enhancedTactics += " Target underwater plateaus and pinnacles in 80-160 feet. Use heavy jigs (12-16oz) for bottom contact in strong currents.";
    }
  }

  // Rockfish enhancements
  if (species === "Rockfish") {
    if (location && location.includes("Neah Bay")) {
      enhancedTactics += " Fish close to bottom structure in 60-120 feet. Lighter jigs (4-8oz) within 10 feet of bottom.";
    } else if (location && location.includes("San Juan")) {
      enhancedTactics += " Target rocky reefs in 50-100 feet. Multiple hook setups with shrimp flies work well.";
    }
  }

  // Tuna enhancements
  if (species.includes("Tuna")) {
    enhancedTactics += " Best 25-50 miles offshore in 58-65°F water. Look for temperature breaks, current edges, and bird activity.";
  }

  // Sturgeon enhancements
  if (species === "Sturgeon") {
    if (location && location.includes("Willamette")) {
      enhancedTactics += " Deep holes in downtown Portland section concentrate fish in winter. Target 15-40 foot depths.";
    } else if (location && location.includes("Columbia")) {
      enhancedTactics += " Anchor in deep holes with 6-10 oz weights. Target 30-60 foot depths in main channel.";
    }
  }

  // Dungeness Crab enhancements
  if (species === "Dungeness Crab") {
    if (location && location.includes("Hood Canal")) {
      enhancedTactics += " Hoodsport and Quilcene Bay are top spots. Check season dates - Hood Canal opens later than Puget Sound.";
    } else if (location && location.includes("Puget Sound")) {
      enhancedTactics += " Set pots in 30-80 feet on sandy/muddy bottoms. Pull pots at slack tide for best results.";
    }
  }

  // Shrimp enhancements
  if (species === "Shrimp") {
    if (location && location.includes("Hood Canal")) {
      enhancedTactics += " Hood Canal is THE premier spot shrimp fishery in WA. Set pots 200-400 feet. Limit often filled in hours on opening day.";
    }
  }

  return enhancedTactics;
};

export const enhanceBait = (bait: string, species: string, location: string): string => {
  let enhancedBait = bait;

  if ((species === "Winter Steelhead" || species === "Steelhead") && location && location.includes("Nestucca")) {
    enhancedBait += ". Cure eggs with salt, sugar and sodium sulfite for at least 24 hours. Add pink or orange BorX O Fire.";
  } else if (species.includes("Coho") && location && location.includes("Cowlitz")) {
    enhancedBait += ". For spinners, sizes 4-5 work best. Tie cluster eggs in netting for longer lasting presentations.";
  } else if (species === "Lingcod" && location && (location.includes("Puget Sound") || location.includes("Hood Canal"))) {
    enhancedBait += ". Use extra-large curly tail grubs in white, chartreuse or glow. Add scent oils for deeper water.";
  } else if (species === "Rockfish" && location && location.includes("Hood Canal")) {
    enhancedBait += ". Smaller presentations work better. Use 2-4 inch soft plastics or small squid strips on jigheads.";
  } else if (species.includes("Chinook") && species.includes("Spring") && location && location.includes("Cowlitz")) {
    enhancedBait += ". Cured eggs with shrimp oil are deadly. K15 Kwikfish in sardine wrap for plug pulling.";
  }

  return enhancedBait;
};
