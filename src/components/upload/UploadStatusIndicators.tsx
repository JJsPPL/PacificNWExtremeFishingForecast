
import React from "react";
import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Check, X, FileX, LoaderCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileItemProps {
  fileName: string;
  onRemove: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ fileName, onRemove }) => {
  return (
    <div className="p-3 bg-muted rounded flex justify-between items-center">
      <span className="text-sm truncate max-w-[70%]">{fileName}</span>
      <Button 
        size="sm" 
        onClick={onRemove}
        variant="ghost"
      >
        Remove
      </Button>
    </div>
  );
};

interface ProcessingProgressProps {
  progress: number;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center">
          <LoaderCircle className="h-4 w-4 mr-2 animate-spin text-primary" />
          Processing data...
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

interface ProcessingErrorProps {
  message: string;
}

export const ProcessingError: React.FC<ProcessingErrorProps> = ({ message }) => {
  return (
    <Alert variant="destructive">
      <X className="h-4 w-4" />
      <AlertTitle className="text-sm font-medium ml-2">
        Processing Error
      </AlertTitle>
      <AlertDescription className="text-xs mt-1">
        {message}
      </AlertDescription>
    </Alert>
  );
};

interface ForecastEnhancedAlertProps {
  isEnhanced: boolean;
}

export const ForecastEnhancedAlert: React.FC<ForecastEnhancedAlertProps> = ({ isEnhanced }) => {
  if (!isEnhanced) return null;
  
  return (
    <Alert className="bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800">
      <Check className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-sm font-medium ml-2">
        Forecast Already Enhanced
      </AlertTitle>
      <AlertDescription className="text-xs mt-1">
        You've already uploaded fishing data. Your forecasts are personalized.
      </AlertDescription>
    </Alert>
  );
};

interface ProcessedDataSummaryProps {
  dataLength: number;
  fileName: string;
  originalCount?: number;
  onReset: () => void;
}

export const ProcessedDataSummary: React.FC<ProcessedDataSummaryProps> = ({ 
  dataLength, 
  fileName,
  originalCount,
  onReset 
}) => {
  const wasTruncated = originalCount && originalCount > dataLength;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Data Processed Successfully</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <FileX className="h-4 w-4" />
          Reset to Default
        </Button>
      </div>
      
      <div className="p-3 bg-muted rounded">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Check className="h-4 w-4" />
          <span>{dataLength} entries processed from {fileName}</span>
        </div>
        
        {wasTruncated && (
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Note: Only {dataLength} of {originalCount} entries were kept due to storage limitations</span>
          </div>
        )}
        
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Your forecast is now personalized. You can visit the Calendar and Details tabs to see your enhanced forecast.</p>
        </div>
      </div>
    </div>
  );
};

interface DataPreviewProps {
  data: any[];
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  return (
    <div className="bg-muted rounded p-3 max-h-40 overflow-y-auto">
      <p className="text-xs font-medium mb-1">Data Preview (first 5 entries):</p>
      <pre className="text-xs overflow-x-auto">
        {JSON.stringify(data.slice(0, 5), null, 2)}
      </pre>
    </div>
  );
};
