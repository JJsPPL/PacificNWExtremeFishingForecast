// =============================================================================
// MASTER FISH RUN CALENDAR — Pacific Northwest
// =============================================================================
// Central data table: location -> species -> active months -> peak months
// This replaces the fragmented code-driven species-location matching with
// a single source of truth for "what's running where, right now."
//
// Data Sources:
//   - WDFW hatchery escapement reports
//   - ODFW regulation updates & fish counts
//   - Bonneville Dam & Willamette Falls fish ladder counts
//   - Historical run timing data (10-year averages)
//   - "Saltwater Fishing Journal" 6th ed. by John Martinis
//   - NOAA Fisheries, USGS water data
//
// Month encoding: 0=Jan, 1=Feb, ..., 11=Dec
// =============================================================================

export interface FishRun {
  species: string;
  months: number[];         // Active months (0-11)
  peakMonths: number[];     // Subset: peak activity months
  runType: 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';
  origin: 'hatchery' | 'wild' | 'both';
  notes: string;
  regulations?: string;
}

export interface LocationRunData {
  runs: FishRun[];
  waterBody: 'river' | 'bay' | 'sound' | 'ocean' | 'lake' | 'estuary' | 'strait' | 'canal';
  tideInfluenced: boolean;
  nearestTideStation?: string;  // NOAA CO-OPS station ID
  state: 'WA' | 'OR' | 'ID' | 'MT';
  regulationsUrl?: string;
}

// Helper: generate month range arrays (handles wrap-around for winter seasons)
function months(start: number, end: number): number[] {
  if (start <= end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  // Wrap around (e.g., Nov-Mar = [10,11,0,1,2])
  const result: number[] = [];
  for (let i = start; i <= 11; i++) result.push(i);
  for (let i = 0; i <= end; i++) result.push(i);
  return result;
}

// =============================================================================
// SW WASHINGTON RIVERS (Deep Emphasis)
// =============================================================================

const cowlitzRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5), // Apr-Jun
    peakMonths: [3, 4],   // Apr-May peak
    runType: 'spring',
    origin: 'both',
    notes: '2026 forecast: 9,300 to mouth. Peak at Cowlitz Salmon Hatchery late April through mid-May. Back-bouncing eggs or pulling plugs in deeper holes.',
    regulations: 'Check WDFW for retention rules. Hatchery fish only in most areas.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(7, 9), // Aug-Oct
    peakMonths: [8],       // Sep peak
    runType: 'fall',
    origin: 'both',
    notes: 'Strong hatchery returns. Mission Bar and Blue Creek are top spots. Fish current seams and deeper slots.',
    regulations: 'Check WDFW for daily limits and selective gear rules.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10), // Sep-Nov
    peakMonths: [9],        // Oct peak
    runType: 'fall',
    origin: 'both',
    notes: 'Peak returns mid-to-late October at Cowlitz Salmon Hatchery. Blue Creek and Mission Bar productive.',
    regulations: 'Hatchery fish only. Check WDFW for current bag limits.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2), // Dec-Mar
    peakMonths: [0, 1],     // Jan-Feb peak
    runType: 'winter',
    origin: 'both',
    notes: 'Premier winter steelhead river. Best fishing during moderate flows 4,000-8,000 CFS. Check Mayfield Dam releases.',
    regulations: 'Dec 1 - Mar 31 season. 2 hatchery steelhead daily. Must release wild fish.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 8), // Jun-Sep
    peakMonths: [5, 6],    // Jun-Jul peak
    runType: 'summer',
    origin: 'hatchery',
    notes: 'Tacoma Power separator data shows strong June-July timing. Blue Creek area most productive.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(4, 9), // May-Oct
    peakMonths: [5, 6],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Sea-run cutthroat available in lower river. Catch and release only for wild fish.',
  },
];

const lewisRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [4],
    runType: 'spring',
    origin: 'both',
    notes: 'Lewis River Hatchery returns peak in May. Fish near the mouth and lower sections.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(7, 9),
    peakMonths: [8],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook stage at the mouth before moving upstream. Peak late September.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Lewis River Hatchery shows peak Coho returns mid-to-late October.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Check Merwin Dam releases for flow data. Best with 2-4 feet visibility.',
    regulations: 'Dec 1 - Mar 31. Hatchery only.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 8),
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'hatchery',
    notes: 'Lewis River Hatchery reports peak returns late June through July.',
  },
];

const kalamaRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'Smaller runs but quality fish. Focus on deeper holes and current seams.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0],
    runType: 'winter',
    origin: 'both',
    notes: 'Known for wild winter steelhead. January is typically peak.',
    regulations: 'Wild steelhead release required in most sections.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: 'Extended summer run June through October. Quality fly-fishing water.',
  },
];

const toutleRiverRuns: FishRun[] = [
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'North and South Fork both productive. Tower Road Bridge access.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'hatchery',
    notes: 'Fall Chinook in lower river sections. Check volcanic sediment levels.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(9, 11),
    peakMonths: [9, 10],
    runType: 'fall',
    origin: 'both',
    notes: 'Coho enter with fall rains. Focus on North Fork.',
  },
];

const windRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [4],
    runType: 'spring',
    origin: 'both',
    notes: 'Carson National Fish Hatchery returns. Shipherd Falls area productive.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 8),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: 'Good fly water. Wind River is a smaller tributary but produces quality fish.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Coho enter from Columbia. Focus on lower river and Drano Lake.',
  },
];

const wynocheeRiverRuns: FishRun[] = [
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Dam-controlled flows provide consistent conditions. Best below dam.',
    regulations: 'Dec 1 - Mar 31 per WDFW.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook in lower river. Black Creek area productive.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(9, 11),
    peakMonths: [10],
    runType: 'fall',
    origin: 'both',
    notes: 'Coho enter with November rains.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'Wild cutthroat in lake and river. Catch and release.',
  },
];

const chehalisRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Fall)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook enter the system with first significant rains.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(9, 11),
    peakMonths: [10],
    runType: 'fall',
    origin: 'both',
    notes: 'Strong Coho returns. Porter and Montesano access points.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 1),
    peakMonths: [11, 0],
    runType: 'winter',
    origin: 'both',
    notes: 'Chehalis system closes to steelhead Feb 16 per WDFW emergency rules.',
    regulations: 'Closes Feb 16. 2 hatchery steelhead daily limit.',
  },
  {
    species: 'Chum Salmon (Dog)',
    months: months(10, 11),
    peakMonths: [10],
    runType: 'fall',
    origin: 'wild',
    notes: 'Chum salmon in lower river and tributaries.',
  },
];

const olympicPeninsulaRuns: FishRun[] = [
  {
    species: 'Winter Steelhead',
    months: months(11, 3),
    peakMonths: [0, 1, 2],
    runType: 'winter',
    origin: 'wild',
    notes: 'Wild steelhead rivers. Bogachiel, Sol Duc, Hoh, Quillayute all have strong wild runs.',
    regulations: 'Wild steelhead release in most rivers. Check WDFW for specific river rules.',
  },
  {
    species: 'Chinook Salmon (King)',
    months: months(8, 10),
    peakMonths: [8, 9],
    runType: 'fall',
    origin: 'wild',
    notes: 'Fall Chinook in major Olympic rivers. Wild fish — check retention rules.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(9, 11),
    peakMonths: [10],
    runType: 'fall',
    origin: 'both',
    notes: 'Strong Coho runs in Olympic Peninsula rivers.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'Sol Duc and Bogachiel have summer steelhead. Quality fly water.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(5, 9),
    peakMonths: [6, 7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Sea-run cutthroat in lower river sections during summer.',
  },
];

// =============================================================================
// PUGET SOUND (Deep Emphasis — per "Saltwater Fishing Journal")
// =============================================================================

const pugetSoundRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (King)',
    months: months(6, 9), // Jul-Oct
    peakMonths: [7, 8],    // Aug-Sep peak
    runType: 'summer',
    origin: 'both',
    notes: 'Blackmouth (resident Chinook) available year-round in some areas. Migratory runs Jul-Oct. Trolling with flashers and herring most productive. Target 50-120 feet depth.',
    regulations: 'Conservation constraints in many marine areas. Check WDFW for area-specific limits.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10), // Sep-Nov
    peakMonths: [9],        // Oct peak
    runType: 'fall',
    origin: 'both',
    notes: 'Coho enter Puget Sound in September. Fish near creek mouths and points. Trolling herring and casting buzz bombs productive.',
  },
  {
    species: 'Pink Salmon (Humpy)',
    months: months(6, 8), // Jul-Sep
    peakMonths: [7],       // Aug peak
    runType: 'summer',
    origin: 'wild',
    notes: 'ODD YEARS ONLY (2025, 2027, 2029). 2025 forecast: 7.76 million — one of largest on record. Massive shore and boat fishing opportunities.',
    regulations: '+2 extra to daily limit in inner marine areas through Sept 30.',
  },
  {
    species: 'Chum Salmon (Dog)',
    months: months(9, 11), // Oct-Dec
    peakMonths: [10],       // Nov peak
    runType: 'fall',
    origin: 'wild',
    notes: 'Chum salmon run into tributaries and creek mouths. Cast spinners or drift flies near creek mouths.',
  },
  {
    species: 'Lingcod',
    months: months(4, 11), // May-Dec
    peakMonths: [4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Target rocky structure and underwater ridges. Jigging with swimbaits or live herring. Best at Tacoma Narrows, Point No Point, Jefferson Head.',
  },
  {
    species: 'Halibut',
    months: months(3, 8), // Apr-Sep
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'wild',
    notes: 'Season dates set by IPHC annually. Target sandy/muddy bottoms 100-300 feet. Check WDFW for specific marine area openings.',
    regulations: 'IPHC quota-managed. Specific open dates vary by marine area — check WDFW.',
  },
  {
    species: 'Rockfish',
    months: months(0, 11), // Year-round
    peakMonths: [4, 5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Copper and quillback rockfish at rocky reefs. Use small jigs and shrimp flies. Depth 60-200 feet.',
    regulations: 'Some species restricted. Check WDFW for bottomfish conservation areas.',
  },
  {
    species: 'Dungeness Crab',
    months: months(6, 0), // Jul-Jan
    peakMonths: [6, 7, 11, 0],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Sport crabbing in marine areas. Use pots or ring nets with chicken or fish carcass bait.',
    regulations: 'Size limit, daily limit, and season dates vary by marine area. Males only.',
  },
  {
    species: 'Shrimp',
    months: months(4, 8), // May-Sep
    peakMonths: [4, 5],
    runType: 'spring',
    origin: 'wild',
    notes: 'Spot shrimp fishing in deeper water (200-400 feet). Pots and traps. Short opener days.',
    regulations: 'Limited opener days. Check WDFW for specific dates per marine area.',
  },
  {
    species: 'Flounder',
    months: months(0, 11),
    peakMonths: [5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Starry flounder and sand sole in sandy bottoms. Pier fishing and small boats productive.',
  },
  {
    species: 'Surfperch',
    months: months(0, 11),
    peakMonths: [3, 4, 5, 6],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Shiner perch and striped seaperch from piers and jetties. Great family fishing.',
  },
  {
    species: 'Cabezon',
    months: months(0, 11),
    peakMonths: [3, 4, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Target rocky structure in shallow to moderate depth. Jigs and soft plastics.',
  },
];

// =============================================================================
// HOOD CANAL (Deep Emphasis)
// =============================================================================

const hoodCanalRuns: FishRun[] = [
  {
    species: 'Chum Salmon (Dog)',
    months: months(7, 9), // Aug-Oct
    peakMonths: [8, 9],
    runType: 'summer',
    origin: 'wild',
    notes: 'ESA Threatened but recovering — nearing de-listing. Core subpopulations robust. Catch and release only.',
    regulations: 'ESA listed. Catch and release ONLY. Check WDFW for specific area closures.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Coho enter Hood Canal tributaries in fall. Focus on Skokomish River mouth area.',
    regulations: 'Conservation concern for Hood Canal Coho. Check WDFW limits.',
  },
  {
    species: 'Pink Salmon (Humpy)',
    months: months(7, 8),
    peakMonths: [7],
    runType: 'summer',
    origin: 'wild',
    notes: 'ODD YEARS ONLY. Aug-Sep run in Hood Canal tributaries.',
  },
  {
    species: 'Chinook Salmon (King)',
    months: months(7, 9),
    peakMonths: [8],
    runType: 'fall',
    origin: 'wild',
    notes: 'Limited Chinook opportunities. Wild fish — check retention rules carefully.',
    regulations: 'Chinook retention very limited in Hood Canal. Check WDFW.',
  },
  {
    species: 'Lingcod',
    months: months(4, 11),
    peakMonths: [4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Excellent lingcod at rocky points and underwater structure. Hoodsport, Seabeck, Point Whitney are top spots.',
  },
  {
    species: 'Shrimp',
    months: months(4, 8),
    peakMonths: [4, 5],
    runType: 'spring',
    origin: 'wild',
    notes: 'MAJOR spot shrimp fishery. Deep water 200-400 feet. Short opener days — extremely popular.',
    regulations: 'Very limited opener days. Sell out fast. Check WDFW for exact dates.',
  },
  {
    species: 'Dungeness Crab',
    months: months(6, 0),
    peakMonths: [6, 7, 11, 0],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Good crabbing throughout the canal. Use pots in moderate depth.',
    regulations: 'Males only. Check WDFW for size and daily limits.',
  },
  {
    species: 'Rockfish',
    months: months(0, 11),
    peakMonths: [5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Rocky structure areas. Copper and quillback rockfish. Use small jigs.',
  },
  {
    species: 'Flounder',
    months: months(0, 11),
    peakMonths: [5, 6, 7],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Sandy bottom areas. Quilcene Bay and Dabob Bay productive.',
  },
];

// =============================================================================
// SAN JUAN ISLANDS
// =============================================================================

const sanJuanRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (King)',
    months: months(6, 9),
    peakMonths: [7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Resident and migratory Chinook. Trolling with herring at 80-150 feet. Rosario Strait and passes productive.',
    regulations: 'Strict conservation rules. Check WDFW Marine Area 7 regulations.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Coho enter passes and channels following baitfish. Trolling and mooching productive.',
  },
  {
    species: 'Pink Salmon (Humpy)',
    months: months(6, 8),
    peakMonths: [7],
    runType: 'summer',
    origin: 'wild',
    notes: 'ODD YEARS ONLY. Massive runs through passes. Shore fishing from parks and beaches.',
  },
  {
    species: 'Halibut',
    months: months(3, 8),
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'wild',
    notes: 'Halibut in sandy areas near passes. Target 100-300 feet depth.',
    regulations: 'IPHC quota-managed. Check WDFW for specific open dates.',
  },
  {
    species: 'Lingcod',
    months: months(4, 11),
    peakMonths: [4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Excellent lingcod fishing around rock piles and kelp edges in passes.',
  },
  {
    species: 'Rockfish',
    months: months(0, 11),
    peakMonths: [5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Yelloweye, quillback, copper rockfish at deep rocky structure. Some species restricted.',
    regulations: 'Bottomfish conservation areas — check WDFW.',
  },
  {
    species: 'Dungeness Crab',
    months: months(6, 0),
    peakMonths: [6, 7],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Good crabbing in sheltered bays around islands.',
  },
];

// =============================================================================
// STRAIT OF JUAN DE FUCA
// =============================================================================

const straitRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (King)',
    months: months(5, 8),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: 'Migratory Chinook through the Strait. Neah Bay, Sekiu, and Port Angeles are primary ports. Trolling with herring and flashers.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(6, 9),
    peakMonths: [7, 8],
    runType: 'summer',
    origin: 'both',
    notes: 'Coho following baitfish along kelp edges and structure. Trolling and casting productive.',
  },
  {
    species: 'Halibut',
    months: months(3, 8),
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'wild',
    notes: 'Excellent halibut grounds. Neah Bay and Sekiu are premier halibut ports.',
    regulations: 'IPHC quota-managed. Check WDFW for Marine Area 4 open dates.',
  },
  {
    species: 'Lingcod',
    months: months(4, 11),
    peakMonths: [4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Rocky reefs and kelp forests. Large lingcod. Jigging with swimbaits.',
  },
  {
    species: 'Rockfish',
    months: months(0, 11),
    peakMonths: [5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Diverse rockfish species at deep rocky structure.',
  },
  {
    species: 'Dungeness Crab',
    months: months(6, 0),
    peakMonths: [6, 7, 11, 0],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Good crabbing in bays and harbors along the Strait.',
  },
  {
    species: 'Pink Salmon (Humpy)',
    months: months(6, 8),
    peakMonths: [7],
    runType: 'summer',
    origin: 'wild',
    notes: 'ODD YEARS ONLY. Large runs through the Strait.',
  },
];

// =============================================================================
// COLUMBIA RIVER SYSTEM (Deep Emphasis for Oregon)
// =============================================================================

const columbiaRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(2, 5), // Mar-Jun
    peakMonths: [3, 4],    // Apr-May peak
    runType: 'spring',
    origin: 'both',
    notes: '2026 forecast: 222,300 total (147,300 upriver). Willamette: 43,700. 4th largest since 2016. Bonneville Dam counts strongest mid-April through May.',
    regulations: 'Season announced based on run forecasts. Check ODFW/WDFW joint regulations.',
  },
  {
    species: 'Chinook Salmon (Summer)',
    months: months(5, 6), // Jun-Jul
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'both',
    notes: '2025 forecast was 43,100. Expect similar or above average. Target deeper water below dams.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(7, 9), // Aug-Oct
    peakMonths: [8],       // Sep peak
    runType: 'fall',
    origin: 'both',
    notes: '2025 forecast: 717,400-736,200 adults. Buoy 10 fishery near mouth is famous. Opens Aug 1.',
    regulations: 'Opens Aug 1 (Buoy 10 to Hwy 395 Bridge). Check ODFW/WDFW for current limits.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(7, 10), // Aug-Nov
    peakMonths: [8, 9],
    runType: 'fall',
    origin: 'both',
    notes: '2024 actual: 603,240. Peak runs mid-September through October. Wild Coho release required in many areas.',
  },
  {
    species: 'Sockeye Salmon (Red)',
    months: months(5, 6), // Jun-Jul
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'wild',
    notes: '2024 was record 665,972 at Bonneville. 2025 forecast: 350,200 (above 10yr avg). Small spoons and hoochies near dam structures.',
  },
  {
    species: 'Steelhead',
    months: months(5, 9), // Jun-Oct
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: '2025-26 forecast: 25,790 total (10,270 wild). 10th consecutive depressed year. Target current breaks.',
    regulations: 'Restrictions apply throughout. Check current emergency rules.',
  },
  {
    species: 'Sturgeon',
    months: months(0, 11), // Year-round
    peakMonths: [0, 1, 2, 3, 4],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Year-round catch and release with seasonal retention periods. Anchor fishing in deep holes. Target 30-60 foot depths.',
    regulations: 'Seasonal retention varies by section. John Day Pool opens Jan 1. 43-54 inch fork length. Check ODFW/WDFW.',
  },
  {
    species: 'Smallmouth Bass',
    months: months(4, 9), // May-Oct
    peakMonths: [5, 6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'Gorge section offers excellent smallmouth bass fishing. Rocky structure and current breaks.',
  },
  {
    species: 'Shad',
    months: months(4, 6), // May-Jul
    peakMonths: [5],
    runType: 'spring',
    origin: 'wild',
    notes: 'American shad runs. Light tackle. Fun fight on light gear. No limit.',
  },
];

// =============================================================================
// WILLAMETTE RIVER
// =============================================================================

const willametteRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'Willamette Falls fish ladder counts strongest mid-April through May. Oregon City and Portland sections most productive.',
    regulations: 'No two-rod endorsement when hatchery forecast below 34,000 threshold.',
  },
  {
    species: 'Summer Steelhead',
    months: months(4, 8),
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'both',
    notes: 'Peak passage at Willamette Falls June through early August. Target areas near falls.',
  },
  {
    species: 'Sturgeon',
    months: months(0, 11),
    peakMonths: [0, 1, 2, 3],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Year-round catch and release. Deep holes in downtown Portland section concentrate fish in winter.',
    regulations: 'Catch and release only throughout Willamette.',
  },
  {
    species: 'Smallmouth Bass',
    months: months(4, 9),
    peakMonths: [5, 6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'Excellent warmwater fishery from Newberg to Corvallis. Rocky structure and current breaks.',
  },
  {
    species: 'Rainbow Trout',
    months: months(2, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'Spring trout in tributaries and mainstem. Spinners and bait in deeper pools.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'Sea-run cutthroat in lower sections during summer. Wild fish release.',
  },
];

// =============================================================================
// OREGON RIVERS (Columbia Tributaries + Coastal)
// =============================================================================

const sandyRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'Oxbow Park and Dodge Park are primary access. Back-bouncing eggs or pulling plugs.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Winter steelhead from Oxbow to Revenue Bridge. Drift fishing with eggs.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: 'Summer steelhead in upper sections. Fly fishing and spin productive.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Coho enter with rains. Focus on current seams and deeper holes.',
  },
];

const clackamasRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'McIver Park, Carver, and Barton access. Trolling and back-bouncing productive.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Dam-controlled flows from River Mill Dam. Best with moderate flows.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 10),
    peakMonths: [9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Coho in lower river sections. Drift fishing with eggs.',
  },
  {
    species: 'Rainbow Trout',
    months: months(2, 5),
    peakMonths: [3, 4],
    runType: 'spring',
    origin: 'both',
    notes: 'Spring trout fishing excellent at Carver. Spinners and eggs.',
  },
];

const nestuccaRiverRuns: FishRun[] = [
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Known for some of the best winter steelhead fishing in Oregon. Three Rivers, First Bridge, Cloverdale access.',
    regulations: 'Chinook closed Dec 1-31 per ODFW.',
  },
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [4, 5],
    runType: 'spring',
    origin: 'both',
    notes: 'Spring Chinook in deeper holes. Hatchery releases enhance returns.',
  },
  {
    species: 'Chinook Salmon (Fall)',
    months: months(7, 10),
    peakMonths: [8, 9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook arrive September, peak October-November. ODFW fish trap data tracks returns.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 7),
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'hatchery',
    notes: 'Hatchery summer steelhead June through August.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 11),
    peakMonths: [9, 10],
    runType: 'fall',
    origin: 'both',
    notes: 'Peak Coho returns late October through mid-November per ODFW fish trap.',
  },
];

const tillamookSystemRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Fall)',
    months: months(8, 10),
    peakMonths: [8, 9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook across all 5 rivers (Wilson, Trask, Tillamook, Kilchis, Miami). Wilson and Trask are most productive.',
    regulations: 'Chinook closed Dec 1-31 per ODFW.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 11),
    peakMonths: [9, 10],
    runType: 'fall',
    origin: 'both',
    notes: 'Strong Coho runs. 2025 Oregon coast forecast: 289,000 — largest since 2012.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Wilson River is the primary steelhead river. Mills Bridge access.',
    regulations: 'All Tillamook rivers closed to Chinook Dec 1-31 per ODFW.',
  },
  {
    species: 'Chum Salmon (Dog)',
    months: months(9, 11),
    peakMonths: [10],
    runType: 'fall',
    origin: 'wild',
    notes: 'Chum salmon in Tillamook Bay tributaries. Target creek mouths.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(5, 9),
    peakMonths: [6, 7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Sea-run cutthroat in Tillamook Bay and lower river sections.',
  },
  {
    species: 'Dungeness Crab',
    months: months(11, 1),
    peakMonths: [11, 0],
    runType: 'winter',
    origin: 'wild',
    notes: 'Tillamook Bay crabbing. Pots and ring nets from docks and boats.',
    regulations: 'Check ODFW for bay-specific seasons.',
  },
];

