
// Enhanced list of popular fishing locations
export const FISHING_LOCATIONS = {
  washington: [
    "Puget Sound",
    "Hood Canal",
    "Strait of Juan De Fuca",
    "San Juan Islands",
    "Columbia River - Mouth to Longview",
    "Columbia River - Longview to Bonneville",
    "Columbia River - Bonneville to The Dalles",
    "Columbia River - The Dalles to McNary",
    "Cowlitz River",
    "Lewis River",
    "Kalama River",
    "Wynoochee River",
    "Humptulips River",
    "Chehalis River",
    "Willapa Bay",
    "Grays Harbor",
    "Washougal River",
    "Wind River",
    "Skagit River",
    "Snohomish River",
    "Yakima River",
    "Bogachiel River",
    "Sequim - Dungeness River",
    "Sequim - Discovery Bay",
    "Sequim - Washington Harbor",
    // New detailed Washington river locations
    "Cowlitz River - Blue Creek",
    "Cowlitz River - Mission Bar",
    "Cowlitz River - Barrier Dam",
    "Snohomish River - Pilchuck Mouth",
    "Green River - Flaming Geyser",
    "Skykomish River - Reiter Ponds",
    "Skagit River - Rockport",
    "Skagit River - Marblemount",
    "Nooksack River - Nugent's Corner"
  ],
  oregon: [
    "Columbia River - Astoria to Portland",
    "Columbia River - Portland to Hood River",
    "Columbia River - Hood River to The Dalles",
    "Columbia River - The Dalles to McNary",
    "Willamette River",
    "Sandy River",
    "Clackamas River",
    "Tillamook Bay",
    "Nehalem River",
    // Enhanced Nestucca River Information
    "Nestucca River - First Bridge",
    "Nestucca River - Three Rivers",
    "Nestucca River - Blaine",
    "Nestucca River - Beaver",
    "Nestucca River - Farmer Creek",
    "Nestucca River - Hebo",
    "Nestucca River - Cloverdale",
    // Enhanced Columbia River Tributaries
    "Deschutes River",
    "John Day River",
    "Umatilla River",
    "Grande Ronde River",
    "Hood River",
    "Siletz River",
    "Alsea River",
    "Umpqua River",
    "Rogue River",
    "Chetco River",
    "Siuslaw River",
    "Yaquina River",
    "Salmon River",
    "Eagle Creek",
    // New detailed Oregon river locations
    "Sandy River - Revenue Bridge",
    "Sandy River - Cedar Creek",
    "Sandy River - Oxbow Park",
    "Clackamas River - McIver Park",
    "Clackamas River - Carver",
    "Clackamas River - Feldheimer",
    "Wilson River - Mills Bridge",
    "Wilson River - Footbridge",
    "Wilson River - South Fork"
  ]
};

