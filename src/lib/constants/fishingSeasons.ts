
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
  }
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
    "Tributary mouths concentrate fish during migration periods"
  ]
};
