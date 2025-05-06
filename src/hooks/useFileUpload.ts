import { useState } from "react";
import { 
  processFile, 
  compressData, 
  decompressData,
  optimizeData
} from "@/utils/fileProcessors";

// Maximum number of records to store in localStorage to prevent quota errors
export const MAX_RECORDS = 500;

// Maximum storage size in bytes (4.5MB to stay under 5MB quota)
export const MAX_STORAGE_SIZE = 4.5 * 1024 * 1024;

export interface UploadState {
  isUploading: boolean;
  selectedFile: File | null;
  processingProgress: number;
  processingError: string | null;
  processedData: any[] | null;
  originalRecordCount: number;
  dataFields: string[];
}

export interface UploadActions {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  clearProcessedData: () => void;
  setSelectedFile: (file: File | null) => void;
  loadExistingData: () => void;
}

interface UseFileUploadProps {
  setProcessedData: (data: any[] | null) => void;
  toast: any;
}

export const useFileUpload = ({ setProcessedData, toast }: UseFileUploadProps): [UploadState, UploadActions] => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    selectedFile: null,
    processingProgress: 0,
    processingError: null,
    processedData: null,
    originalRecordCount: 0,
    dataFields: [],
  });

  const updateState = (newState: Partial<UploadState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const loadExistingData = () => {
    try {
      const storedData = localStorage.getItem('fishingForecastData');
      if (storedData) {
        // Check if the data is compressed (starts with base64 characters)
        if (/^[A-Za-z0-9+/]+=*$/.test(storedData)) {
          const decompressedData = decompressData(storedData);
          updateState({ processedData: decompressedData });
          setProcessedData(decompressedData);
          if (decompressedData.length > 0) {
            updateState({ dataFields: Object.keys(decompressedData[0]) });
          }
        } else {
          // Handle legacy uncompressed data
          const parsedData = JSON.parse(storedData);
          updateState({ processedData: parsedData });
          setProcessedData(parsedData);
          if (parsedData.length > 0) {
            updateState({ dataFields: Object.keys(parsedData[0]) });
          }
        }
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset any previous errors
      updateState({ 
        processingError: null,
        selectedFile: file,
        processedData: null // Reset processed data when selecting a new file
      });
      setProcessedData(null);
    }
  };

  const handleUpload = async () => {
    if (!state.selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    updateState({ 
      isUploading: true,
      processingProgress: 10,
      processingError: null
    });

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        updateState({
          processingProgress: prev => {
            const newProgress = state.processingProgress + Math.random() * 15;
            return newProgress < 90 ? newProgress : 90;
          }
        });
      }, 300);

      // Process the file
      const fileData = await processFile(state.selectedFile);
      
      clearInterval(progressInterval);
      updateState({ processingProgress: 95 });
      
      if (fileData && Array.isArray(fileData) && fileData.length > 0) {
        // Store original record count before truncation
        updateState({ originalRecordCount: fileData.length });
        
        // Truncate data if it exceeds maximum to prevent storage quota errors
        const truncatedData = fileData.length > MAX_RECORDS 
          ? fileData.slice(0, MAX_RECORDS) 
          : fileData;
        
        // Optimize data structure if needed to reduce storage size
        const optimizedData = optimizeData(truncatedData, MAX_STORAGE_SIZE);
        
        // Extract field names for display
        if (optimizedData.length > 0) {
          updateState({ dataFields: Object.keys(optimizedData[0]) });
        }
        
        // Process the truncated data and store it locally
        updateState({ 
          processedData: optimizedData,
          processingProgress: 100
        });
        setProcessedData(optimizedData);
        
        try {
          // Compress data before storing in localStorage
          const compressedData = compressData(optimizedData);
          
          // Store compressed data in localStorage
          localStorage.setItem('fishingForecastData', compressedData);
          
          // Record this upload in history
          const uploadRecord = {
            filename: state.selectedFile.name,
            timestamp: Date.now(),
            recordCount: optimizedData.length,
            originalCount: fileData.length,
            fileType: state.selectedFile.type || state.selectedFile.name.split('.').pop() || 'unknown',
            truncated: fileData.length > optimizedData.length,
            fields: optimizedData.length > 0 ? Object.keys(optimizedData[0]).length : 0
          };
          
          // Get existing history or create new array
          const existingHistory = localStorage.getItem('uploadHistory');
          const history = existingHistory ? JSON.parse(existingHistory) : [];
          
          // Add new record at the beginning
          history.unshift(uploadRecord);
          
          // Limit history size to prevent storage issues
          const limitedHistory = history.slice(0, 10);
          
          // Store back to localStorage
          localStorage.setItem('uploadHistory', JSON.stringify(limitedHistory));
          
          let message = `Your fishing data from "${state.selectedFile.name}" is now being used to enhance your forecasts`;
          
          if (fileData.length > optimizedData.length) {
            message += `. Note: ${optimizedData.length} of ${fileData.length} records were processed due to storage limitations`;
          }
          
          toast({
            title: "Data processed successfully",
            description: message,
          });
        } catch (storageError) {
          console.error('Storage error:', storageError);
          
          toast({
            variant: "destructive",
            title: "Storage error",
            description: "Your data was too large to store. Try uploading a smaller file or with fewer columns.",
          });
          
          // Fallback - keep data in memory only for this session
          updateState({
            processingError: "Data processed but too large to save permanently. It will be available until you refresh the page."
          });
        }
      } else {
        throw new Error("No valid data found in file.");
      }
    } catch (error) {
      console.error('Error processing file:', error);
      
      updateState({
        processingError: error instanceof Error ? error.message : "Unknown error occurred"
      });
      
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "There was an error processing your file",
        variant: "destructive",
      });
    } finally {
      updateState({ isUploading: false });
    }
  };

  const clearProcessedData = () => {
    updateState({ 
      processedData: null,
      dataFields: [] 
    });
    setProcessedData(null);
    localStorage.removeItem('fishingForecastData');
    toast({
      title: "Data cleared",
      description: "The fishing forecast will now use default predictions",
    });
  };

  const setSelectedFile = (file: File | null) => {
    updateState({ selectedFile: file });
  };

  return [
    state,
    {
      handleFileChange,
      handleUpload,
      clearProcessedData,
      setSelectedFile,
      loadExistingData
    }
  ];
};
