
/**
 * Process CSV files
 */
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

/**
 * Process Text files
 */
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

/**
 * Generic mock data processor for unsupported formats (PDF, Word)
 */
export const processMockData = async (fileName: string): Promise<any[]> => {
  // For demonstration purposes - in real app, you'd use proper libraries
  // to extract text from PDFs or Word docs
  return [
    { source: fileName, content: "Sample extracted content 1" },
    { source: fileName, content: "Sample extracted content 2" }
  ];
};