// Oregon coastal rivers
const oregonCoastalRiverRuns: FishRun[] = [
  {
    species: 'Chinook Salmon (Fall)',
    months: months(8, 10),
    peakMonths: [8, 9],
    runType: 'fall',
    origin: 'both',
    notes: 'Fall Chinook in Nehalem, Siletz, Alsea, Siuslaw, Umpqua, Rogue, Coquille rivers.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(8, 11),
    peakMonths: [9, 10],
    runType: 'fall',
    origin: 'both',
    notes: '2025 Oregon coast forecast: 289,000. Best return since 2012.',
  },
  {
    species: 'Winter Steelhead',
    months: months(11, 2),
    peakMonths: [0, 1],
    runType: 'winter',
    origin: 'both',
    notes: 'Siletz, Alsea, Nehalem, North Umpqua known for winter steelhead.',
    regulations: 'Wild fish release required in many sections. Check ODFW.',
  },
  {
    species: 'Summer Steelhead',
    months: months(5, 9),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'wild',
    notes: 'North Umpqua and Deschutes are premier summer steelhead rivers.',
  },
  {
    species: 'Chinook Salmon (Spring)',
    months: months(3, 5),
    peakMonths: [4],
    runType: 'spring',
    origin: 'both',
    notes: 'Spring Chinook in Rogue and Umpqua systems.',
  },
  {
    species: 'Cutthroat Trout',
    months: months(5, 9),
    peakMonths: [7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Sea-run cutthroat in estuaries and lower rivers during summer.',
  },
];

// Oregon offshore
const oregonOffshoreRuns: FishRun[] = [
  {
    species: 'Albacore Tuna',
    months: months(6, 9),
    peakMonths: [7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Fish 25-60 miles offshore in 58-65F water. Look for temp breaks, current edges, bird piles. Cedar plugs and tuna clones at 6-7 knots.',
  },
  {
    species: 'Chinook Salmon (King)',
    months: months(2, 8),
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'both',
    notes: 'Ocean Chinook. Cape Falcon to OR/CA border reopens Mar 15, 2026.',
    regulations: 'Cape Falcon to OR/CA border reopens Mar 15. Check ODFW for in-season modifications.',
  },
  {
    species: 'Coho Salmon (Silver)',
    months: months(5, 7),
    peakMonths: [5, 6],
    runType: 'summer',
    origin: 'both',
    notes: 'Mark-selective Coho. Jun 7 - Aug 24, 44,000 fin-clipped quota.',
    regulations: 'Mark-selective only: Jun 7 - Aug 24. Must release wild Coho.',
  },
  {
    species: 'Halibut',
    months: months(4, 9),
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'wild',
    notes: 'Bottom fishing 100-300 feet over sandy/muddy bottoms. Whole salmon heads, large herring.',
    regulations: 'IPHC quota-managed. Check ODFW for specific open dates.',
  },
  {
    species: 'Lingcod',
    months: months(2, 11),
    peakMonths: [3, 4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Rocky structure. Large lingcod near reefs and pinnacles.',
  },
  {
    species: 'Rockfish',
    months: months(0, 11),
    peakMonths: [4, 5, 6, 7, 8],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Black rockfish, blue rockfish, canary rockfish near rocky reefs.',
    regulations: 'Depth restrictions in some areas. Check ODFW.',
  },
];

// WA offshore
const waOffshoreRuns: FishRun[] = [
  {
    species: 'Albacore Tuna',
    months: months(6, 9),
    peakMonths: [7, 8],
    runType: 'summer',
    origin: 'wild',
    notes: 'Fish 25-60 miles offshore from Westport, Ilwaco, Neah Bay, La Push. Target 58-64F water.',
  },
  {
    species: 'Chinook Salmon (King)',
    months: months(5, 8),
    peakMonths: [6, 7],
    runType: 'summer',
    origin: 'both',
    notes: 'Ocean Chinook from WA coast ports.',
    regulations: 'Check WDFW for ocean salmon seasons.',
  },
  {
    species: 'Halibut',
    months: months(4, 8),
    peakMonths: [4, 5, 6],
    runType: 'spring',
    origin: 'wild',
    notes: 'Halibut grounds off WA coast. Neah Bay and Westport are premier ports.',
    regulations: 'IPHC quota-managed. Check WDFW for open dates.',
  },
  {
    species: 'Lingcod',
    months: months(4, 11),
    peakMonths: [4, 5, 9, 10],
    runType: 'year-round',
    origin: 'wild',
    notes: 'Rocky reefs and pinnacles. Large lingcod.',
  },
];

// Additional SW WA rivers
const elochomanRiverRuns: FishRun[] = [
  { species: 'Winter Steelhead', months: months(11, 2), peakMonths: [0, 1], runType: 'winter', origin: 'both', notes: 'Small river with good hatchery steelhead returns.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook in lower river.' },
  { species: 'Coho Salmon (Silver)', months: months(9, 11), peakMonths: [10], runType: 'fall', origin: 'both', notes: 'Coho with fall rains.' },
];

const graysRiverRuns: FishRun[] = [
  { species: 'Winter Steelhead', months: months(11, 2), peakMonths: [0, 1], runType: 'winter', origin: 'both', notes: 'Small tributary steelhead fishery.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook in lower Grays River.' },
  { species: 'Chum Salmon (Dog)', months: months(10, 11), peakMonths: [10], runType: 'fall', origin: 'wild', notes: 'Chum runs in late fall.' },
];

const washougalRiverRuns: FishRun[] = [
  { species: 'Winter Steelhead', months: months(11, 2), peakMonths: [0, 1], runType: 'winter', origin: 'both', notes: 'Winter steelhead near hatchery.' },
  { species: 'Summer Steelhead', months: months(5, 8), peakMonths: [6], runType: 'summer', origin: 'hatchery', notes: 'Washougal River hatchery summer steelhead.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook returns.' },
  { species: 'Coho Salmon (Silver)', months: months(9, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Coho.' },
];

const humptulipsRiverRuns: FishRun[] = [
  { species: 'Winter Steelhead', months: months(11, 1), peakMonths: [11, 0], runType: 'winter', origin: 'both', notes: 'Opens Dec 1, closes Feb 2 per WDFW.', regulations: 'Closes Feb 2 per WDFW emergency rules.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook in lower river.' },
  { species: 'Coho Salmon (Silver)', months: months(9, 11), peakMonths: [10], runType: 'fall', origin: 'both', notes: 'Coho in November.' },
];

const satsopRiverRuns: FishRun[] = [
  { species: 'Winter Steelhead', months: months(11, 2), peakMonths: [0, 1], runType: 'winter', origin: 'both', notes: 'Tributary of Chehalis. Good hatchery steelhead.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook.' },
  { species: 'Coho Salmon (Silver)', months: months(9, 11), peakMonths: [10], runType: 'fall', origin: 'both', notes: 'Coho with fall rains.' },
];

// North WA rivers (Skagit system)
const northWaRiverRuns: FishRun[] = [
  { species: 'Chinook Salmon (King)', months: months(6, 9), peakMonths: [7, 8], runType: 'summer', origin: 'wild', notes: 'Skagit River system has wild Chinook runs. Conservation concerns.' },
  { species: 'Coho Salmon (Silver)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Coho in Skagit, Skykomish, Snohomish, Snoqualmie.' },
  { species: 'Pink Salmon (Humpy)', months: months(7, 8), peakMonths: [7], runType: 'summer', origin: 'wild', notes: 'ODD YEARS ONLY. Massive pink salmon runs in Skagit system.' },
  { species: 'Chum Salmon (Dog)', months: months(10, 11), peakMonths: [10], runType: 'fall', origin: 'wild', notes: 'Chum in lower river and tributaries.' },
  { species: 'Winter Steelhead', months: months(11, 3), peakMonths: [1, 2], runType: 'winter', origin: 'both', notes: 'Winter steelhead Feb-Mar peak in Skagit system.' },
  { species: 'Summer Steelhead', months: months(5, 9), peakMonths: [6, 7], runType: 'summer', origin: 'wild', notes: 'Wild summer steelhead. Fly fishing.' },
  { species: 'Cutthroat Trout', months: months(5, 9), peakMonths: [7, 8], runType: 'summer', origin: 'wild', notes: 'Sea-run cutthroat in estuaries.' },
];

// South Puget Sound rivers
const southPugetRiverRuns: FishRun[] = [
  { species: 'Chinook Salmon (King)', months: months(7, 9), peakMonths: [8], runType: 'fall', origin: 'both', notes: 'Fall Chinook in Green, Puyallup, Nisqually rivers.' },
  { species: 'Coho Salmon (Silver)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Coho in tributaries.' },
  { species: 'Chum Salmon (Dog)', months: months(10, 11), peakMonths: [10], runType: 'fall', origin: 'wild', notes: 'Chum salmon in lower reaches.' },
  { species: 'Pink Salmon (Humpy)', months: months(7, 8), peakMonths: [7], runType: 'summer', origin: 'wild', notes: 'ODD YEARS ONLY. Green River had 1.8 million pinks in 2025.' },
  { species: 'Winter Steelhead', months: months(11, 2), peakMonths: [0, 1], runType: 'winter', origin: 'both', notes: 'Winter steelhead in Green, Puyallup, Nisqually.' },
];

// Idaho (Snake River system)
const snakeRiverRuns: FishRun[] = [
  { species: 'Chinook Salmon (Spring)', months: months(3, 5), peakMonths: [4], runType: 'spring', origin: 'both', notes: 'Spring Chinook at Lewiston and lower Snake.' },
  { species: 'Chinook Salmon (Fall)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Fall Chinook. Hells Canyon area.' },
  { species: 'Summer Steelhead', months: months(8, 11), peakMonths: [9, 10], runType: 'fall', origin: 'both', notes: 'Steelhead A-run and B-run. Premier fly-fishing opportunity.' },
  { species: 'Sturgeon', months: months(0, 11), peakMonths: [2, 3, 4], runType: 'year-round', origin: 'wild', notes: 'White sturgeon in Hells Canyon. Catch and release.' },
  { species: 'Smallmouth Bass', months: months(4, 9), peakMonths: [5, 6, 7], runType: 'summer', origin: 'wild', notes: 'Excellent warmwater fishery in lower Snake and reservoirs.' },
  { species: 'Rainbow Trout', months: months(3, 10), peakMonths: [5, 6, 9], runType: 'year-round', origin: 'both', notes: 'Trout in reservoirs and tributaries.' },
];

// Montana
const montanaRuns: FishRun[] = [
  { species: 'Rainbow Trout', months: months(3, 10), peakMonths: [5, 6, 9], runType: 'year-round', origin: 'both', notes: 'Blue-ribbon trout streams. Madison, Yellowstone, Missouri rivers.' },
  { species: 'Brown Trout', months: months(3, 11), peakMonths: [5, 6, 9, 10], runType: 'year-round', origin: 'wild', notes: 'Fall spawning. Big browns in October-November.' },
  { species: 'Cutthroat Trout', months: months(5, 9), peakMonths: [6, 7], runType: 'summer', origin: 'wild', notes: 'Westslope cutthroat. Catch and release in many areas.' },
  { species: 'Largemouth Bass', months: months(5, 8), peakMonths: [5, 6], runType: 'summer', origin: 'wild', notes: 'Warmwater lakes and reservoirs.' },
];

// Sequim area
const sequimRuns: FishRun[] = [
  { species: 'Chinook Salmon (King)', months: months(7, 9), peakMonths: [8], runType: 'fall', origin: 'wild', notes: 'Dungeness River Chinook. Wild fish — check retention.' },
  { species: 'Coho Salmon (Silver)', months: months(8, 10), peakMonths: [9], runType: 'fall', origin: 'both', notes: 'Coho in Dungeness River system.' },
  { species: 'Pink Salmon (Humpy)', months: months(7, 8), peakMonths: [7], runType: 'summer', origin: 'wild', notes: 'ODD YEARS ONLY. Dungeness River pinks.' },
  { species: 'Dungeness Crab', months: months(6, 0), peakMonths: [7, 8], runType: 'year-round', origin: 'wild', notes: 'Discovery Bay and Sequim Bay crabbing.' },
  { species: 'Halibut', months: months(4, 8), peakMonths: [5, 6], runType: 'spring', origin: 'wild', notes: 'Discovery Bay halibut fishing.' },
];


// =============================================================================
// MASTER CALENDAR EXPORT
// =============================================================================
// Maps location names (matching existing FISHING_LOCATIONS keys) to run data.
// Uses location-group pattern: one entry covers all sub-locations in a system.
// =============================================================================

export const FISH_RUN_CALENDAR: Record<string, LocationRunData> = {
  // ===== SW WASHINGTON RIVERS =====
  'Cowlitz River': { runs: cowlitzRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Lewis River': { runs: lewisRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Kalama River': { runs: kalamaRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Toutle River': { runs: toutleRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Wind River': { runs: windRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Wynochee River': { runs: wynocheeRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Chehalis River': { runs: chehalisRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9441102', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Humptulips River': { runs: humptulipsRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9441102', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Satsop River': { runs: satsopRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Elochoman River': { runs: elochomanRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Grays River': { runs: graysRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9439040', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Washougal River': { runs: washougalRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Coweeman River': { runs: elochomanRiverRuns, waterBody: 'river', tideInfluenced: false, nearestTideStation: '9440422', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== OLYMPIC PENINSULA =====
  'Bogachiel River': { runs: olympicPeninsulaRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Sol Duc River': { runs: olympicPeninsulaRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Hoh River': { runs: olympicPeninsulaRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Quillayute River': { runs: olympicPeninsulaRuns, waterBody: 'river', tideInfluenced: true, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Calawah River': { runs: olympicPeninsulaRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== PUGET SOUND (Deep Emphasis) =====
  'Puget Sound': { runs: pugetSoundRuns, waterBody: 'sound', tideInfluenced: true, nearestTideStation: '9447130', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== HOOD CANAL (Deep Emphasis) =====
  'Hood Canal': { runs: hoodCanalRuns, waterBody: 'canal', tideInfluenced: true, nearestTideStation: '9445478', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== SAN JUAN ISLANDS =====
  'San Juan Islands': { runs: sanJuanRuns, waterBody: 'sound', tideInfluenced: true, nearestTideStation: '9449880', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== STRAIT OF JUAN DE FUCA =====
  'Strait of Juan De Fuca': { runs: straitRuns, waterBody: 'strait', tideInfluenced: true, nearestTideStation: '9443090', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== NORTH WA RIVERS =====
  'Skagit River': { runs: northWaRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9448558', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Skykomish River': { runs: northWaRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Snohomish River': { runs: northWaRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Snoqualmie River': { runs: northWaRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Samish River': { runs: northWaRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== SOUTH PUGET SOUND RIVERS =====
  'Green River': { runs: southPugetRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Puyallup River': { runs: southPugetRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9446484', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  'Nisqually River': { runs: southPugetRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9446969', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== SEQUIM AREA =====
  'Sequim': { runs: sequimRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9444090', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== WA OFFSHORE =====
  'WA Coast Offshore': { runs: waOffshoreRuns, waterBody: 'ocean', tideInfluenced: true, nearestTideStation: '9441102', state: 'WA', regulationsUrl: 'https://wdfw.wa.gov/fishing/regulations' },

  // ===== COLUMBIA RIVER (OR/WA) =====
  'Columbia River': { runs: columbiaRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9439040', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== WILLAMETTE RIVER =====
  'Willamette River': { runs: willametteRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9439040', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== OREGON COLUMBIA TRIBUTARIES =====
  'Sandy River': { runs: sandyRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Clackamas River': { runs: clackamasRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== OREGON COASTAL RIVERS =====
  'Nestucca River': { runs: nestuccaRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9437540', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Tillamook System': { runs: tillamookSystemRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9437540', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Nehalem River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Siletz River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9435380', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Alsea River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Siuslaw River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Umpqua River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'North Umpqua River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Rogue River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Coquille River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Deschutes River': { runs: oregonCoastalRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== OREGON BAYS & ESTUARIES =====
  'Tillamook Bay': { runs: tillamookSystemRuns, waterBody: 'bay', tideInfluenced: true, nearestTideStation: '9437540', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Nehalem Bay': { runs: oregonCoastalRiverRuns, waterBody: 'bay', tideInfluenced: true, state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Yaquina Bay': { runs: oregonCoastalRiverRuns, waterBody: 'bay', tideInfluenced: true, nearestTideStation: '9435380', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },
  'Coos Bay': { runs: oregonCoastalRiverRuns, waterBody: 'bay', tideInfluenced: true, nearestTideStation: '9432780', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== OREGON OFFSHORE =====
  'Oregon Coast Offshore': { runs: oregonOffshoreRuns, waterBody: 'ocean', tideInfluenced: true, nearestTideStation: '9435380', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== OTHER OREGON =====
  'Multnomah Channel': { runs: willametteRiverRuns, waterBody: 'river', tideInfluenced: true, nearestTideStation: '9439040', state: 'OR', regulationsUrl: 'https://myodfw.com/articles/regulation-updates' },

  // ===== IDAHO =====
  'Snake River': { runs: snakeRiverRuns, waterBody: 'river', tideInfluenced: false, state: 'ID' },

  // ===== MONTANA =====
  'Montana': { runs: montanaRuns, waterBody: 'river', tideInfluenced: false, state: 'MT' },
};

// =============================================================================
// LOOKUP FUNCTIONS
// =============================================================================

/**
 * Get all active fish runs for a given date across all locations.
 * Returns runs sorted by: peak runs first, then by species priority.
 */
export function getActiveRunsForDate(date: Date): Array<{
  location: string;
  species: string;
  runType: string;
  isPeak: boolean;
  origin: string;
  notes: string;
  regulations?: string;
  waterBody: string;
  tideInfluenced: boolean;
  state: string;
}> {
  const month = date.getMonth();
  const year = date.getFullYear();
  const results: Array<{
    location: string;
    species: string;
    runType: string;
    isPeak: boolean;
    origin: string;
    notes: string;
    regulations?: string;
    waterBody: string;
    tideInfluenced: boolean;
    state: string;
  }> = [];

  for (const [location, data] of Object.entries(FISH_RUN_CALENDAR)) {
    for (const run of data.runs) {
      if (!run.months.includes(month)) continue;

      // Skip Pink Salmon in even years
      if (run.species === 'Pink Salmon (Humpy)' && year % 2 === 0) continue;

      results.push({
        location,
        species: run.species,
        runType: run.runType,
        isPeak: run.peakMonths.includes(month),
        origin: run.origin,
        notes: run.notes,
        regulations: run.regulations,
        waterBody: data.waterBody,
        tideInfluenced: data.tideInfluenced,
        state: data.state,
      });
    }
  }

  // Sort: peak runs first, then by species priority
  const speciesPriority: Record<string, number> = {
    'Chinook Salmon (Spring)': 1,
    'Chinook Salmon (Summer)': 2,
    'Chinook Salmon (Fall)': 3,
    'Chinook Salmon (King)': 4,
    'Coho Salmon (Silver)': 5,
    'Sockeye Salmon (Red)': 6,
    'Chum Salmon (Dog)': 7,
    'Pink Salmon (Humpy)': 8,
    'Winter Steelhead': 9,
    'Summer Steelhead': 10,
    'Steelhead': 11,
    'Sturgeon': 12,
    'Albacore Tuna': 13,
    'Halibut': 14,
    'Lingcod': 15,
    'Rockfish': 16,
    'Dungeness Crab': 17,
    'Shrimp': 18,
    'Rainbow Trout': 19,
    'Cutthroat Trout': 20,
    'Brown Trout': 21,
    'Smallmouth Bass': 22,
    'Largemouth Bass': 23,
    'Black Sea Bass': 24,
    'Cabezon': 25,
    'Surfperch': 26,
    'Flounder': 27,
    'Sole': 28,
    'Shad': 29,
  };

  results.sort((a, b) => {
    // Peak runs first
    if (a.isPeak && !b.isPeak) return -1;
    if (!a.isPeak && b.isPeak) return 1;
    // Then by species priority
    const pa = speciesPriority[a.species] ?? 100;
    const pb = speciesPriority[b.species] ?? 100;
    return pa - pb;
  });

  return results;
}

/**
 * Get active runs for a specific location on a given date.
 */
export function getRunsForLocation(locationName: string, date: Date): FishRun[] {
  const month = date.getMonth();
  const year = date.getFullYear();

  // Try exact match first
  let data = FISH_RUN_CALENDAR[locationName];

  // If no exact match, try to find a parent system
  if (!data) {
    for (const [key, value] of Object.entries(FISH_RUN_CALENDAR)) {
      if (locationName.includes(key) || key.includes(locationName.split(' - ')[0])) {
        data = value;
        break;
      }
    }
  }

  if (!data) return [];

  return data.runs.filter(run => {
    if (!run.months.includes(month)) return false;
    if (run.species === 'Pink Salmon (Humpy)' && year % 2 === 0) return false;
    return true;
  });
}

/**
 * Match a location name to its parent system in the fish run calendar.
 */
export function findLocationSystem(locationName: string): string | null {
  // Direct match
  if (FISH_RUN_CALENDAR[locationName]) return locationName;

  // Partial match (e.g., "Cowlitz River - Blue Creek" -> "Cowlitz River")
  for (const key of Object.keys(FISH_RUN_CALENDAR)) {
    if (locationName.startsWith(key) || locationName.includes(key)) return key;
  }

  // Match sub-locations to parent systems
  const systemMappings: Record<string, string> = {
    'Puget Sound -': 'Puget Sound',
    'Hood Canal -': 'Hood Canal',
    'San Juan Islands -': 'San Juan Islands',
    'Strait of Juan De Fuca -': 'Strait of Juan De Fuca',
    'Wilson River': 'Tillamook System',
    'Trask River': 'Tillamook System',
    'Kilchis River': 'Tillamook System',
    'Miami River': 'Tillamook System',
    'Tillamook River': 'Tillamook System',
    'Offshore Westport': 'WA Coast Offshore',
    'Offshore Ilwaco': 'WA Coast Offshore',
    'Offshore Neah Bay': 'WA Coast Offshore',
    'Offshore La Push': 'WA Coast Offshore',
    'Offshore Astoria': 'Oregon Coast Offshore',
    'Offshore Garibaldi': 'Oregon Coast Offshore',
    'Offshore Newport': 'Oregon Coast Offshore',
    'Offshore Depoe Bay': 'Oregon Coast Offshore',
    'Offshore Charleston': 'Oregon Coast Offshore',
    'Offshore Brookings': 'Oregon Coast Offshore',
    'Offshore Florence': 'Oregon Coast Offshore',
    'Drano Lake': 'Wind River',
    'Missoula': 'Montana',
    'Bozeman': 'Montana',
    'Boise': 'Snake River',
    'Idaho Falls': 'Snake River',
    'Sequim -': 'Sequim',
    'Sequim,': 'Sequim',
  };

  for (const [prefix, system] of Object.entries(systemMappings)) {
    if (locationName.includes(prefix)) return system;
  }

  return null;
}
