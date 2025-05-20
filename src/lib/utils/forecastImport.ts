import { FishingForecast, FishingRecommendation, MoonPhase, MoonPosition } from '../types/fishingTypes';

interface ExcelForecastData {
  date: string;
  moonPhase: string;
  barometricPressure: number;
  temperature: number;
  waterFlow: string;
  clarity: string;
  quality: string;
}

export const processExcelForecast = async (file: File): Promise<Map<string, FishingForecast>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const forecasts = new Map<string, FishingForecast>();
    
    reader.onload = (e) => {
      try {
        const csvData = e.target?.result as string;
        const rows = csvData.split('\n').map(row => row.split(','));
        const headers = rows[0].map(h => h.trim().toLowerCase());
        
        // Process each row starting from index 1 (skip headers)
        rows.slice(1).forEach(row => {
          if (row.length < headers.length) return; // Skip incomplete rows
          
          const rowData: any = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index].trim();
          });
          
          const dateStr = new Date(rowData.date).toISOString().split('T')[0];
          
          // Skip if we already have better data for this date
          if (forecasts.has(dateStr)) {
            const existing = forecasts.get(dateStr)!;
            if (existing.rating > convertQualityToRating(rowData.quality)) {
              return;
            }
          }
          
          const forecast: FishingForecast = {
            date: new Date(dateStr),
            rating: convertQualityToRating(rowData.quality),
            moonPhase: convertToMoonPhase(rowData.moonphase),
            moonPosition: determineMoonPosition(rowData.moonphase), // Changed from moonRising to moonPosition
            barometricPressure: parseFloat(rowData.barometricpressure) || 29.92,
            pressureTrend: determinePressureTrend(parseFloat(rowData.barometricpressure)),
            recommendations: generateRecommendationsFromData(rowData)
          };
          
          forecasts.set(dateStr, forecast);
        });
        
        resolve(forecasts);
      } catch (error) {
        reject(new Error('Failed to process file: ' + error));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Helper functions remain the same
const convertQualityToRating = (quality: string): number => {
  const qualityMap: { [key: string]: number } = {
    'excellent': 90,
    'very good': 80,
    'good': 70,
    'fair': 50,
    'poor': 30,
    'very poor': 20
  };
  return qualityMap[quality.toLowerCase()] || 50;
};

const convertToMoonPhase = (phase: string): string => {
  const moonPhaseMap: { [key: string]: string } = {
    'new': MoonPhase.New,
    'first quarter': MoonPhase.FirstQuarter,
    'full': MoonPhase.Full,
    'last quarter': MoonPhase.LastQuarter,
    'waxing crescent': MoonPhase.WaxingCrescent,
    'waxing gibbous': MoonPhase.WaxingGibbous,
    'waning gibbous': MoonPhase.WaningGibbous,
    'waning crescent': MoonPhase.WaningCrescent
  };
  return moonPhaseMap[phase.toLowerCase()] || MoonPhase.New;
};

// Changed from determineMoonRising to determineMoonPosition to match the updated interface
const determineMoonPosition = (phase: string): string => {
  // Default to Moon Rising if we can't determine a better position
  // In a real implementation, this would use time of day and moon phase to determine position
  const moonPhaseStr = phase.toLowerCase();
  if (['waxing crescent', 'waxing gibbous', 'first quarter'].includes(moonPhaseStr)) {
    return MoonPosition.Rising;
  } else if (['waning crescent', 'waning gibbous', 'last quarter'].includes(moonPhaseStr)) {
    return MoonPosition.Setting;
  } else if (moonPhaseStr === 'full') {
    return MoonPosition.Overhead;
  } else {
    return MoonPosition.Underfoot;
  }
};

const determinePressureTrend = (pressure: number): string => {
  if (pressure > 30.2) return 'Rising';
  if (pressure < 29.8) return 'Falling';
  return 'Stable';
};

const generateRecommendationsFromData = (row: any): FishingRecommendation[] => {
  const recommendations: FishingRecommendation[] = [];
  
  const baseRecommendation: FishingRecommendation = {
    species: 'Various',
    location: 'Pacific Northwest Waters',
    tactics: determineTactics(row),
    waterConditions: `Water clarity: ${row.clarity}, Flow: ${row.waterflow}`,
    bestTime: determineBestTime(row),
    bait: determineBait(row)
  };
  
  recommendations.push(baseRecommendation);
  return recommendations;
};

const determineTactics = (row: any): string => {
  const tactics = [];
  
  if (row.clarity?.toLowerCase() === 'clear') {
    tactics.push('Use lighter line and natural presentations');
  } else if (row.clarity?.toLowerCase() === 'murky') {
    tactics.push('Use brighter lures and scented baits');
  }
  
  const temp = parseFloat(row.temperature);
  if (temp < 50) {
    tactics.push('Slow down presentations');
  } else if (temp > 65) {
    tactics.push('Focus on early morning or late evening');
  }
  
  return tactics.join('. ') || 'Adjust tactics based on conditions';
};

const determineBestTime = (row: any): string => {
  const temp = parseFloat(row.temperature);
  if (temp > 65) return 'Early morning or late evening';
  if (row.moonphase?.toLowerCase().includes('full')) return 'Dawn and dusk';
  return 'Throughout the day, focus on tide changes';
};

const determineBait = (row: any): string => {
  if (row.clarity?.toLowerCase() === 'clear') return 'Natural colored lures and live bait';
  if (row.clarity?.toLowerCase() === 'murky') return 'Bright colored lures and scented baits';
  return 'Mix of artificial and natural baits';
};
