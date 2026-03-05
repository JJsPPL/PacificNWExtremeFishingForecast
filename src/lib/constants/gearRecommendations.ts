// Gear recommendations with Amazon affiliate links
// Affiliate tag: pacnwfishingc-20

export interface GearItem {
  name: string;
  category: 'rod' | 'reel' | 'line' | 'terminal' | 'lure' | 'accessory' | 'apparel' | 'electronics';
  description: string;
  priceRange: string;
  amazonUrl: string;
  partnerUrl?: string; // ColdWaterStrong or other affiliate partners
  seasonal?: boolean; // Only show during certain conditions
  coldWeather?: boolean; // Show when temps below 45F
}

export interface FeaturedProduct {
  name: string;
  asin: string;
  url: string;
  speciesTags: string[];
  categoryIcon: 'lure' | 'terminal' | 'line' | 'accessory';
  priceRange: string;
}

export interface SpeciesGearProfile {
  essentials: GearItem[]; // Always show these
  recommended: GearItem[]; // Show 2-3 of these contextually
  coldWeatherGear?: GearItem[]; // Show when cold conditions
}

const TAG = 'pacnwfishingc-20';

// Helper to build Amazon search URLs with affiliate tag
const amazonSearch = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${TAG}`;

// Helper to build Amazon product category URLs
const amazonLink = (keywords: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=${TAG}`;

// ColdWaterStrong partner links (update with actual affiliate URLs when available)
const CWS_BASE = 'https://www.coldwaterstrong.com';

