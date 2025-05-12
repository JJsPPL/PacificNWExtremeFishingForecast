import React from 'react';
import ForecastImport from '../../components/admin/ForecastImport';
import { FishingForecast } from '../../lib/types/fishingTypes';

const ForecastManager: React.FC = () => {
  const handleImportComplete = (data: Map<string, FishingForecast>) => {
    // Here you would typically:
    // 1. Update your application's state/storage with the new forecast data
    // 2. Show a success message
    // 3. Refresh the UI with new data
    console.log('Imported forecast data:', data);
    
    // Example of accessing the data:
    for (const [date, forecast] of data.entries()) {
      console.log(`Date: ${date}`);
      console.log(`Rating: ${forecast.rating}`);
      console.log(`Moon Phase: ${forecast.moonPhase}`);
      console.log(`Barometric Pressure: ${forecast.barometricPressure}`);
      console.log('---');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Forecast Manager</h1>
      
      <div className="mb-8">
        <ForecastImport onImportComplete={handleImportComplete} />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p className="text-yellow-700">
          <strong>CSV File Format Requirements:</strong>
        </p>
        <ul className="list-disc ml-5 text-yellow-700">
          <li>Save your Excel file as CSV (Comma Separated Values)</li>
          <li>Required columns: Date, Moon Phase, Barometric Pressure, Temperature, Water/Flow, Clarity, Quality</li>
          <li>Date should be in a standard format (e.g., MM/DD/YYYY)</li>
          <li>Quality should be one of: Excellent, Very Good, Good, Fair, Poor, Very Poor</li>
          <li>Duplicate dates will be handled by keeping the highest quality entry</li>
        </ul>
      </div>
    </div>
  );
};

export default ForecastManager; 