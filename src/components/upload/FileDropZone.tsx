
import React from "react";
import { Upload } from "lucide-react";

interface FileDropZoneProps {
  onFileSelect: () => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileSelect }) => {
  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onFileSelect}
    >
      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-500 mb-1">
        Click to select a file to enhance your forecast
      </p>
      <p className="text-xs text-gray-400">
        Excel, CSV, PDF, Word, and text files supported
      </p>
    </div>
  );
};