export const GEAR_BY_SPECIES: Record<string, SpeciesGearProfile> = {
  // ===== SALMON (all types) =====
  salmon: {
    essentials: [
      {
        name: "Salmon/Steelhead Rod 8'6\"-10'6\" Medium-Heavy",
        category: 'rod',
        description: 'Sensitive tip for detecting bites, backbone for fighting kings',
        priceRange: '$60-$200',
        amazonUrl: amazonSearch('salmon steelhead fishing rod medium heavy'),
      },
      {
        name: 'Spinning or Level-Wind Reel (3000-5000)',
        category: 'reel',
        description: 'Smooth drag system, 15-20lb capacity',
        priceRange: '$40-$150',
        amazonUrl: amazonSearch('salmon fishing reel spinning level wind'),
      },
      {
        name: '15-30lb Monofilament or Braided Line',
        category: 'line',
        description: 'Braid mainline with 15-20lb fluorocarbon leader',
        priceRange: '$10-$25',
        amazonUrl: amazonSearch('salmon fishing line braided 30lb'),
      },
    ],
    recommended: [
      {
        name: 'Egg Cure Kit (BorX O Fire, Pro-Cure)',
        category: 'terminal',
        description: 'Cure your own salmon eggs for drift fishing',
        priceRange: '$8-$20',
        amazonUrl: amazonSearch('salmon egg cure borx fire pro cure'),
      },
      {
        name: 'Spin-N-Glo & Corky Assortment',
        category: 'lure',
        description: 'Classic PNW plunking setup — multiple colors',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('spin n glo corky salmon fishing'),
      },
      {
        name: 'Kwikfish / FlatFish Plugs',
        category: 'lure',
        description: 'Sardine-wrapped plugs for backtrolling',
        priceRange: '$8-$18',
        amazonUrl: amazonSearch('kwikfish flatfish salmon plug lure'),
      },
      {
        name: 'Flashers & Dodgers (11" Pro-Troll)',
        category: 'terminal',
        description: 'Essential for trolling — attracts salmon with flash',
        priceRange: '$8-$20',
        amazonUrl: amazonSearch('salmon trolling flasher dodger pro troll'),
      },
      {
        name: 'Drift Fishing Weights (pencil lead, slinky)',
        category: 'terminal',
        description: 'Pencil lead or slinky weights for river drift rigs',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('drift fishing pencil lead slinky weight salmon'),
      },
    ],
    coldWeatherGear: [
      {
        name: 'Neoprene Fishing Gloves',
        category: 'apparel',
        description: 'Keep hands warm while maintaining grip and feel',
        priceRange: '$15-$35',
        amazonUrl: amazonSearch('neoprene fishing gloves waterproof'),
        coldWeather: true,
      },
    ],
  },

  // ===== STEELHEAD =====
  steelhead: {
    essentials: [
      {
        name: "Steelhead Float Rod 10'6\"-13' Medium",
        category: 'rod',
        description: 'Long rod for float/drift techniques — sensitive tip',
        priceRange: '$80-$250',
        amazonUrl: amazonSearch('steelhead float fishing rod 10 foot medium'),
      },
      {
        name: 'Centerpin or Spinning Reel',
        category: 'reel',
        description: 'Centerpin for perfect drifts, spinning for versatility',
        priceRange: '$50-$300',
        amazonUrl: amazonSearch('centerpin reel steelhead fishing'),
      },
      {
        name: '8-12lb Fluorocarbon Leader',
        category: 'line',
        description: 'Invisible in clear winter/summer steelhead water',
        priceRange: '$8-$18',
        amazonUrl: amazonSearch('fluorocarbon leader 10lb steelhead'),
      },
    ],
    recommended: [
      {
        name: 'Steelhead Jigs (marabou, rabbit fur)',
        category: 'lure',
        description: 'Hot pink, cerise, black — PNW staples under a float',
        priceRange: '$4-$12',
        amazonUrl: amazonSearch('steelhead jig marabou rabbit fur pink'),
      },
      {
        name: 'Slip Floats & Bobber Stops',
        category: 'terminal',
        description: 'Adjust depth easily — essential for float fishing',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('steelhead slip float bobber stop'),
      },
      {
        name: 'Bead Assortment (8mm-12mm)',
        category: 'lure',
        description: 'Natural roe imitation — pegged above hook',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('steelhead beads fishing 10mm trout'),
      },
      {
        name: 'Spey/Switch Rod 11\'-13\' (7-8wt)',
        category: 'rod',
        description: 'For swinging flies in bigger rivers',
        priceRange: '$150-$400',
        amazonUrl: amazonSearch('spey switch fly rod steelhead 7 weight'),
      },
      {
        name: 'Intruder & Leech Fly Patterns',
        category: 'lure',
        description: 'Swinging flies for aggressive winter steelhead',
        priceRange: '$3-$8 each',
        amazonUrl: amazonSearch('steelhead intruder fly pattern'),
      },
    ],
    coldWeatherGear: [
      {
        name: 'Insulated Wading Boots',
        category: 'apparel',
        description: 'Felt or rubber sole — warm feet in cold PNW rivers',
        priceRange: '$80-$200',
        amazonUrl: amazonSearch('insulated wading boots felt sole fishing'),
        partnerUrl: `${CWS_BASE}/collections/wading-boots`,
        coldWeather: true,
      },
      {
        name: 'Breathable Waders (Stockingfoot)',
        category: 'apparel',
        description: 'Essential for PNW river fishing year-round',
        priceRange: '$100-$400',
        amazonUrl: amazonSearch('breathable stockingfoot waders fishing'),
        partnerUrl: `${CWS_BASE}/collections/waders`,
        coldWeather: true,
      },
    ],
  },

  // ===== HALIBUT =====
  halibut: {
    essentials: [
      {
        name: "Halibut Rod 5'6\"-6'6\" Heavy/Extra-Heavy",
        category: 'rod',
        description: 'Short, stout rod for hauling big halibut from depth',
        priceRange: '$80-$250',
        amazonUrl: amazonSearch('halibut fishing rod heavy 6 foot'),
      },
      {
        name: 'Conventional Reel (size 30-50)',
        category: 'reel',
        description: 'High drag capacity, 65lb+ braid capacity',
        priceRange: '$80-$300',
        amazonUrl: amazonSearch('conventional fishing reel halibut 40 size'),
      },
      {
        name: '65-80lb Braided Line + 80lb Leader',
        category: 'line',
        description: 'No-stretch braid for feeling bites at 200+ feet',
        priceRange: '$20-$40',
        amazonUrl: amazonSearch('braided fishing line 65lb halibut'),
      },
    ],
    recommended: [
      {
        name: 'Halibut Jigs (8-16oz)',
        category: 'lure',
        description: 'Heavy leadhead jigs with curly tail or swimbaits',
        priceRange: '$8-$20',
        amazonUrl: amazonSearch('halibut jig 16oz heavy leadhead'),
      },
      {
        name: 'Circle Hooks (8/0-12/0)',
        category: 'terminal',
        description: 'Required in many areas — better hookups, easier release',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('circle hook 10/0 halibut fishing'),
      },
      {
        name: 'Spreader Bar / Halibut Rig',
        category: 'terminal',
        description: 'Bottom fishing rig with dual hooks and bait clip',
        priceRange: '$8-$15',
        amazonUrl: amazonSearch('halibut spreader bar bottom rig'),
      },
    ],
  },

  // ===== LINGCOD =====
  lingcod: {
    essentials: [
      {
        name: "Lingcod Rod 6'-7' Heavy Action",
        category: 'rod',
        description: 'Stiff rod for pulling lings off rocky structure',
        priceRange: '$70-$200',
        amazonUrl: amazonSearch('lingcod fishing rod heavy action bottomfish'),
      },
      {
        name: 'Conventional or Large Spinning Reel',
        category: 'reel',
        description: '40-60lb line capacity, strong drag for reef fishing',
        priceRange: '$60-$200',
        amazonUrl: amazonSearch('lingcod reel conventional bottomfish'),
      },
      {
        name: 'Large Swimbaits (6"-10")',
        category: 'lure',
        description: 'Lingcod love big soft plastics near structure',
        priceRange: '$6-$15',
        amazonUrl: amazonSearch('large swimbait lingcod 8 inch soft plastic'),
      },
    ],
    recommended: [
      {
        name: 'Heavy Jig Heads (4-16oz)',
        category: 'terminal',
        description: 'Get your bait to the bottom in current',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('heavy jig head 8oz 16oz lingcod rockfish'),
      },
      {
        name: 'Banana Weights (8-24oz)',
        category: 'terminal',
        description: 'For drift fishing with bait near rocky reefs',
        priceRange: '$8-$15',
        amazonUrl: amazonSearch('banana weight sinker 16oz bottom fishing'),
      },
    ],
  },

  // ===== ROCKFISH =====
  rockfish: {
    essentials: [
      {
        name: "Rockfish/Bottomfish Rod 6'-7' Medium-Heavy",
        category: 'rod',
        description: 'Sensitive enough to feel bites at depth',
        priceRange: '$60-$180',
        amazonUrl: amazonSearch('rockfish bottomfish rod medium heavy'),
      },
      {
        name: 'Shrimp Fly Rigs (3-hook)',
        category: 'lure',
        description: 'Classic PNW rockfish setup — neon colors',
        priceRange: '$4-$10',
        amazonUrl: amazonSearch('shrimp fly rig rockfish 3 hook'),
      },
      {
        name: 'Metal Jigs (4-8oz)',
        category: 'lure',
        description: 'Chrome or glow — vertical jigging over structure',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('metal jig 6oz rockfish chrome glow'),
      },
    ],
    recommended: [
      {
        name: 'Squid Strips & Herring Chunks',
        category: 'terminal',
        description: 'Tip your jigs for extra scent attraction',
        priceRange: '$5-$10',
        amazonUrl: amazonSearch('fishing bait squid strip scent'),
      },
    ],
  },

  // ===== TROUT =====
  trout: {
    essentials: [
      {
        name: "Trout Spinning Rod 6'-7' Ultralight/Light",
        category: 'rod',
        description: 'Light action for feeling subtle trout bites',
        priceRange: '$30-$120',
        amazonUrl: amazonSearch('ultralight trout spinning rod'),
      },
      {
        name: 'Spinning Reel (1000-2500 size)',
        category: 'reel',
        description: 'Smooth drag, 4-8lb line capacity',
        priceRange: '$25-$100',
        amazonUrl: amazonSearch('ultralight spinning reel trout 2000'),
      },
      {
        name: '4-6lb Monofilament or Fluorocarbon',
        category: 'line',
        description: 'Light line for wary trout in clear PNW streams',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('trout fishing line 4lb fluorocarbon'),
      },
    ],
    recommended: [
      {
        name: 'Inline Spinners (Rooster Tail, Panther Martin)',
        category: 'lure',
        description: 'Cast and retrieve — deadly for trout in moving water',
        priceRange: '$4-$8',
        amazonUrl: amazonSearch('rooster tail panther martin trout spinner'),
      },
      {
        name: 'Fly Rod 9\' 5wt (for fly fishing)',
        category: 'rod',
        description: 'Versatile weight for PNW trout streams and lakes',
        priceRange: '$80-$300',
        amazonUrl: amazonSearch('fly rod 9 foot 5 weight trout'),
      },
      {
        name: 'Trout Fly Assortment (dry, nymph, streamer)',
        category: 'lure',
        description: 'Adams, Elk Hair Caddis, Pheasant Tail, Woolly Bugger',
        priceRange: '$10-$25',
        amazonUrl: amazonSearch('trout fly assortment dry nymph streamer'),
      },
      {
        name: 'PowerBait & Dough Bait',
        category: 'lure',
        description: 'Perfect for stocked trout in lakes — chartreuse, rainbow',
        priceRange: '$4-$8',
        amazonUrl: amazonSearch('powerbait trout bait chartreuse rainbow'),
      },
    ],
  },

  // ===== BASS =====
  bass: {
    essentials: [
      {
        name: "Bass Rod 6'6\"-7' Medium/Medium-Heavy",
        category: 'rod',
        description: 'Versatile for casting plastics, crankbaits, and topwater',
        priceRange: '$40-$150',
        amazonUrl: amazonSearch('bass fishing rod medium heavy casting'),
      },
      {
        name: 'Baitcasting or Spinning Reel',
        category: 'reel',
        description: 'Baitcaster for accuracy, spinning for finesse',
        priceRange: '$40-$150',
        amazonUrl: amazonSearch('bass fishing baitcasting reel'),
      },
      {
        name: 'Soft Plastic Worms & Creature Baits',
        category: 'lure',
        description: 'Senko, crawfish, creature baits — Texas or wacky rigged',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('senko worm soft plastic bass fishing'),
      },
    ],
    recommended: [
      {
        name: 'Topwater Lures (frog, popper, buzzbait)',
        category: 'lure',
        description: 'Explosive surface strikes at dawn/dusk',
        priceRange: '$6-$15',
        amazonUrl: amazonSearch('topwater bass lure frog popper buzzbait'),
      },
      {
        name: 'Crankbaits & Jerkbaits',
        category: 'lure',
        description: 'Cover water quickly — match depth to structure',
        priceRange: '$6-$15',
        amazonUrl: amazonSearch('crankbait jerkbait bass fishing'),
      },
    ],
  },

  // ===== STURGEON =====
  sturgeon: {
    essentials: [
      {
        name: "Sturgeon Rod 7'-9' Heavy/Extra-Heavy",
        category: 'rod',
        description: 'Heavy backbone for 100lb+ fish from the bank or boat',
        priceRange: '$80-$250',
        amazonUrl: amazonSearch('sturgeon fishing rod heavy 8 foot'),
      },
      {
        name: 'Large Conventional Reel (size 40-60)',
        category: 'reel',
        description: 'High drag, 80lb+ line capacity for big fish',
        priceRange: '$80-$300',
        amazonUrl: amazonSearch('sturgeon fishing reel conventional large'),
      },
      {
        name: '80-100lb Braided Line',
        category: 'line',
        description: 'No-stretch braid for feeling subtle sturgeon bites',
        priceRange: '$20-$40',
        amazonUrl: amazonSearch('braided fishing line 80lb sturgeon'),
      },
    ],
    recommended: [
      {
        name: 'Sturgeon Rig (sliding sinker, bead, swivel)',
        category: 'terminal',
        description: 'Heavy sinker (6-24oz), bead, barrel swivel, 24" leader',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('sturgeon rig sliding sinker leader'),
      },
      {
        name: 'Circle Hooks (7/0-10/0)',
        category: 'terminal',
        description: 'Required for catch-and-release sturgeon fishing',
        priceRange: '$5-$10',
        amazonUrl: amazonSearch('circle hook 8/0 sturgeon fishing'),
      },
      {
        name: 'Rod Holder / Bank Stick',
        category: 'accessory',
        description: 'Hold your rod while waiting — sturgeon is a patience game',
        priceRange: '$15-$40',
        amazonUrl: amazonSearch('fishing rod holder bank stick sturgeon'),
      },
    ],
  },

  // ===== CRAB =====
  crab: {
    essentials: [
      {
        name: 'Crab Pots / Ring Nets',
        category: 'accessory',
        description: 'Collapsible ring nets for dock fishing, pots for boat',
        priceRange: '$20-$80',
        amazonUrl: amazonSearch('crab pot ring net dungeness'),
      },
      {
        name: 'Crab Gauge (Dungeness measure)',
        category: 'accessory',
        description: 'Required by law — measure before keeping',
        priceRange: '$5-$10',
        amazonUrl: amazonSearch('crab gauge dungeness measure tool'),
      },
      {
        name: 'Bait Cage & Bait (chicken, turkey, fish)',
        category: 'terminal',
        description: 'Bait cage keeps bait secure, attracts crabs from distance',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('crab bait cage container trap'),
      },
    ],
    recommended: [
      {
        name: 'Crab Gloves (rubber coated)',
        category: 'apparel',
        description: 'Protect hands from pinches while handling crabs',
        priceRange: '$10-$20',
        amazonUrl: amazonSearch('crab fishing gloves rubber coated'),
      },
      {
        name: 'Crab Cooler / Basket',
        category: 'accessory',
        description: 'Keep your catch alive and fresh',
        priceRange: '$15-$40',
        amazonUrl: amazonSearch('crab basket cooler live fishing'),
      },
    ],
  },

  // ===== SHRIMP =====
  shrimp: {
    essentials: [
      {
        name: 'Shrimp Pots (2-4 pot starter set)',
        category: 'accessory',
        description: 'Standard PNW shrimp pots for spot prawns',
        priceRange: '$30-$80',
        amazonUrl: amazonSearch('shrimp pot trap spot prawn fishing'),
      },
      {
        name: 'Shrimp Pot Line & Buoys',
        category: 'accessory',
        description: '200-400ft of weighted line with marker buoy',
        priceRange: '$15-$40',
        amazonUrl: amazonSearch('shrimp pot line buoy marker'),
      },
      {
        name: 'Pot Puller (manual or electric)',
        category: 'accessory',
        description: 'Save your back pulling pots from 200+ feet',
        priceRange: '$50-$500',
        amazonUrl: amazonSearch('shrimp pot puller manual electric'),
      },
    ],
    recommended: [
      {
        name: 'Bait Pellets & Cat Food',
        category: 'terminal',
        description: 'Commercial bait pellets or canned cat food in bait jar',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('shrimp pot bait pellets fishing'),
      },
    ],
  },

  // ===== TUNA =====
  tuna: {
    essentials: [
      {
        name: "Tuna Rod 6'-7' Heavy Action",
        category: 'rod',
        description: 'Roller guides, heavy backbone for albacore',
        priceRange: '$100-$350',
        amazonUrl: amazonSearch('albacore tuna fishing rod heavy roller'),
      },
      {
        name: 'Conventional Reel (size 30-50)',
        category: 'reel',
        description: 'High-speed retrieve, strong drag for pelagics',
        priceRange: '$100-$400',
        amazonUrl: amazonSearch('tuna fishing reel conventional 40'),
      },
      {
        name: 'Cedar Plugs & Tuna Feathers',
        category: 'lure',
        description: 'Classic trolling setup for PNW albacore',
        priceRange: '$5-$15',
        amazonUrl: amazonSearch('cedar plug tuna feather trolling lure'),
      },
    ],
    recommended: [
      {
        name: 'Trolling Spreader Bars & Daisy Chains',
        category: 'lure',
        description: 'Simulate baitfish schools — triggers strikes',
        priceRange: '$15-$40',
        amazonUrl: amazonSearch('tuna trolling spreader bar daisy chain'),
      },
      {
        name: 'Metal Jigs (3-6oz chrome/blue)',
        category: 'lure',
        description: 'Vertical jigging when tuna are located on sonar',
        priceRange: '$8-$20',
        amazonUrl: amazonSearch('tuna metal jig 4oz chrome blue'),
      },
      {
        name: 'Live Bait Tank / Aerator',
        category: 'accessory',
        description: 'Keep anchovies alive for live bait fishing',
        priceRange: '$30-$100',
        amazonUrl: amazonSearch('live bait tank aerator fishing boat'),
      },
    ],
  },

  // ===== SURFPERCH =====
  surfperch: {
    essentials: [
      {
        name: "Surf Rod 9'-11' Medium Action",
        category: 'rod',
        description: 'Long casting distance from the beach',
        priceRange: '$40-$120',
        amazonUrl: amazonSearch('surf fishing rod 10 foot medium perch'),
      },
      {
        name: 'Spinning Reel (3000-4000 size)',
        category: 'reel',
        description: 'Saltwater rated, smooth drag for surf fishing',
        priceRange: '$30-$100',
        amazonUrl: amazonSearch('surf fishing spinning reel 4000 saltwater'),
      },
      {
        name: 'Sand Shrimp & Clam Necks',
        category: 'terminal',
        description: 'Natural baits — the #1 surfperch producers',
        priceRange: '$5-$10',
        amazonUrl: amazonSearch('sand shrimp bait fishing surf perch'),
      },
    ],
    recommended: [
      {
        name: 'Grub Jigs (1/4-1/2oz)',
        category: 'lure',
        description: 'Berkley Gulp sandworm or grubs on jig heads',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('berkley gulp sandworm surfperch jig'),
      },
      {
        name: 'Surf Fishing Waders (hip or chest)',
        category: 'apparel',
        description: 'Get past the breakers for better casting',
        priceRange: '$40-$150',
        amazonUrl: amazonSearch('surf fishing waders hip chest'),
        partnerUrl: `${CWS_BASE}/collections/waders`,
      },
    ],
  },

  // ===== SHAD =====
  shad: {
    essentials: [
      {
        name: "Light Spinning Rod 6'-7' Ultralight",
        category: 'rod',
        description: 'Fun fight on light tackle — shad pull hard!',
        priceRange: '$25-$80',
        amazonUrl: amazonSearch('ultralight spinning rod shad fishing'),
      },
      {
        name: 'Shad Darts (1/16-1/4oz assortment)',
        category: 'lure',
        description: 'Chartreuse, white, pink — cast upstream, slow swing',
        priceRange: '$5-$12',
        amazonUrl: amazonSearch('shad dart jig assortment fishing'),
      },
      {
        name: 'Small Spoons & Spinners',
        category: 'lure',
        description: 'Kastmaster-style spoons in 1/8-1/4oz',
        priceRange: '$5-$10',
        amazonUrl: amazonSearch('small spoon kastmaster shad fishing'),
      },
    ],
    recommended: [],
  },
};

