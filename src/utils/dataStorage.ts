import pako from 'pako';

/**
 * Compress data before storing to reduce storage space required
 */
export const compressData = (data: any[]): string => {
  // Convert data to string
  const jsonString = JSON.stringify(data);
  
  // Compress the string with pako
  const compressed = pako.deflate(jsonString, { to: 'string' });
  
  // Convert to base64 for storage
  return btoa(compressed);
};

/**
 * Decompress data after retrieving from storage
 */
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

/**
 * Estimate storage size of data
 */
export const estimateStorageSize = (data: any[]): number => {
  const jsonString = JSON.stringify(data);
  return jsonString.length * 2; // Rough estimate in bytes (2 bytes per char in UTF-16)
};

/**
 * Optimize data for storage by reducing fields if needed
 */
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
