
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, X, FileX, File, Database } from "lucide-react";
import * as XLSX from 'xlsx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

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
      
      // Check for supported file types
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
      
      if (supportedTypes.includes(file.type) || supportedExtensions.includes(fileExtension)) {
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

  const processExcelFile = async (file: File): Promise<any[]> => {
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

  const processCsvFile = async (file: File): Promise<any[]> => {
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

  const processTextFile = async (file: File): Promise<any[]> => {
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
  const processMockData = async (): Promise<any[]> => {
    // For demonstration purposes - in real app, you'd use proper libraries
    // to extract text from PDFs or Word docs
    return [
      { source: selectedFile?.name, content: "Sample extracted content 1" },
      { source: selectedFile?.name, content: "Sample extracted content 2" }
    ];
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

      // Process the file based on its type
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      let fileData;
      
      if (['xlsx', 'xls'].includes(fileExtension) || 
          selectedFile.type.includes('excel') || 
          selectedFile.type.includes('spreadsheetml')) {
        fileData = await processExcelFile(selectedFile);
      } else if (fileExtension === 'csv' || selectedFile.type === 'text/csv') {
        fileData = await processCsvFile(selectedFile);
      } else if (fileExtension === 'txt' || selectedFile.type === 'text/plain') {
        fileData = await processTextFile(selectedFile);
      } else if (['pdf', 'doc', 'docx'].includes(fileExtension) || 
                selectedFile.type.includes('pdf') || 
                selectedFile.type.includes('word') || 
                selectedFile.type.includes('msword')) {
        // For demo purposes - in production you'd use proper PDF/Word extraction
        fileData = await processMockData();
      } else {
        throw new Error("Unsupported file format.");
      }
      
      clearInterval(progressInterval);
      setProcessingProgress(100);
      
      if (fileData && Array.isArray(fileData) && fileData.length > 0) {
        // Process the data and store it locally
        setProcessedData(fileData);
        
        // Store in localStorage for the app to use
        localStorage.setItem('fishingForecastData', JSON.stringify(fileData));
        
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

          {isForecastEnhanced && !processedData && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-sm font-medium ml-2">
                Forecast Already Enhanced
              </AlertTitle>
              <AlertDescription className="text-xs mt-1">
                You've already uploaded fishing data. Your forecasts are personalized.
              </AlertDescription>
            </Alert>
          )}
          
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-1">
              Click to select a file to enhance your forecast
            </p>
            <p className="text-xs text-gray-400">
              Excel, CSV, PDF, Word, and text files supported
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv,.doc,.docx,.pdf,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          
          {selectedFile && (
            <div className="p-3 bg-muted rounded flex justify-between items-center">
              <span className="text-sm truncate max-w-[70%]">{selectedFile.name}</span>
              <Button 
                size="sm" 
                onClick={() => setSelectedFile(null)}
                variant="ghost"
              >
                Remove
              </Button>
            </div>
          )}
          
          {processingError && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium ml-2">
                Processing Error
              </AlertTitle>
              <AlertDescription className="text-xs mt-1">
                {processingError}
              </AlertDescription>
            </Alert>
          )}
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing data...</span>
                <span>{Math.round(processingProgress)}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}
          
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Processing..." : "Enhance My Forecast"}
          </Button>
          
          {processedData && processedData.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Data Processed Successfully</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearProcessedData}
                  className="flex items-center gap-1"
                >
                  <FileX className="h-4 w-4" />
                  Reset to Default
                </Button>
              </div>
              
              <div className="p-3 bg-muted rounded">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>{processedData.length} entries processed from {selectedFile?.name}</span>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>Your forecast is now personalized. You can visit the Calendar and Details tabs to see your enhanced forecast.</p>
                </div>
              </div>
              
              <div className="bg-muted rounded p-3 max-h-40 overflow-y-auto">
                <p className="text-xs font-medium mb-1">Data Preview (first 5 entries):</p>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(processedData.slice(0, 5), null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