// ===== UNIVERSAL GEAR (shown for all species) =====
export const UNIVERSAL_GEAR: GearItem[] = [
  {
    name: 'Fishing Tackle Box / Bag',
    category: 'accessory',
    description: 'Organize all your terminal tackle and lures',
    priceRange: '$15-$50',
    amazonUrl: amazonSearch('fishing tackle box bag waterproof'),
  },
  {
    name: 'Polarized Fishing Sunglasses',
    category: 'accessory',
    description: 'See through glare — spot fish, protect eyes',
    priceRange: '$15-$50',
    amazonUrl: amazonSearch('polarized fishing sunglasses'),
  },
  {
    name: 'Fishing Net (rubber mesh)',
    category: 'accessory',
    description: 'Rubber mesh for easy catch & release, no tangles',
    priceRange: '$20-$60',
    amazonUrl: amazonSearch('fishing landing net rubber mesh'),
  },
];

// ===== COLD WEATHER GEAR (shown when temps < 45F or winter months) =====
export const COLD_WEATHER_GEAR: GearItem[] = [
  {
    name: 'Insulated Rain Jacket',
    category: 'apparel',
    description: 'Waterproof, breathable — PNW rain is no joke',
    priceRange: '$60-$200',
    amazonUrl: amazonSearch('waterproof fishing rain jacket insulated'),
    partnerUrl: `${CWS_BASE}/collections/jackets`,
    coldWeather: true,
  },
  {
    name: 'Merino Wool Base Layer',
    category: 'apparel',
    description: 'Stays warm when wet — critical for PNW winter fishing',
    priceRange: '$30-$80',
    amazonUrl: amazonSearch('merino wool base layer fishing'),
    partnerUrl: `${CWS_BASE}/collections/base-layers`,
    coldWeather: true,
  },
  {
    name: 'Hand Warmers (reusable or disposable)',
    category: 'accessory',
    description: 'Keep hands functional during cold morning sessions',
    priceRange: '$5-$20',
    amazonUrl: amazonSearch('hand warmers reusable fishing'),
    coldWeather: true,
  },
];

