
import { LOCATION_DETAILS } from "../../constants/fishingLocations";
import { getCurrentYear } from "../dateUtils";

// DROUGHT ALERT: Pacific Northwest experiencing 50% below normal precipitation
// Based on historic drought years (2001, 2015, 2021) with similar conditions
export const IS_DROUGHT_YEAR = true;
const DROUGHT_SEVERITY = 0.50; // 50% of normal precipitation

// Get drought impact modifier based on location and species
export const getDroughtImpact = (location: string | undefined, month: number): {
  impactLevel: 'severe' | 'moderate' | 'minimal';
  ratingModifier: number;
  description: string;
  tactics: string;
} => {
  // Rivers most affected by low water (based on 2001, 2015, 2021 historic data)
  const highImpactRivers = ['Cowlitz', 'Lewis', 'Sandy', 'Clackamas', 'Nestucca', 'Wilson', 'Tillamook', 'Chehalis'];
  const isHighImpactRiver = location ? highImpactRivers.some(r => location.includes(r)) : false;
  
  // Dam-controlled rivers fare better in drought
  const damControlledRivers = ['Cowlitz', 'Lewis', 'Wynoochee', 'Clackamas'];
  const isDamControlled = location ? damControlledRivers.some(r => location.includes(r)) : false;
  
  // Winter/Spring months (Dec-May) - steelhead impacted but less severe than summer
  if (month >= 11 || month <= 4) {
    if (isHighImpactRiver && !isDamControlled) {
      return {
        impactLevel: 'moderate',
        ratingModifier: -10,
        description: `⚠️ ${getCurrentYear()} DROUGHT ALERT: Rivers running 40-60% below normal winter flows (similar to 2015). Low, clear water conditions require stealth tactics.`,
        tactics: 'Downsize to 6-8lb fluorocarbon leaders, use smaller 1/8oz jigs, fish early morning/late evening, target "broken water" (riffles, tailouts) where fish feel secure.'
      };
    } else if (isDamControlled) {
      return {
        impactLevel: 'minimal',
        ratingModifier: -5,
        description: `${getCurrentYear()} Drought Impact: Dam-controlled flows providing more stable conditions than rain-dependent rivers. Check dam release schedules.`,
        tactics: 'Standard winter presentations work, but lighter leaders (8-10lb) recommended in clearer water.'
      };
    }
  }
  
  // Summer months - severe impacts expected (based on 2015 heat wave data)
  if (month >= 5 && month <= 8) {
    if (isHighImpactRiver) {
      return {
        impactLevel: 'severe',
        ratingModifier: -20,
        description: `🔴 ${getCurrentYear()} DROUGHT CRITICAL: Historic low flows expected similar to 2015. Water temps may exceed 68°F. Emergency closures possible. Fish mortality risk.`,
        tactics: 'Avoid fishing when water temps >65°F. Fish only before 9AM. Release fish quickly. Consider coastal ocean fishing as alternative.'
      };
    }
  }
  
  // Fall months - delayed salmon runs expected
  if (month >= 8 && month <= 10) {
    return {
      impactLevel: 'moderate',
      ratingModifier: -12,
      description: `⚠️ ${getCurrentYear()} Drought Impact: Fall salmon runs likely delayed 2-4 weeks waiting for rain. Fish staging in lower rivers and estuaries longer.`,
      tactics: 'Target estuary and lower river sections. Salmon concentrated in deeper, cooler pools. Watch for first significant rain events to trigger migration.'
    };
  }
  
  return {
    impactLevel: 'minimal',
    ratingModifier: 0,
    description: '',
    tactics: ''
  };
};

// Historic drought year comparison data for forecast accuracy
export const DROUGHT_HISTORIC_DATA = {
  2001: {
    precipitationPct: 55,
    steelheadSurvival: 0.65,
    salmonDelayWeeks: 3,
    closures: ['Skykomish', 'Stillaguamish', 'Snoqualmie']
  },
  2015: {
    precipitationPct: 48,
    steelheadSurvival: 0.52,
    salmonDelayWeeks: 4,
    closures: ['30+ rivers in WA/OR', 'Columbia tributaries', 'Hoot-owl restrictions statewide']
  },
  2021: {
    precipitationPct: 58,
    steelheadSurvival: 0.70,
    salmonDelayWeeks: 2,
    closures: ['Washougal', 'Selected coastal streams']
  },
  2026: {
    precipitationPct: 50,
    steelheadSurvival: 0.60, // Projected based on similar years
    salmonDelayWeeks: 3,    // Projected
    closures: ['TBD - Monitor WDFW/ODFW announcements']
  }
};

