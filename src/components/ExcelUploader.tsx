
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, X, FileX } from "lucide-react";
import * as XLSX from 'xlsx';

export const ExcelUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verify file is Excel
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          file.type === "application/vnd.ms-excel" ||
          file.name.endsWith('.xlsx') || 
          file.name.endsWith('.xls') ||
          file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setProcessedData(null); // Reset processed data when selecting a new file
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel or CSV file",
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

    try {
      // Read the Excel file
      const fileData = await readExcelFile(selectedFile);
      
      // Process the data and store it locally
      setProcessedData(fileData);
      
      // In a real app, this would send the processed data to a backend
      // Here we're just storing it in state and localStorage for demonstration
      localStorage.setItem('fishingForecastData', JSON.stringify(fileData));
      
      toast({
        title: "Upload successful",
        description: `Processed ${fileData.length} rows from "${selectedFile.name}"`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing failed",
        description: "There was an error processing your Excel file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const readExcelFile = (file: File): Promise<any[]> => {
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
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      
      reader.readAsBinaryString(file);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearProcessedData = () => {
    setProcessedData(null);
    localStorage.removeItem('fishingForecastData');
    toast({
      title: "Data cleared",
      description: "The processed fishing forecast data has been cleared",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Fishing Data</CardTitle>
        <CardDescription>
          Upload Excel or CSV files to improve the fishing forecast
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              Click to select or drop Excel files here
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
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
          
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Processing..." : "Upload & Process Data"}
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
                  Clear Data
                </Button>
              </div>
              
              <div className="p-3 bg-muted rounded">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>{processedData.length} rows processed from {selectedFile?.name}</span>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>The data has been stored and will be used to enhance the fishing forecast.</p>
                </div>
              </div>
              
              <div className="bg-muted rounded p-3 max-h-40 overflow-y-auto">
                <p className="text-xs font-medium mb-1">Preview (first 5 entries):</p>
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