// ===== SEASONAL ACCESSORIES =====
export const SEASONAL_GEAR: Record<string, GearItem[]> = {
  winter: [
    {
      name: 'Headlamp (rechargeable)',
      category: 'electronics',
      description: 'Early morning launches and late evening packups',
      priceRange: '$15-$40',
      amazonUrl: amazonSearch('rechargeable headlamp fishing waterproof'),
      seasonal: true,
    },
  ],
  summer: [
    {
      name: 'Sun Protection (buff, hat, sunscreen)',
      category: 'apparel',
      description: 'SPF 50+ fishing shirt, buff, and wide-brim hat',
      priceRange: '$10-$40',
      amazonUrl: amazonSearch('fishing sun protection shirt buff hat SPF'),
      seasonal: true,
    },
    {
      name: 'Insulated Water Bottle',
      category: 'accessory',
      description: 'Stay hydrated on long summer fishing days',
      priceRange: '$15-$35',
      amazonUrl: amazonSearch('insulated water bottle fishing outdoor'),
      seasonal: true,
    },
  ],
};

// ===== FEATURED PICKS (personal favorites with direct product links) =====
const amazonProduct = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    name: "Graybill's Tuna Belly Bait Scent",
    asin: 'B08CS4RW9S',
    url: amazonProduct('B08CS4RW9S'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$12-$18',
  },
  {
    name: 'Pro-Cure Slam-Ola Garlic Powder Egg Cure',
    asin: 'B00C92I1T4',
    url: amazonProduct('B00C92I1T4'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$8-$14',
  },
  {
    name: "Keith Archer's Ultimate Shrimp Cure High Octane",
    asin: 'B0CYK34LNQ',
    url: amazonProduct('B0CYK34LNQ'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$14-$20',
  },
  {
    name: "Graybill's Bait Scent 8oz",
    asin: 'B09787T4WX',
    url: amazonProduct('B09787T4WX'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$12-$18',
  },
  {
    name: 'Trout Magnet S.O.S. Fishing Line 6lb',
    asin: 'B005AUI5O8',
    url: amazonProduct('B005AUI5O8'),
    speciesTags: ['trout'],
    categoryIcon: 'line',
    priceRange: '$6-$10',
  },
  {
    name: "Keith Archer's Shrimp Cure Standard",
    asin: 'B0CYJTYWDC',
    url: amazonProduct('B0CYJTYWDC'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$12-$16',
  },
  {
    name: "Graybill's Bait Scent (variant)",
    asin: 'B09787Z3PF',
    url: amazonProduct('B09787Z3PF'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$12-$18',
  },
  {
    name: 'Pro-Cure UV Glow Egg Cure Double Red',
    asin: 'B00C92I14Y',
    url: amazonProduct('B00C92I14Y'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$8-$14',
  },
  {
    name: 'Mepps Black Fury Spinner',
    asin: 'B00E3XMNOQ',
    url: amazonProduct('B00E3XMNOQ'),
    speciesTags: ['trout', 'steelhead', 'bass'],
    categoryIcon: 'lure',
    priceRange: '$5-$9',
  },
  {
    name: "Pro-Cure Brine 'N Bite 20oz",
    asin: 'B0010FQ5JY',
    url: amazonProduct('B0010FQ5JY'),
    speciesTags: ['salmon', 'steelhead'],
    categoryIcon: 'terminal',
    priceRange: '$10-$16',
  },
  {
    name: 'Pro-Cure Anise Plus Bait Oil',
    asin: 'B00C92GQBO',
    url: amazonProduct('B00C92GQBO'),
    speciesTags: ['salmon', 'steelhead', 'trout', 'sturgeon', 'bass'],
    categoryIcon: 'accessory',
    priceRange: '$8-$12',
  },
  {
    name: 'Pro-Cure Garlic Plus Bait Oil 8oz',
    asin: 'B00C92FYVC',
    url: amazonProduct('B00C92FYVC'),
    speciesTags: ['salmon', 'steelhead', 'trout', 'sturgeon', 'bass'],
    categoryIcon: 'accessory',
    priceRange: '$8-$12',
  },
  {
    name: 'Pro-Cure Sand Shrimp Bait Oil',
    asin: 'B00C92G9DO',
    url: amazonProduct('B00C92G9DO'),
    speciesTags: ['sturgeon', 'salmon'],
    categoryIcon: 'accessory',
    priceRange: '$8-$12',
  },
  {
    name: 'Berkley PowerBait Trout Dip Roe',
    asin: 'B003ZZBPLU',
    url: amazonProduct('B003ZZBPLU'),
    speciesTags: ['trout'],
    categoryIcon: 'lure',
    priceRange: '$5-$8',
  },
  {
    name: "Luhr-Jensen Kwikfish K15 Blazin' Pink UV",
    asin: 'B009BQYZ9G',
    url: amazonProduct('B009BQYZ9G'),
    speciesTags: ['salmon'],
    categoryIcon: 'lure',
    priceRange: '$8-$14',
  },
];
