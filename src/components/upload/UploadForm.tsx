
import { useState, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileItem, 
  ProcessingProgress, 
  ProcessingError,
  ProcessedDataSummary,
  DataPreview 
} from "@/components/upload/UploadStatusIndicators";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { processFile, isFileTypeSupported } from "@/utils/fileProcessors";
import { LoaderCircle } from "lucide-react";

interface UploadFormProps {
  fileInputRef: RefObject<HTMLInputElement>;
  setProcessedData: (data: any[] | null) => void;
  toast: any;
}

// Maximum number of records to store in localStorage to prevent quota errors
const MAX_RECORDS = 500;

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
          const newProgress = prev + Math.random() * 20;
          return newProgress < 90 ? newProgress : 90;
        });
      }, 300);

      // Process the file
      const fileData = await processFile(selectedFile);
      
      clearInterval(progressInterval);
      setProcessingProgress(100);
      
      if (fileData && Array.isArray(fileData) && fileData.length > 0) {
        // Store original record count before truncation
        setOriginalRecordCount(fileData.length);
        
        // Truncate data if it exceeds maximum to prevent storage quota errors
        const truncatedData = fileData.length > MAX_RECORDS 
          ? fileData.slice(0, MAX_RECORDS) 
          : fileData;
        
        // Process the truncated data and store it locally
        setLocalProcessedData(truncatedData);
        setProcessedData(truncatedData);
        
        try {
          // Try to store in localStorage - with proper error handling
          const dataToStore = JSON.stringify(truncatedData);
          localStorage.setItem('fishingForecastData', dataToStore);
          
          // Record this upload in history
          const uploadRecord = {
            filename: selectedFile.name,
            timestamp: Date.now(),
            recordCount: truncatedData.length,
            originalCount: fileData.length,
            fileType: selectedFile.type || selectedFile.name.split('.').pop() || 'unknown',
            truncated: fileData.length > MAX_RECORDS
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
          
          if (fileData.length > MAX_RECORDS) {
            message += `. Note: Only ${MAX_RECORDS} of ${fileData.length} records were kept due to storage limitations`;
          }
          
          toast({
            title: "Data processed successfully",
            description: message,
          });
        } catch (storageError) {
          console.error('Storage error:', storageError);
          
          toast({
            title: "Storage warning",
            description: "Your data was processed but couldn't be saved permanently due to browser storage limitations. It will remain available until you refresh the page.",
            variant: "destructive",
          });
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
      setProcessingProgress(0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearProcessedData = () => {
    setLocalProcessedData(null);
    setProcessedData(null);
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
            onReset={clearProcessedData} 
          />
          <DataPreview data={processedData} />
        </>
      )}
    </>
  );
};
