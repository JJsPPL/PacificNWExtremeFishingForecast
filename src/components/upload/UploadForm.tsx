
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

interface UploadFormProps {
  fileInputRef: RefObject<HTMLInputElement>;
  setProcessedData: (data: any[] | null) => void;
  toast: any;
}

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
        // Process the data and store it locally
        setLocalProcessedData(fileData);
        setProcessedData(fileData);
        
        // Store in localStorage for the app to use
        localStorage.setItem('fishingForecastData', JSON.stringify(fileData));
        
        // Record this upload in history
        const uploadRecord = {
          filename: selectedFile.name,
          timestamp: Date.now(),
          recordCount: fileData.length,
          fileType: selectedFile.type || selectedFile.name.split('.').pop() || 'unknown'
        };
        
        // Get existing history or create new array
        const existingHistory = localStorage.getItem('uploadHistory');
        const history = existingHistory ? JSON.parse(existingHistory) : [];
        
        // Add new record at the beginning
        history.unshift(uploadRecord);
        
        // Store back to localStorage
        localStorage.setItem('uploadHistory', JSON.stringify(history));
        
        toast({
          title: "Data processed successfully",
          description: `Your fishing data from "${selectedFile.name}" is now being used to enhance your forecasts`,
        });
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
        {isUploading ? "Processing..." : "Enhance My Forecast"}
      </Button>
      
      {processedData && processedData.length > 0 && (
        <>
          <ProcessedDataSummary 
            dataLength={processedData.length} 
            fileName={selectedFile?.name || ''} 
            onReset={clearProcessedData} 
          />
          <DataPreview data={processedData} />
        </>
      )}
    </>
  );
};
