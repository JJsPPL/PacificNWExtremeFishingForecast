
import React, { useState } from 'react';
import { importAllForecasts } from '../../lib/utils/batchImport';
import { FishingForecast } from '../../lib/types/fishingTypes';

interface ForecastImportProps {
  onImportComplete?: (data: Map<string, FishingForecast>) => void;
}

const ForecastImport: React.FC<ForecastImportProps> = ({ onImportComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; duplicates: number } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    setError(null);
    setStats(null);

    try {
      // Process all CSV files
      const forecasts = await importAllForecasts(files);
      
      // Calculate stats
      const totalRows = forecasts.size;
      const duplicatesRemoved = Array.from(forecasts.values()).filter(f => f.isDuplicate === true).length;
      
      setStats({
        total: totalRows,
        duplicates: duplicatesRemoved
      });

      // Call the callback with the processed data
      if (onImportComplete) {
        onImportComplete(forecasts);
      }
    } catch (err) {
      console.error('Import error:', err);
      setError(err instanceof Error ? err.message : 'Failed to import files');
    } finally {
      setIsLoading(false);
      // Reset the file input to allow selecting the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Import Forecast Data</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Upload your CSV files containing fishing forecast data.
          Each file should have columns for: Date, Moon Phase, Barometric Pressure, Temperature, Water/Flow, Clarity, Quality
        </p>
        
        <input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={isLoading}
        />
      </div>

      {isLoading && (
        <div className="text-blue-600">
          Processing files...
        </div>
      )}

      {error && (
        <div className="text-red-600">
          {error}
        </div>
      )}

      {stats && (
        <div className="text-green-600">
          <p>Successfully processed {stats.total} forecasts</p>
          {stats.duplicates > 0 && (
            <p>Removed {stats.duplicates} duplicate or lower quality entries</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastImport;
