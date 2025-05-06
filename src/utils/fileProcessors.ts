
import { processExcelFile } from './excelProcessor';
import { processCsvFile, processTextFile, processMockData } from './textProcessor';
import { isFileTypeSupported } from './fileHelpers';
import { compressData, decompressData, estimateStorageSize, optimizeData } from './dataStorage';

/**
 * Determine file type and process accordingly
 */
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

// Re-export all the utility functions for backwards compatibility
export {
  isFileTypeSupported,
  processExcelFile,
  processCsvFile,
  processTextFile,
  processMockData,
  compressData,
  decompressData,
  estimateStorageSize,
  optimizeData
};
