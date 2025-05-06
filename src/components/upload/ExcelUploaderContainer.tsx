
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadInstructions } from "@/components/upload/UploadInstructions";
import { UploadForm } from "@/components/upload/UploadForm";
import { ForecastEnhancedAlert } from "@/components/upload/UploadStatusIndicators";

export const ExcelUploader = () => {
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const isForecastEnhanced = localStorage.getItem('fishingForecastData') !== null;

  return (
    <Card className="w-full relative">
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
          <UploadInstructions />
          
          <ForecastEnhancedAlert isEnhanced={isForecastEnhanced && !processedData} />
          
          <UploadForm 
            fileInputRef={fileInputRef} 
            setProcessedData={setProcessedData} 
            toast={toast} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
