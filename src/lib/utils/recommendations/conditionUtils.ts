
import { LOCATION_DETAILS } from "../../constants/fishingLocations";

// Functions for water conditions and timing recommendations
export const generateWaterConditions = (location: string | undefined, month: number, date: Date): string => {
  // Get the location details if they exist
  const locationDetail = location ? (LOCATION_DETAILS[location as keyof typeof LOCATION_DETAILS]) : undefined;
  
  let waterConditions: string;
  
  if (location && location.includes("River") && (month < 5 || month > 8)) {
    // More detailed river conditions in fall/winter/spring
    const conditions = [
      `Water levels fluctuating with rainfall, typically 42-46°F in winter months. Focus on periods of dropping water levels after rain.`,
      `Slightly off-color water with 1-3 feet visibility. Cold water temperatures between 38-44°F require slower presentations.`,
      `River running at moderate level with 2-4 feet visibility. Look for water temperatures in the 44-48°F range for active fish.`,
      `Clear conditions with excellent visibility. Early morning and late evening are key during these conditions.`
    ];
    waterConditions = conditions[(date.getDate() * 1) % conditions.length];
    
    // If we have location details, incorporate them
    if (locationDetail) {
      const notes = locationDetail.notes || "";
      waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
    }
  } else if (location && (location.includes("Sound") || location.includes("Bay"))) {
    // More detailed saltwater conditions
    const conditions = [
      `Tidal currents moderate with 55-58°F water temperature. Focus on pinnacles and drop-offs during tide changes.`,
      `Strong tidal exchange creating productive rip lines. Target structure during peak current flow.`,
      `Moderate visibility with tannin-stained water from river outflow. Focus on color breaks where fresh and salt water mix.`,
      `Clean ocean water with good visibility. Work deeper water during daylight hours and move shallower at dawn/dusk.`
    ];
    waterConditions = conditions[(date.getDate() * 2) % conditions.length];
  } else {
    // Default conditions with more detail
    waterConditions = date.getDate() % 2 === 0 ? 
      "Clear water with moderate flow, 48-54°F depending on season. Look for structure where fish can rest out of the main current." : 
      "Slightly turbid water with rising levels after recent rainfall. Water temperatures ranging from 42-50°F. Target inside corners and current seams.";
    
    // If we have location details, incorporate them
    if (locationDetail) {
      const notes = locationDetail.notes || "";
      waterConditions = `${waterConditions} ${notes ? notes.split('.')[0] || "" : ""}.`;
    }
  }
  
  return waterConditions;
};

export const getBestTimeRecommendation = (date: Date): string => {
  // More specific best time recommendations
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
