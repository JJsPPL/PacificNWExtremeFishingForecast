
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadInstructions } from "@/components/upload/UploadInstructions";
import { UploadForm } from "@/components/upload/UploadForm";
import { ForecastEnhancedAlert } from "@/components/upload/UploadStatusIndicators";

export const ExcelUploader = () => {
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const [isEnhanced, setIsEnhanced] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Check if forecast is enhanced on mount and when processed data changes
  useEffect(() => {
    const storedData = localStorage.getItem('fishingForecastData');
    setIsEnhanced(storedData !== null);
  }, [processedData]);

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
          
          <ForecastEnhancedAlert isEnhanced={isEnhanced && !processedData} />
          
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
