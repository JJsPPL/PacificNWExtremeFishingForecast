
import { processExcelForecast } from './forecastImport';
import { FishingForecast } from '../types/fishingTypes';

export const importAllForecasts = async (files: FileList): Promise<Map<string, FishingForecast>> => {
  const allForecasts = new Map<string, FishingForecast>();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.name.endsWith('.csv')) continue;
    
    try {
      const forecasts = await processExcelForecast(file);
      
      // Merge forecasts, keeping highest quality entries
      for (const [date, forecast] of forecasts.entries()) {
        if (allForecasts.has(date)) {
          const existing = allForecasts.get(date)!;
          // Mark as duplicate and only replace if new forecast has better rating
          forecast.isDuplicate = true;
          if (existing.rating < forecast.rating) {
            allForecasts.set(date, forecast);
          }
        } else {
          forecast.isDuplicate = false;
          allForecasts.set(date, forecast);
        }
      }
      
      console.log(`Processed ${forecasts.size} forecasts from ${file.name}`);
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
    }
  }
  
  return allForecasts;
};
