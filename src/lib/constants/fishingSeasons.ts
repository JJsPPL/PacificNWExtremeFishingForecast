
// Oregon peak fishing seasons by river system
export const OREGON_RIVER_SEASONS = {
  "Nestucca River": {
    "Winter Steelhead": { start: 11, end: 2 }, // Dec-Mar
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Fall Chinook": { start: 7, end: 10 },     // Aug-Nov
    "Summer Steelhead": { start: 5, end: 7 },  // Jun-Aug
    "Coho Salmon": { start: 8, end: 11 }       // Sep-Dec
  },
  "Columbia River": {
    "Spring Chinook": { start: 2, end: 4 },    // Mar-May
    "Summer Chinook": { start: 5, end: 6 },    // Jun-Jul
    "Fall Chinook": { start: 7, end: 9 },      // Aug-Oct
    "Coho Salmon": { start: 7, end: 10 },      // Aug-Nov
    "Sockeye": { start: 5, end: 6 },           // Jun-Jul
    "Steelhead": { start: 5, end: 9 },         // Jun-Oct
    "Sturgeon": { start: 4, end: 8 }           // May-Sep
  },
  "Willamette River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Summer Steelhead": { start: 4, end: 8 },  // May-Sep
    "Sturgeon": { start: 0, end: 11 },         // Year-round (catch & release)
  },
  "Sandy River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Winter Steelhead": { start: 11, end: 2 }, // Dec-Mar
    "Summer Steelhead": { start: 5, end: 9 },  // Jun-Oct
    "Coho Salmon": { start: 8, end: 10 },      // Sep-Nov
  },
  "Clackamas River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Winter Steelhead": { start: 11, end: 2 }, // Dec-Mar
    "Coho Salmon": { start: 8, end: 10 },      // Sep-Nov
  },
  "Tillamook System": {
    "Fall Chinook": { start: 8, end: 10 },     // Sep-Nov
    "Coho Salmon": { start: 8, end: 11 },      // Sep-Dec
    "Winter Steelhead": { start: 11, end: 2 }, // Dec-Mar
    "Chum Salmon": { start: 9, end: 11 },      // Oct-Dec
  },
  "Oregon Coast Offshore": {
    "Albacore Tuna": { start: 6, end: 9 },     // Jul-Oct
    "Chinook Salmon (ocean)": { start: 2, end: 8 }, // Mar-Sep
    "Coho Salmon (ocean)": { start: 5, end: 7 }, // Jun-Aug (mark-selective)
    "Halibut": { start: 4, end: 9 },           // May-Oct
    "Lingcod": { start: 2, end: 11 },          // Mar-Dec
  }
};

