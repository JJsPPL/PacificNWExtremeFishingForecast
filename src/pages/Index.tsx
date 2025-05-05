
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FishingForecastCalendar } from "@/components/FishingForecastCalendar";
import { FishingDetailsView } from "@/components/FishingDetailsView";
import { CurrentConditions } from "@/components/CurrentConditions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            PNW Fishing Forecast
          </h1>
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/admin")}
              className="mb-4"
            >
              Admin
            </Button>
          )}
        </div>
        
        <p className="text-center text-muted-foreground mb-6">
          Daily forecasts for fishing conditions in Washington and Oregon
        </p>
        
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            <CurrentConditions />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <FishingForecastCalendar 
              selectedDate={selectedDate} 
              onSelectDate={(date) => {
                setSelectedDate(date);
                const tabsList = document.querySelector('[value="details"]');
                if (tabsList) {
                  (tabsList as HTMLElement).click();
                }
              }} 
            />
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <FishingDetailsView selectedDate={selectedDate} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
