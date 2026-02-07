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
  "Rockfish",
  "Black Sea Bass",
  "Cabezon",
  "Surfperch",
  "Dungeness Crab",
  "Shrimp",
  "Sturgeon",
  "Smallmouth Bass",
  "Largemouth Bass",
  "Cutthroat Trout",
  "Rainbow Trout",
  "Brown Trout",
  "Flounder",
  "Sole",
  "Albacore Tuna",
  "Bluefin Tuna"
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
  lingcod: [
    "Jigging with heavy lead-head jigs (8-16 oz)",
    "Trolling with large soft plastics near bottom structure",
    "Bounce bait fishing with live herring or anchovy",
    "Vertical jigging near rocky structure and pinnacles",
    "Drift fishing with large swimbaits over rocky reefs",
    "Using heavy banana weights with herring or squid",
    "Slow trolling with downriggers near underwater shelves"
  ],
  rockfish: [
    "Jigging with shrimp flies",
    "Vertical jigging with metal jigs",
    "Drift fishing with cut herring or squid",
    "Trolling close to rocky structure",
    "Fishing with jig and grub combinations",
    "Using shrimp or crab for bait in rocky areas",
    "Float fishing with small pieces of squid",
    "Bounce bait fishing over rocky reefs"
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
  ],
  tuna: [
    "Trolling with cedar plugs at 6-8 knots",
    "Trolling with hoochies and flashers",
    "Jigging with metal jigs (3-6 oz) in chrome/blue",
    "Live bait fishing with anchovies on circle hooks",
    "Chumming with dead anchovies and casting swimbaits",
    "Trolling Rapala X-Raps behind planer boards",
    "Surface popping with large poppers during feeding frenzies",
    "Casting metal jigs into bird piles and surface boils",
    "Trolling with daisy chains and spreader bars",
    "Slow trolling live bait behind the boat",
    "Trolling with clones or tuna feathers",
    "Kite fishing in choppy conditions",
    "Running and gunning when birds are present",
    "Drifting with chunk baits",
    "Vertical jigging in deeper waters"
  ]
};

// Enhanced baits commonly used
export const FISHING_BAITS = {
  salmon: ["Herring", "Anchovy", "Sand shrimp", "Eggs", "Prawns", "Spinners", "Plugs", "Cured eggs", "Sardine-wrapped plugs", "Tuna belly", "Sardines"],
  steelhead: ["Eggs", "Yarn", "Worms", "Jigs", "Spinners", "Flies", "Beads", "Prawns", "Corkies", "Shrimp"],
  bottomfish: ["Herring", "Squid", "Octopus", "Jigs", "Anchovies",
    "Clams", "Sand shrimp", "Live sandlance",
    "Scampi-tailed jigs", "Soft plastic swimbaits",
    "Metal jigs", "Cut fish", "Crab parts"
  ],
  lingcod: [
    "Live herring", "Live greenling", "Large soft plastic swimbaits",
    "Metal jigs (8-16 oz)", "Cut salmon bellies", "Scampi jigs",
    "Octopus", "Whole squid", "Large curly tail grubs"
  ],
  rockfish: [
    "Shrimp flies", "Herring chunks", "Small soft plastics",
    "Squid strips", "Metal jigs", "Small swimbaits",
    "Curly tail grubs", "Crab pieces", "Clam necks"
  ],
  trout: ["Worms", "Powerbait", "Corn", "Spinners", "Spoons", "Flies", "Eggs", "Mealworms", "Maggots", "Nightcrawlers"],
  bass: ["Soft plastics", "Crankbaits", "Topwater lures", "Spinnerbaits", "Jigs", "Swimbaits", "Frogs", "Crawfish imitations"],
  sturgeon: ["Smelt", "Sand shrimp", "Lamprey", "Squid", "Herring", "Anchovies", "Salmon eggs", "Crawfish", "Pikeminnow"],
  tuna: [
    "Cedar plugs",
    "Tuna clones",
    "Tuna feathers",
    "Live anchovies",
    "Spreader bars",
    "Swimbaits",
    "Chrome/blue metal jigs",
    "Hoochies",
    "Rapala X-Raps",
    "Poppers",
    "Daisy chains",
    "Feather jigs",
    "Sardines",
    "Chunks of mackerel or herring",
    "Surface iron jigs"
  ]
};