// Washington peak fishing seasons
export const WASHINGTON_RIVER_SEASONS = {
  "Cowlitz River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Fall Chinook": { start: 7, end: 9 },      // Aug-Oct
    "Coho Salmon": { start: 8, end: 10 },      // Sep-Nov
    "Winter Steelhead": { start: 11, end: 2 },  // Dec-Mar
    "Summer Steelhead": { start: 5, end: 8 },  // Jun-Sep
  },
  "Lewis River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Fall Chinook": { start: 7, end: 9 },      // Aug-Oct
    "Winter Steelhead": { start: 11, end: 2 },  // Dec-Mar
    "Summer Steelhead": { start: 5, end: 8 },  // Jun-Sep
  },
  "Kalama River": {
    "Spring Chinook": { start: 3, end: 5 },    // Apr-Jun
    "Winter Steelhead": { start: 11, end: 2 },  // Dec-Mar
    "Summer Steelhead": { start: 5, end: 9 },  // Jun-Oct
  },
  "Puget Sound": {
    "Pink Salmon": { start: 6, end: 8 },       // Jul-Sep (odd years)
    "Chinook Salmon": { start: 6, end: 9 },    // Jul-Oct
    "Coho Salmon": { start: 8, end: 10 },      // Sep-Nov
    "Chum Salmon": { start: 9, end: 11 },      // Oct-Dec
    "Lingcod": { start: 4, end: 11 },          // May-Dec
    "Halibut": { start: 3, end: 8 },           // Apr-Sep
  },
  "Hood Canal": {
    "Chum Salmon (summer)": { start: 7, end: 9 }, // Aug-Oct (ESA listed)
    "Pink Salmon": { start: 7, end: 8 },       // Aug-Sep (odd years)
    "Coho Salmon": { start: 8, end: 10 },      // Sep-Nov
    "Lingcod": { start: 4, end: 11 },          // May-Dec
    "Shrimp": { start: 4, end: 8 },            // May-Sep
    "Dungeness Crab": { start: 6, end: 0 },    // Jul-Jan
  },
  "Strait of Juan De Fuca": {
    "Chinook Salmon": { start: 5, end: 8 },    // Jun-Sep
    "Coho Salmon": { start: 6, end: 9 },       // Jul-Oct
    "Halibut": { start: 3, end: 8 },           // Apr-Sep
    "Lingcod": { start: 4, end: 11 },          // May-Dec
  },
  "WA Coast Offshore": {
    "Albacore Tuna": { start: 6, end: 9 },     // Jul-Oct
    "Chinook Salmon (ocean)": { start: 5, end: 8 }, // Jun-Sep
    "Halibut": { start: 4, end: 8 },           // May-Sep
    "Lingcod": { start: 4, end: 11 },          // May-Dec
  }
};

// 2026 Columbia River Salmon Run Forecasts (latest data)
export const SALMON_RUN_FORECASTS_2026 = {
  "Columbia River": {
    "Spring Chinook": {
      totalForecast: 222300,
      upriverForecast: 147300,
      note: "4th largest forecast since 2016. Willamette: 43,700 (32K hatchery). Cowlitz: 9,300.",
      comparison: "2025 actual ~245,379 beat 217,500 forecast",
    },
    "Summer Chinook": {
      totalForecast: null, // Not yet released for 2026
      note: "2025 forecast was 43,100 (in-season update). Expect similar or above average.",
    },
    "Fall Chinook": {
      totalForecast: null, // Typically published mid-year
      note: "2025 forecast: 717,400-736,200 adults. 2024 actual: 669,505.",
    },
    "Sockeye": {
      totalForecast: null,
      note: "2024 was record 665,972 at Bonneville. 2025 forecast: 350,200 (above 10yr avg).",
    },
    "Coho": {
      totalForecast: null,
      note: "2024 actual: 603,240. 2025 forecast: 342,100. Significant decline from 2024.",
    },
    "Steelhead": {
      totalForecast: null,
      note: "2025-26 forecast: 25,790 total (10,270 wild). 10th consecutive depressed year. Sharply down from 85,152 in 2024-25.",
    },
  },
  "Cowlitz River": {
    "Spring Chinook": {
      totalForecast: 9300,
      note: "Down from 13,700 forecast in 2025. 2024 actual: 8,983 (beat 4,700 forecast).",
    },
  },
  "Puget Sound": {
    "Pink Salmon (2025)": {
      totalForecast: 7760000,
      note: "Up 70% from 10yr cycle avg. Green River: 1,835,366. Skagit: 468,073. 3rd largest return on record.",
    },
    "Coho": {
      note: "2025 on par with recent years. Conservation concern for Hood Canal coho.",
    },
  },
  "Oregon Coast": {
    "Coho (2025)": {
      totalForecast: 289000,
      note: "Largest forecast since 2012. Most rivers will have additional fishing days vs 2024.",
    },
  },
  "Hood Canal": {
    "Summer Chum": {
      note: "ESA Threatened but recovering. Core subpopulations robust with increasing abundance. May become first ESA-listed salmon to be de-listed.",
    },
  },
};

