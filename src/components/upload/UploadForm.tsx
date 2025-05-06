import { useState, RefObject, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileItem, 
  ProcessingProgress, 
  ProcessingError,
  ProcessedDataSummary,
  DataPreview 
} from "@/components/upload/UploadStatusIndicators";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { 
  processFile, 
  isFileTypeSupported, 
  compressData, 
  decompressData,
  optimizeData
} from "@/utils/fileProcessors";
import { LoaderCircle } from "lucide-react";

interface UploadFormProps {
  fileInputRef: RefObject<HTMLInputElement>;
  setProcessedData: (data: any[] | null) => void;
  toast: any;
}

// Maximum number of records to store in localStorage to prevent quota errors
const MAX_RECORDS = 500;

// Maximum storage size in bytes (4.5MB to stay under 5MB quota)
const MAX_STORAGE_SIZE = 4.5 * 1024 * 1024;

export const UploadForm: React.FC<UploadFormProps> = ({ 
  fileInputRef, 
  setProcessedData,
  toast 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [processedData, setLocalProcessedData] = useState<any[] | null>(null);
  const [originalRecordCount, setOriginalRecordCount] = useState(0);
  const [dataFields, setDataFields] = useState<string[]>([]);

  // Load existing data on mount
  useEffect(() => {
    const loadExistingData = () => {
      try {
        const storedData = localStorage.getItem('fishingForecastData');
        if (storedData) {
          // Check if the data is compressed (starts with base64 characters)
          if (/^[A-Za-z0-9+/]+=*$/.test(storedData)) {
            const decompressedData = decompressData(storedData);
            setLocalProcessedData(decompressedData);
            setProcessedData(decompressedData);
            if (decompressedData.length > 0) {
              setDataFields(Object.keys(decompressedData[0]));
            }
          } else {
            // Handle legacy uncompressed data
            const parsedData = JSON.parse(storedData);
            setLocalProcessedData(parsedData);
            setProcessedData(parsedData);
            if (parsedData.length > 0) {
              setDataFields(Object.keys(parsedData[0]));
            }
          }
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadExistingData();
  }, [setProcessedData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset any previous errors
      setProcessingError(null);
      
      if (isFileTypeSupported(file)) {
        setSelectedFile(file);
        setLocalProcessedData(null); // Reset processed data when selecting a new file
        setProcessedData(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel, Word, PDF, CSV, or text file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setProcessingProgress(10);
    setProcessingError(null);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress < 90 ? newProgress : 90;
        });
      }, 300);

      // Process the file
      const fileData = await processFile(selectedFile);
      
      clearInterval(progressInterval);
      setProcessingProgress(95);
      
      if (fileData && Array.isArray(fileData) && fileData.length > 0) {
        // Store original record count before truncation
        setOriginalRecordCount(fileData.length);
        
        // Truncate data if it exceeds maximum to prevent storage quota errors
        const truncatedData = fileData.length > MAX_RECORDS 
          ? fileData.slice(0, MAX_RECORDS) 
          : fileData;
        
        // Optimize data structure if needed to reduce storage size
        const optimizedData = optimizeData(truncatedData, MAX_STORAGE_SIZE);
        
        // Extract field names for display
        if (optimizedData.length > 0) {
          setDataFields(Object.keys(optimizedData[0]));
        }
        
        // Process the truncated data and store it locally
        setLocalProcessedData(optimizedData);
        setProcessedData(optimizedData);
        setProcessingProgress(100);
        
        try {
          // Compress data before storing in localStorage
          const compressedData = compressData(optimizedData);
          
          // Store compressed data in localStorage
          localStorage.setItem('fishingForecastData', compressedData);
          
          // Record this upload in history
          const uploadRecord = {
            filename: selectedFile.name,
            timestamp: Date.now(),
            recordCount: optimizedData.length,
            originalCount: fileData.length,
            fileType: selectedFile.type || selectedFile.name.split('.').pop() || 'unknown',
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
          
          let message = `Your fishing data from "${selectedFile.name}" is now being used to enhance your forecasts`;
          
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
          setProcessingError("Data processed but too large to save permanently. It will be available until you refresh the page.");
        }
      } else {
        throw new Error("No valid data found in file.");
      }
    } catch (error) {
      console.error('Error processing file:', error);
      
      setProcessingError(error instanceof Error ? error.message : "Unknown error occurred");
      
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "There was an error processing your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearProcessedData = () => {
    setLocalProcessedData(null);
    setProcessedData(null);
    setDataFields([]);
    localStorage.removeItem('fishingForecastData');
    toast({
      title: "Data cleared",
      description: "The fishing forecast will now use default predictions",
    });
  };

  return (
    <>
      <FileDropZone onFileSelect={triggerFileInput} />
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv,.doc,.docx,.pdf,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {selectedFile && (
        <FileItem fileName={selectedFile.name} onRemove={() => setSelectedFile(null)} />
      )}
      
      {processingError && (
        <ProcessingError message={processingError} />
      )}
      
      {isUploading && (
        <ProcessingProgress progress={processingProgress} />
      )}
      
      <Button 
        className="w-full" 
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? (
          <>
            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : "Enhance My Forecast"}
      </Button>
      
      {processedData && processedData.length > 0 && (
        <>
          <ProcessedDataSummary 
            dataLength={processedData.length} 
            fileName={selectedFile?.name || ''} 
            originalCount={originalRecordCount}
            dataFields={dataFields}
            onReset={clearProcessedData} 
          />
          <DataPreview data={processedData} />
        </>
      )}
    </>
  );
};
