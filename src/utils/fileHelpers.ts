
// File type validation utilities

/**
 * Check if file type is supported
 */
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