// Additional Oregon-specific information for remarkable locations
export const OREGON_HOTSPOTS = {
  "Nestucca River": [
    "Known for some of the best winter steelhead fishing in Oregon",
    "Hatchery releases enhance both winter and summer steelhead returns",
    "Fall Chinook typically arrive in September and peak in November",
    "Best access points include Three Rivers, First Bridge, and Cloverdale",
    "Bobber and jig or bobber and bait work exceptionally well in the slower, deeper sections"
  ],
  "Columbia River": [
    "The largest river system in the PNW with multiple salmon and steelhead runs",
    "Buoy 10 fishery near the mouth is famous for fall salmon",
    "The Gorge section offers excellent smallmouth bass fishing",
    "Sturgeon fishing is productive year-round, with seasonal retention periods",
    "Tributary mouths concentrate fish during migration periods",
    "2026 Spring Chinook forecast: 222,300 total (147,300 upriver) - strong season expected",
    "Fall Chinook 2025: 717,400-736,200 forecast, above 2024 actual of 669,505"
  ],
  "Cowlitz River": [
    "Premier SW Washington salmon and steelhead river",
    "2026 Spring Chinook forecast: 9,300 to mouth of Columbia",
    "Blue Creek, Mission Bar, and Barrier Dam are top fishing access points",
    "Hatchery steelhead releases from Cowlitz Salmon Hatchery and Trout Hatchery",
    "Winter steelhead peak December through February"
  ],
  "Puget Sound": [
    "Diverse saltwater fishery with salmon, bottomfish, crab, and shrimp",
    "2025 Pink Salmon forecast: 7.76 million - one of the largest runs on record",
    "Marine areas have specific regulations - check WDFW before fishing",
    "Chinook conservation concerns limit retention in many areas",
    "Excellent lingcod and rockfish opportunities in rocky habitats"
  ],
  "Hood Canal": [
    "Deep fjord-like waterway with unique fishing opportunities",
    "Summer chum salmon ESA listed but recovering - nearing de-listing",
    "Prime shrimp fishing May through September",
    "Excellent lingcod fishing at rocky points and underwater structure",
    "Dungeness crab available in season with good numbers"
  ],
  "Oregon Coast Offshore": [
    "Albacore tuna arrive July through October, peak August-September",
    "Fish 25-50 miles offshore in 58-65°F water",
    "Look for temperature breaks, current edges, and bird piles",
    "Charter boats available from Westport, Ilwaco, Astoria, Garibaldi, Newport, Charleston",
    "Tuna fishing requires offshore-capable vessel and safety equipment"
  ]
};

// WDFW/ODFW Regulation Highlights for 2025-2026
export const REGULATION_HIGHLIGHTS = {
  "Columbia River": [
    "Fall Chinook/Coho: Opens Aug 1 (Buoy 10 to Hwy 395 Bridge)",
    "Spring Chinook: Season announced separately based on run forecasts",
    "Steelhead: Restrictions apply throughout - check current emergency rules",
    "Sturgeon: Seasonal retention periods vary by section",
    "2026 Willamette: No two-rod endorsement (hatchery forecast below 34,000 threshold)"
  ],
  "Puget Sound": [
    "Pink salmon: +2 extra to daily limit in inner marine areas through Sept 30",
    "Marine Area 8-2 (Ports Susan/Gardner): Closed for pink retention",
    "Chinook: Conservation constraints in many marine areas",
    "Check WDFW Fish Washington app for real-time updates"
  ],
  "Coastal Steelhead (WA)": [
    "Most major rivers: Dec 1 - Mar 31, 2 hatchery steelhead daily limit",
    "Must release wild steelhead, rainbow trout, and cutthroat trout",
    "Humptulips River: Opens Dec 1, closes Feb 2",
    "Chehalis River & tributaries: Opens Dec 1, closes Feb 16"
  ],
  "Oregon Ocean": [
    "Chinook: Cape Falcon to OR/CA border reopens Mar 15, 2026",
    "Mark-selective coho: Jun 7 - Aug 24, 44,000 fin-clipped coho quota",
    "Commercial fishing closed/severely constrained off southern OR",
    "Always check ODFW for in-season modifications before each trip"
  ]
};
