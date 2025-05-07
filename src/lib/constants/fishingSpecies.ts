
// List of fish species in the PNW
export const PNW_FISH_SPECIES = [
  "Chinook Salmon (King)",
  "Coho Salmon (Silver)",
  "Sockeye Salmon (Red)",
  "Pink Salmon (Humpy)",
  "Chum Salmon (Dog)",
  "Steelhead",
  "Halibut",
  "Lingcod",
  "Dungeness Crab",
  "Shrimp",
  "Sturgeon",
  "Smallmouth Bass",
  "Largemouth Bass",
  "Cutthroat Trout",
  "Rainbow Trout",
  "Brown Trout"
];

// Extended fishing tactics based on species
export const FISHING_TACTICS = {
  salmon: [
    "Trolling with flashers and herring",
    "Jigging with buzz bombs",
    "Drift fishing with eggs",
    "Bobber fishing with eggs",
    "Back-bouncing roe",
    "Plunking with Spin-N-Glo",
    "Float fishing with sand shrimp",
    "Pulling plugs in deep holes",
    "Side drifting with yarn balls",
    "Trolling with Cut Plug herring",
    "Trolling with hoochies",
    "Backtrolling with Kwikfish",
    "Backtrolling with sardine-wrapped plugs",
    "Casting spinners in tailouts",
    "Fishing tidewater with herring"
  ],
  steelhead: [
    "Drift fishing with eggs",
    "Swinging flies",
    "Float fishing with jigs",
    "Side drifting with yarn balls",
    "Casting spinners in pocket water",
    "Plunking with Spin-N-Glo in high water",
    "Bobber dogging with beads",
    "Float fishing with prawns",
    "Run-and-gun with spoons",
    "Swinging intruder patterns on sink tips",
    "Nymphing with stonefly patterns",
    "High-sticking pocket water"
  ],
  halibut: [
    "Jigging with large jigs",
    "Drift fishing with herring",
    "Weighted bait near bottom",
    "Trolling with heavy spreader bars",
    "Bouncing scented squid"
  ],
  trout: [
    "Dry fly fishing",
    "Nymphing with indicators",
    "Euro nymphing",
    "Streamer fishing",
    "Spinner casting",
    "Spoon casting",
    "Bait fishing with worms",
    "Trolling with wedding rings",
    "Trolling with flashers and worms"
  ],
  bass: [
    "Drop shotting soft plastics",
    "Crankbait fishing around structure",
    "Topwater at dawn and dusk",
    "Jerkbait fishing in clear water",
    "Jig fishing around rocks",
    "Carolina rig in deeper water",
    "Spinnerbait in murky water"
  ],
  crab: [
    "Pot fishing with chicken or turkey",
    "Ring nets in estuaries",
    "Baiting with fish carcasses",
    "Night fishing with lanterns"
  ],
  sturgeon: [
    "Bottom fishing with smelt",
    "Bottom fishing with sand shrimp",
    "Bottom fishing with lamprey",
    "Anchoring in deep holes",
    "Fishing mudlines during tide changes"
  ]
};

// Enhanced baits commonly used
export const FISHING_BAITS = {
  salmon: ["Herring", "Anchovy", "Sand shrimp", "Eggs", "Prawns", "Spinners", "Plugs", "Cured eggs", "Sardine-wrapped plugs", "Tuna belly", "Sardines"],
  steelhead: ["Eggs", "Yarn", "Worms", "Jigs", "Spinners", "Flies", "Beads", "Prawns", "Corkies", "Shrimp"],
  bottomfish: ["Herring", "Squid", "Octopus", "Jigs", "Anchovies", "Clams", "Sand shrimp"],
  trout: ["Worms", "Powerbait", "Corn", "Spinners", "Spoons", "Flies", "Eggs", "Mealworms", "Maggots", "Nightcrawlers"],
  bass: ["Soft plastics", "Crankbaits", "Topwater lures", "Spinnerbaits", "Jigs", "Swimbaits", "Frogs", "Crawfish imitations"],
  sturgeon: ["Smelt", "Sand shrimp", "Lamprey", "Squid", "Herring", "Anchovies", "Salmon eggs", "Crawfish", "Pikeminnow"]
};
