import React, { useState } from 'react';
import { processExcelFile, convertToLocationFormat } from '../../lib/utils/excelImport';

interface LocationImportProps {
  onImportComplete?: (data: any) => void;
}

const LocationImport: React.FC<LocationImportProps> = ({ onImportComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        throw new Error('Please upload an Excel file (.xlsx or .xls)');
      }

      // Process the Excel file
      const data = await processExcelFile(file);
      const formattedData = convertToLocationFormat(data);

      // Call the callback with the processed data
      if (onImportComplete) {
        onImportComplete(formattedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Import Location Data</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Upload an Excel file (.xlsx or .xls) containing location data.
          The file should have columns for: name, state, waterType, accessType, regulations, and notes.
        </p>
        
        <input
          type="file"
          accept=".xlsx,.xls"
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
          Processing file...
        </div>
      )}

      {error && (
        <div className="text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default LocationImport; 