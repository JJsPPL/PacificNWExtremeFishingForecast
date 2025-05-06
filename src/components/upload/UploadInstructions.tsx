
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { File } from "lucide-react";

export const UploadInstructions = () => {
  return (
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
  );
};
