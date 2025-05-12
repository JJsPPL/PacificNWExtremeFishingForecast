import React from 'react';
import LocationImport from '../../components/admin/LocationImport';

const LocationManager: React.FC = () => {
  const handleImportComplete = (data: any) => {
    // Here you would typically:
    // 1. Validate the imported data
    // 2. Update your application's state/storage
    // 3. Show a success message
    console.log('Imported location data:', data);
    
    // You can access the data as:
    // data.locations.Washington - array of Washington locations
    // data.locations.Oregon - array of Oregon locations
    // data.details["Location Name"] - details for specific location
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Location Manager</h1>
      
      <div className="mb-8">
        <LocationImport onImportComplete={handleImportComplete} />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p className="text-yellow-700">
          <strong>Excel File Format:</strong>
        </p>
        <ul className="list-disc ml-5 text-yellow-700">
          <li>Required columns: name, state</li>
          <li>Optional columns: waterType, accessType, regulations, notes</li>
          <li>State must be one of: Washington, Oregon, Idaho, or Montana</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationManager; 