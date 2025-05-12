import * as XLSX from 'xlsx';

interface LocationData {
  name: string;
  state: string;
  waterType?: string;
  accessType?: string;
  regulations?: string;
  notes?: string;
}

export const processExcelFile = async (file: File): Promise<LocationData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert Excel data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as LocationData[];
        
        // Validate and clean the data
        const validatedData = jsonData.filter(row => {
          return row.name && row.state && 
                 ['Washington', 'Oregon', 'Idaho', 'Montana'].includes(row.state);
        });

        resolve(validatedData);
      } catch (error) {
        reject(new Error('Failed to process Excel file: ' + error));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };

    reader.readAsBinaryString(file);
  });
};

export const convertToLocationFormat = (data: LocationData[]) => {
  // Group locations by state
  const locationsByState = data.reduce((acc, curr) => {
    if (!acc[curr.state]) {
      acc[curr.state] = [];
    }
    acc[curr.state].push(curr.name);
    return acc;
  }, {} as Record<string, string[]>);

  // Create location details object
  const locationDetails = data.reduce((acc, curr) => {
    if (curr.waterType || curr.accessType || curr.regulations || curr.notes) {
      acc[curr.name] = {
        waterType: curr.waterType || 'Unknown',
        accessType: curr.accessType || 'Unknown',
        regulations: curr.regulations || 'Check local regulations',
        notes: curr.notes || ''
      };
    }
    return acc;
  }, {} as Record<string, any>);

  return {
    locations: locationsByState,
    details: locationDetails
  };
}; 