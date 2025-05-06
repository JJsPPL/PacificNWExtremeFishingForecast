
import * as XLSX from 'xlsx';

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
