import * as XLSX from 'xlsx';
import pako from 'pako';

// Process Excel files (xlsx, xls)
export const processExcelFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (error) {
        console.error('Excel processing error:', error);
        reject(new Error('Failed to process Excel file. Please check the file format.'));
      }
    };
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      reject(new Error('Error reading the file.'));
    };
    
    reader.readAsBinaryString(file);
  });
};

// Process CSV files
export const processCsvFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const jsonData = lines.slice(1).map(line => {
          if (!line.trim()) return null; // Skip empty lines
          
          const values = line.split(',');
          const entry: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            entry[header] = values[index]?.trim() || '';
          });
          
          return entry;
        }).filter(Boolean); // Remove null entries
        
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Failed to process CSV file. Please check the file format.'));
      }
    };
    
    reader.onerror = (error) => reject(new Error('Error reading the file.'));
    reader.readAsText(file);
  });
};

// Process Text files
export const processTextFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        // Simple parsing: assume each line is an entry with a key-value pair
        const entries = text.split('\n')
          .filter(line => line.trim()) // Remove empty lines
          .map(line => {
            const entry: Record<string, string> = {};
            entry['content'] = line.trim();
            return entry;
          });
        
        resolve(entries);
      } catch (error) {
        reject(new Error('Failed to process text file.'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading the file.'));
    reader.readAsText(file);
  });
};

// Generic mock data processor for unsupported formats (PDF, Word)
export const processMockData = async (fileName: string): Promise<any[]> => {
  // For demonstration purposes - in real app, you'd use proper libraries
  // to extract text from PDFs or Word docs
  return [
    { source: fileName, content: "Sample extracted content 1" },
    { source: fileName, content: "Sample extracted content 2" }
  ];
};

// Determine file type and process accordingly
export const processFile = async (file: File): Promise<any[]> => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  
  if (['xlsx', 'xls'].includes(fileExtension) || 
      file.type.includes('excel') || 
      file.type.includes('spreadsheetml')) {
    return processExcelFile(file);
  } else if (fileExtension === 'csv' || file.type === 'text/csv') {
    return processCsvFile(file);
  } else if (fileExtension === 'txt' || file.type === 'text/plain') {
    return processTextFile(file);
  } else if (['pdf', 'doc', 'docx'].includes(fileExtension) || 
             file.type.includes('pdf') || 
             file.type.includes('word') || 
             file.type.includes('msword')) {
    // For demo purposes - in production you'd use proper PDF/Word extraction
    return processMockData(file.name);
  } else {
    throw new Error("Unsupported file format.");
  }
};

// Check if file type is supported
export const isFileTypeSupported = (file: File): boolean => {
  const supportedTypes = [
    // Excel formats
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    // Word formats
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // PDF format
    "application/pdf",
    // CSV and text formats
    "text/csv",
    "text/plain"
  ];
  
  // Check file extension as fallback
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  const supportedExtensions = ['xlsx', 'xls', 'csv', 'doc', 'docx', 'pdf', 'txt'];
  
  return supportedTypes.includes(file.type) || supportedExtensions.includes(fileExtension);
};

// Compress data before storing to reduce storage space required
export const compressData = (data: any[]): string => {
  // Convert data to string
  const jsonString = JSON.stringify(data);
  
  // Compress the string with pako
  const compressed = pako.deflate(jsonString, { to: 'string' });
  
  // Convert to base64 for storage
  return btoa(compressed);
};

// Decompress data after retrieving from storage
export const decompressData = (compressedData: string): any[] => {
  try {
    // Convert from base64
    const compressedString = atob(compressedData);
    
    // Decompress the string
    const decompressed = pako.inflate(compressedString, { to: 'string' });
    
    // Parse the JSON
    return JSON.parse(decompressed);
  } catch (error) {
    console.error('Error decompressing data:', error);
    return [];
  }
};

// Estimate storage size of data
export const estimateStorageSize = (data: any[]): number => {
  const jsonString = JSON.stringify(data);
  return jsonString.length * 2; // Rough estimate in bytes (2 bytes per char in UTF-16)
};

// Optimize data for storage by reducing fields if needed
export const optimizeData = (data: any[], maxSize: number = 4.5 * 1024 * 1024): any[] => {
  if (!data || !data.length) return [];
  
  // If data is already small enough, return it as is
  if (estimateStorageSize(data) <= maxSize) return data;
  
  // Sample a row to get field names
  const sampleRow = data[0];
  const allFields = Object.keys(sampleRow);
  
  // Keep only essential fields if too large
  // This is a simplistic approach - in a real app, you'd have logic to determine essential fields
  const essentialFields = allFields.slice(0, Math.max(3, Math.floor(allFields.length / 2)));
  
  return data.map(row => {
    const optimizedRow: Record<string, any> = {};
    essentialFields.forEach(field => {
      optimizedRow[field] = row[field];
    });
    return optimizedRow;
  });
};
