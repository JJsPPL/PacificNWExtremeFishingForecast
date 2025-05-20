import { addDays, format, isSameDay } from "date-fns";
import { FishingForecast, FishingRecommendation, MoonPhase, MoonPosition, TideState } from "./types/fishingTypes";
import { generateRecommendations } from "./utils/recommendations";

// Generate mock data for a fishing forecast
export const getForecastForDate = (date: Date): FishingForecast => {
  // Create deterministic "random" value based on the date
  const dateValue = date.getDate() + (date.getMonth() * 31);
  const randomSeed = dateValue * 13 % 100;
  
  // Determine moon phase (simplified calculation)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
  const moonCycle = dayOfYear % 29.5; // Approximate lunar cycle
  
  let moonPhase: string;
  let moonBonus = 0;
  
  if (moonCycle < 1) {
    moonPhase = MoonPhase.New;
    moonBonus = 10;
  } else if (moonCycle < 7.4) {
    moonPhase = MoonPhase.WaxingCrescent;
    moonBonus = 15;
  } else if (moonCycle < 8.4) {
    moonPhase = MoonPhase.FirstQuarter;
    moonBonus = 25; // Bonus for first quarter (very prime)
  } else if (moonCycle < 14.8) {
    moonPhase = MoonPhase.WaxingGibbous;
    moonBonus = 15;
  } else if (moonCycle < 16.8) {
    moonPhase = MoonPhase.Full;
    moonBonus = 20;
  } else if (moonCycle < 22.1) {
    moonPhase = MoonPhase.WaningGibbous;
    moonBonus = 10;
  } else if (moonCycle < 23.1) {
    moonPhase = MoonPhase.LastQuarter;
    moonBonus = 15;
  } else {
    moonPhase = MoonPhase.WaningCrescent;
    moonBonus = 5;
  }
  
  // Add extra bonus for 3 days leading to first quarter
  if (moonCycle >= 4.4 && moonCycle < 7.4) {
    moonBonus += 15; // Three days leading to first quarter
  }
  
  // Determine moon position (more detailed than just rising)
  const hourOfDay = date.getHours();
  let moonPosition: string;
  
  if (hourOfDay >= 11 && hourOfDay <= 13) {
    moonPosition = MoonPosition.Overhead;
  } else if (hourOfDay >= 0 && hourOfDay <= 2) {
    moonPosition = MoonPosition.Underfoot;
  } else if (hourOfDay >= 6 && hourOfDay <= 10) {
    moonPosition = MoonPosition.Rising;
  } else {
    moonPosition = MoonPosition.Setting;
  }
  
  // Apply moon position bonuses
  if (moonPosition === MoonPosition.Overhead || moonPosition === MoonPosition.Underfoot) {
    moonBonus += 15; // Peak feeding times according to solunar theory
  }
  
  // Calculate barometric pressure (simplified simulation)
  const baseBarometricPressure = 29.92; // Standard sea level pressure
  const pressureVariation = (Math.sin(dateValue / 5) * 0.5); // Simulated variation
  const barometricPressure = +(baseBarometricPressure + pressureVariation).toFixed(2);
  
  // Determine pressure trend
  let pressureTrend = "Stable";
  let pressureBonus = 0;
  
  if (pressureVariation < -0.1) {
    pressureTrend = "Falling";
    pressureBonus = 15;
    
    // Extra bonus for low and falling pressure
    if (barometricPressure < 29.7) {
      pressureBonus += 15;
    }
  } else if (pressureVariation > 0.1) {
    pressureTrend = "Rising";
    pressureBonus = 5;
  } else {
    pressureTrend = "Stable";
    pressureBonus = 10;
  }
  
  // Calculate base rating from random seed
  let baseRating = 30 + (randomSeed % 20);
  
  // Add bonuses
  let rating = baseRating + moonBonus + pressureBonus;
  
  // Seasonal adjustments (simplified)
  const month = date.getMonth();
  
  // Spring and fall are generally better fishing seasons
  if (month >= 3 && month <= 5) { // Spring
    rating += 10;
  } else if (month >= 8 && month <= 10) { // Fall
    rating += 15;
  } else if (month >= 11 || month <= 1) { // Winter
    rating -= 5;
  }
  
  // Ensure rating is between 0-100
  rating = Math.max(0, Math.min(100, rating));

  // Generate tide data based on the date
  // This is a simplified model - in reality, would be based on actual tide tables
  const tideHour = (date.getHours() + date.getDate()) % 12;
  let tideData = {
    highTide: `${(tideHour + 2) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour < 6 ? 'AM' : 'PM'}`,
    lowTide: `${(tideHour + 8) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour >= 6 ? 'AM' : 'PM'}`,
    slackTide: `${(tideHour + 5) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour < 6 ? 'AM' : 'PM'} & ${(tideHour + 11) % 12 || 12}:${tideHour < 10 ? '0' + tideHour : tideHour}${tideHour >= 6 ? 'AM' : 'PM'}`,
    currentDirection: tideHour < 6 ? TideState.IncomingTide : TideState.OutgoingTide
  };

  // Generate salmon run status based on month
  let salmonRunStatus: string;
  if (month === 2 || month === 3) { // March-April
    salmonRunStatus = "Early Spring Chinook beginning to enter the Willamette and Columbia systems. Fish counts increasing at Willamette Falls fish ladder and Bonneville Dam.";
  } else if (month === 4) { // May
    salmonRunStatus = "Spring Chinook runs at peak in Willamette River system. Good numbers reported passing Willamette Falls fish ladder. Columbia River Spring Chinook counts strong at Bonneville Dam.";
  } else if (month === 5) { // June
    salmonRunStatus = "Late Spring Chinook and early Summer Chinook runs active. Summer steelhead entering the Willamette system with increasing numbers at Willamette Falls.";
  } else if (month === 6 || month === 7) { // July-August
    salmonRunStatus = "Summer Chinook and Sockeye runs at peak in Columbia River system. Summer steelhead passing Willamette Falls. Coho beginning to stage in estuaries.";
  } else if (month === 8) { // September
    salmonRunStatus = "Fall Chinook entering the Columbia and Willamette systems. Bonneville Dam counts increasing daily. Early Coho appearing in tributary mouths.";
  } else if (month >= 9 && month <= 10) { // October-November
    salmonRunStatus = "Fall Chinook and Coho runs at peak throughout Columbia and Willamette systems. Strong returns reported in Cowlitz, Lewis, and Clackamas Rivers. Willamette tributaries seeing good Coho numbers.";
  } else if (month === 11 || month === 0) { // December-January
    salmonRunStatus = "Late Fall Chinook tapering off. Winter steelhead beginning their run into Willamette tributaries and coastal streams. Clackamas and Sandy rivers showing increasing winter steelhead counts.";
  } else if (month === 1) { // February
    salmonRunStatus = "Winter steelhead at peak run in Willamette tributaries. Early Spring Chinook beginning to enter lower Columbia and Willamette systems.";
  } else {
    salmonRunStatus = "Pre-season preparation. Check WDFW, ODFW hatchery reports and dam counts for updated forecasts on Columbia and Willamette river systems.";
  }
  
  // Generate recommendations based on season, location, and conditions
  const recommendations = generateRecommendations(date, rating, moonPhase, barometricPressure);
  
  // Enhance recommendations with tide-specific information
  const enhancedRecommendations = recommendations.map(rec => {
    // If Columbia River or Nestucca River locations, provide specific tide tactics
    if (rec.location && (rec.location.includes("Columbia River") || rec.location.includes("Nestucca River"))) {
      return {
        ...rec,
        tideInfo: "Best fishing on outgoing tides and slack tides when changing from low to high. Focus on current seams and deeper holes."
      };
    }
    // If Willamette River location, provide specific tide-influenced tactics based on location
    else if (rec.location && rec.location.includes("Willamette River")) {
      // Lower Willamette has more tidal influence
      if (rec.location.includes("Portland") || rec.location.includes("Multnomah Channel")) {
        return {
          ...rec,
          tideInfo: "Tidal influence extends to Oregon City Falls. Best fishing during the last two hours of outgoing tide and first hour of incoming tide in lower sections."
        };
      } 
      // Middle and upper Willamette sections
      else {
        return {
          ...rec,
          tideInfo: "Limited tidal influence. Focus on current breaks, confluence areas, and structure during stable river flows."
        };
      }
    }
    // If species is salmon or steelhead (excluding specific rivers with custom tactics)
    else if ((rec.species.includes("Salmon") || rec.species.includes("Steelhead")) && 
             !(rec.location && (rec.location.includes("Columbia River") || 
                              rec.location.includes("Nestucca River") || 
                              rec.location.includes("Willamette River")))) {
      return {
        ...rec,
        tideInfo: "Fish during tide changes with particular attention to current breaks and structure."
      };
    }
    // If species is Lingcod or Rockfish, include tidal information relevant to these species
    else if (rec.species === "Lingcod" || rec.species === "Rockfish") {
      return {
        ...rec,
        tideInfo: "Fish during slack tide or moderate current periods for better bottom contact. Target structure during tide changes."
      };
    }
    // If albacore tuna, include specific tide tactics for tuna
    else if (rec.species && rec.species.includes("Tuna")) {
      return {
        ...rec,
        tideInfo: "Fish the last two hours of incoming tide and first hour of outgoing tide for optimal results."
      };
    }
    return rec;
  });
  
  return {
    date,
    rating: Math.round(rating),
    moonPhase,
    moonPosition,
    barometricPressure,
    pressureTrend,
    tideData,
    salmonRunStatus,
    recommendations: enhancedRecommendations
  };
};
