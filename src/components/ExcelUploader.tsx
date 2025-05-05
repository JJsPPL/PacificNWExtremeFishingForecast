
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export const ExcelUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel or CSV file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // In a real app, this would send the file to a backend service
    // Here we're just simulating the process
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: `File "${selectedFile.name}" has been processed`,
      });
      setIsUploading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        </div>
      </CardContent>
    </Card>
  );
};