// Functions for water conditions and timing recommendations
export const generateWaterConditions = (location: string | undefined, month: number, date: Date): string => {
  // Get the location details if they exist
  const locationDetail = location ? (LOCATION_DETAILS[location as keyof typeof LOCATION_DETAILS]) : undefined;
  
  // Check drought impact for current year
  const droughtImpact = getDroughtImpact(location, month);
  const year = getCurrentYear();
  
  let waterConditions: string;
  
  if (location && location.includes("River") && (month < 5 || month > 8)) {
    // Winter drought conditions - significantly lower flows
    const conditions = IS_DROUGHT_YEAR ? [
      `⚠️ DROUGHT ${year}: River at 40-50% normal winter flow. Crystal clear water with 4-6+ feet visibility. Water temps 38-42°F. Stealth approach critical.`,
      `LOW WATER ALERT: Flows 50-60% of average. 3-5 feet visibility with gin-clear pools. Use lighter 6-8lb leaders and natural colors.`,
      `DROUGHT CONDITIONS: River running low and clear. Fish holding in deeper pockets and "broken water" (riffles/tailouts). Early AM/late PM best.`,
      `${year} SNOW DROUGHT: Below-normal snowpack = sustained low flows. Fish concentrated in limited holding water. Downsize presentations.`
    ] : [
      `Water levels fluctuating with rainfall, typically 42-46°F in winter months. Focus on periods of dropping water levels after rain.`,
      `Slightly off-color water with 1-3 feet visibility. Cold water temperatures between 38-44°F require slower presentations.`,
      `River running at moderate level with 2-4 feet visibility. Look for water temperatures in the 44-48°F range for active fish.`,
      `Clear conditions with excellent visibility. Early morning and late evening are key during these conditions.`
    ];
    waterConditions = conditions[(date.getDate() * 1) % conditions.length];
    
    // Add drought tactics if applicable
    if (IS_DROUGHT_YEAR && droughtImpact.impactLevel !== 'minimal') {
      waterConditions += ` ${droughtImpact.tactics}`;
    }
    
    // If we have location details, incorporate them
    if (locationDetail) {
      const notes = locationDetail.notes || "";
      waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
    }
  } else if (location && (location.includes("Sound") || location.includes("Bay"))) {
    // Saltwater conditions less affected by drought
    const conditions = [
      `Tidal currents moderate with 55-58°F water temperature. Focus on pinnacles and drop-offs during tide changes.`,
      `Strong tidal exchange creating productive rip lines. Target structure during peak current flow.`,
      `Moderate visibility with tannin-stained water from river outflow. Focus on color breaks where fresh and salt water mix.`,
      `Clean ocean water with good visibility. Work deeper water during daylight hours and move shallower at dawn/dusk.`
    ];
    waterConditions = conditions[(date.getDate() * 2) % conditions.length];
  } else {
    // Default conditions with drought consideration
    if (IS_DROUGHT_YEAR) {
      waterConditions = date.getDate() % 2 === 0 ?
        `${year} DROUGHT: Clear water with very low flow (50% normal). Water temps 44-52°F. Fish holding in limited structure. Downsize gear and use natural presentations.` :
        "LOW WATER CONDITIONS: Gin-clear water despite recent weather. Target deeper holding water and broken water areas. Light leaders (6-8lb) essential.";
    } else {
      waterConditions = date.getDate() % 2 === 0 ? 
        "Clear water with moderate flow, 48-54°F depending on season. Look for structure where fish can rest out of the main current." : 
        "Slightly turbid water with rising levels after recent rainfall. Water temperatures ranging from 42-50°F. Target inside corners and current seams.";
    }
    
    // If we have location details, incorporate them
    if (locationDetail) {
      const notes = locationDetail.notes || "";
      waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
    }
  }
  
  return waterConditions;
};

export const getBestTimeRecommendation = (date: Date): string => {
  const month = date.getMonth();
  
  // Drought-specific timing recommendations
  if (IS_DROUGHT_YEAR) {
    const droughtBestTimes = [
      "🌅 DROUGHT TIP: Fish first light (30 min before sunrise to 2 hrs after). Low, clear water makes fish spooky in bright light.", 
      "🌙 LOW WATER: Late afternoon/evening (3 hrs before sunset). Fish feed more aggressively as light diminishes.",
      "☁️ OVERCAST = GOLD: Cloudy days allow all-day fishing in drought conditions. Don't miss these opportunities.",
      "🌧️ RAIN EVENTS: Any precipitation triggers feeding activity. First rain after dry spell is often exceptional.",
      "⬆️ TIDE TIMING: During incoming tide (middle third) when fresh water mixes - fish more active.",
      "📊 PRESSURE DROP: Falling barometric pressure signals incoming weather - fish sense it and feed heavily."
    ];
    
    const bestTimeIndex = (date.getDate() * 5) % droughtBestTimes.length;
    return droughtBestTimes[bestTimeIndex];
  }
  
  // Standard best time recommendations
  const bestTimeOptions = [
    "Early morning when first light hits the water, particularly 30 minutes before to 2 hours after sunrise.", 
    "Late afternoon as shadows extend across the water, typically 2-3 hours before sunset.",
    "Overcast conditions with light drizzle, which reduces light penetration and can trigger feeding activity.",
    "After light rain when water levels are rising slightly, bringing fresh nutrients into the system.",
    "During incoming tide, especially the middle third when water flow is strongest.",
    "During stable barometric pressure following a weather front, particularly if pressure has been falling for 24+ hours."
  ];
  
  const bestTimeIndex = (date.getDate() * 5) % bestTimeOptions.length;
  return bestTimeOptions[bestTimeIndex];
};
