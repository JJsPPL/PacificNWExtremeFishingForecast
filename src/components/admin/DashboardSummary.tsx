
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Database } from "lucide-react";

export const DashboardSummary = () => {
  // Calculate stats from localStorage
  const getStats = () => {
    const data = localStorage.getItem('fishingForecastData');
    const previousUploads = localStorage.getItem('uploadHistory');
    
    const parsedData = data ? JSON.parse(data) : null;
    const parsedHistory = previousUploads ? JSON.parse(previousUploads) : [];
    
    return {
      totalRecords: parsedData ? parsedData.length : 0,
      totalUploads: parsedHistory.length,
      lastUpload: parsedHistory.length > 0 ? new Date(parsedHistory[0].timestamp).toLocaleDateString() : 'Never'
    };
  };

  const stats = getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRecords}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Data points enhancing your forecast
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUploads}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Files processed successfully
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lastUpload}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Most recent data update
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