// Enhanced description of fishing locations
export const LOCATION_DETAILS = {
  // Nestucca River locations
  "Nestucca River - First Bridge": "Access point with deep holes just downstream. Good for winter steelhead and fall Chinook. Coho arrive late September through November.",
  "Nestucca River - Three Rivers": "Confluence area with added water volume. Excellent holding water for steelhead and coho salmon.",
  "Nestucca River - Blaine": "Series of riffles and pools. Great for drift fishing or fly fishing. Prime winter steelhead water December through March.",
  "Nestucca River - Beaver": "Boat ramp access with long drifts downstream. Prime spring Chinook water. Also good for winter steelhead and late coho.",
  "Nestucca River - Farmer Creek": "Natural pinch point that concentrates fish. Good in high water conditions. Winter steelhead hold here December through February.",
  "Nestucca River - Hebo": "Public access with classic steelhead runs. Works well during winter months. Excellent for both hatchery and wild winter steelhead.",
  "Nestucca River - Cloverdale": "Tidewater section with sloughs and deeper channels. Great for bobber fishing. Particularly good for early coho in September.",
  
  // Columbia River sections with more detail
  "Columbia River - Mouth to Longview": "Famous Buoy 10 fishery to Longview. Excellent fall Chinook and coho salmon fishing. Peak coho runs in September-October.",
  "Columbia River - Longview to Bonneville": "Great summer steelhead and spring Chinook fishing. Winter steelhead present in tributaries. Walleye fishing around islands.",
  "Columbia River - Bonneville to The Dalles": "Trophy sturgeon, smallmouth bass, and salmon fishing near dam tailraces. Winter steelhead in tributaries.",
  "Columbia River - The Dalles to McNary": "Prime walleye and bass water with salmon runs through gorge sections. Steelhead migration corridor.",
  "Columbia River - Astoria to Portland": "Lower river tidewater section with excellent salmon and sturgeon fishing. Massive coho runs in September-October.",
  "Columbia River - Portland to Hood River": "Middle river section with diverse fisheries and tributary mouths. Winter steelhead enter tributaries December-March.",
  "Columbia River - Hood River to The Dalles": "Gorge fishery with strong winds, excellent salmon and steelhead fishing.",
  
  // Washington rivers
  "Cowlitz River": "One of Washington's premier salmon and steelhead rivers. Known for its excellent hatchery programs and consistent returns. Strong winter steelhead runs December through February and coho returns in October-November.",
  "Bogachiel River": "Part of the Quillayute River system in Olympic Peninsula, known for winter steelhead and salmon runs. Prime winter steelhead fishing December through March.",
  "Eagle Creek": "Columbia River tributary offering good fishing for spring Chinook and coho salmon, especially near the Eagle Creek National Fish Hatchery.",
  "Lewis River": "Known for exceptional coho returns in October and November. Also hosts strong winter steelhead runs from December through February.",
  "Kalama River": "Famous for both summer and winter steelhead. Coho returns peak in October, with winter steelhead arriving in December.",
  "Skagit River": "Hosts robust wild winter steelhead population along with coho runs in October-November. Protected wild steelhead requires selective gear rules.",
  "Snohomish River": "Large system with strong coho returns in September-October. Winter steelhead fishing good from December through February.",
  
  // Sequim area waters
  "Sequim - Dungeness River": "Small but productive river with fall coho runs and winter steelhead. Best fishing after rainfall increases flows. Peak winter steelhead from January through March.",
  "Sequim - Discovery Bay": "Protected saltwater bay offering good salmon fishing. Coho salmon migrate through in September-October en route to the Dungeness River.",
  "Sequim - Washington Harbor": "Sheltered saltwater fishing area with good access. Known for resident salmon and seasonal coho migration.",
  
  // New Washington detailed locations
  "Cowlitz River - Blue Creek": "Confluence area where Blue Creek meets the Cowlitz. Excellent winter steelhead and late coho holding spot from December through February.",
  "Cowlitz River - Mission Bar": "Long gravel bar with deep channels on the far side. Prime winter steelhead water from January through March.",
  "Cowlitz River - Barrier Dam": "Area immediately below hatchery with excellent holding water for salmon and steelhead. Often crowded but productive.",
  "Snohomish River - Pilchuck Mouth": "Where the Pilchuck River joins the Snohomish. Creates a natural pinch point for salmon and steelhead. Excellent for coho in October.",
  "Green River - Flaming Geyser": "State park with excellent bank access. Winter steelhead concentrate in the deeper runs. Best fished with sink-tip lines or drift gear.",
  "Skykomish River - Reiter Ponds": "Famous winter steelhead holding area where hatchery releases occur. Best December through February with bobber and jig tactics.",
  "Skagit River - Rockport": "Classic steelhead water with large boulders creating excellent holding water. Best with floating lines and egg presentations.",
  "Skagit River - Marblemount": "Upper river section known for early-returning wild steelhead. Selective gear rules apply. February through April is prime time.",
  "Nooksack River - Nugent's Corner": "Area with good bank access and diverse water. Excellent for winter steelhead from December through March.",
  
  // New Oregon detailed locations
  "Sandy River - Revenue Bridge": "Popular access point with good hole just downstream. Winter steelhead hold here after rainfall, best January through March.",
  "Sandy River - Cedar Creek": "Where Cedar Creek enters, creating excellent holding water for winter steelhead. Hatchery fish stack up here December to February.",
  "Sandy River - Oxbow Park": "Long stretch with multiple classic steelhead runs. Best fished with spoons or drifted eggs. Prime for winter steelhead January through March.",
  "Clackamas River - McIver Park": "State park with excellent bank access for winter steelhead. Peak runs from January through March.",
  "Clackamas River - Carver": "Lower river section good for late coho in November and early winter steelhead in December.",
  "Clackamas River - Feldheimer": "Classic steelhead water with deep pools near Eagle Creek. Winter steelhead concentrate here January through March.",
  "Wilson River - Mills Bridge": "Popular access point on the famous Wilson River. Good for both hatchery and wild winter steelhead January through March.",
  "Wilson River - Footbridge": "Area with good bank access near the Wilson River Hatchery. Winter steelhead stack up here December through February.",
  "Wilson River - South Fork": "Smaller tributary that can fish well after rainfall. Good for winter steelhead in January and February."
};
