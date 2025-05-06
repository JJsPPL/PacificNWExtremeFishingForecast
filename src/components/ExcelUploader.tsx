
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Database, File } from "lucide-react";
import { 
  FileItem, 
  ProcessingProgress, 
  ProcessingError,
  ForecastEnhancedAlert,
  ProcessedDataSummary,
  DataPreview 
} from "@/components/upload/UploadStatusIndicators";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { processFile, isFileTypeSupported } from "@/utils/fileProcessors";

export const ExcelUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset any previous errors
      setProcessingError(null);
      
      if (isFileTypeSupported(file)) {
        setSelectedFile(file);
        setProcessedData(null); // Reset processed data when selecting a new file
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
    setProcessedData(null);
    localStorage.removeItem('fishingForecastData');
    toast({
      title: "Data cleared",
      description: "The fishing forecast will now use default predictions",
    });
  };

  const isForecastEnhanced = localStorage.getItem('fishingForecastData') !== null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Enhance Fishing Forecast
        </CardTitle>
        <CardDescription>
          Upload your fishing data to personalize forecasts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
            <AlertTitle className="text-sm font-medium flex items-center gap-2">
              <File className="h-4 w-4" />
              How This Works
            </AlertTitle>
            <AlertDescription className="text-xs mt-2">
              <p className="mb-1">
                Upload a data file with your historical fishing information to improve forecast accuracy. 
                Your data stays on your device – it's never sent to an external server.
              </p>
              <p>
                Supported formats: Excel, CSV, PDF, Word, and text files.
              </p>
            </AlertDescription>
          </Alert>

          <ForecastEnhancedAlert isEnhanced={isForecastEnhanced && !processedData} />
          
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
        </div>
      </CardContent>
    </Card>
  );
};
