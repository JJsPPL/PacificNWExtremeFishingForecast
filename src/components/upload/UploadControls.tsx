
import React from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { isFileTypeSupported } from "@/utils/fileProcessors";

interface UploadControlsProps {
  selectedFile: File | null;
  isUploading: boolean;
  onFileSelect: () => void;
  onUpload: () => Promise<void>;
  onRemoveFile: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  toast: any;
}

export const UploadControls: React.FC<UploadControlsProps> = ({
  selectedFile,
  isUploading,
  onFileSelect,
  onUpload,
  onRemoveFile,
  fileInputRef,
  toast
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isFileTypeSupported(file)) {
        // Let parent component handle the file
        e.target.value = "";  // Reset the input for future uploads
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel, Word, PDF, CSV, or text file",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv,.doc,.docx,.pdf,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button 
        className="w-full" 
        onClick={onUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? (
          <>
            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : "Enhance My Forecast"}
      </Button>
    </>
  );
};
