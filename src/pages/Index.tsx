
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FishingForecastCalendar } from "@/components/FishingForecastCalendar";
import { FishingDetailsView } from "@/components/FishingDetailsView";
import { CurrentConditions } from "@/components/CurrentConditions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { SearchFilters } from "@/components/SearchFilters";
import { getForecastForDate } from "@/lib/fishingForecast";
import Advertisement from "@/components/Advertisement";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("today");
  const [filters, setFilters] = useState({
    searchTerm: "",
    species: null as string | null,
    location: null as string | null
  });
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const goToAdmin = () => {
    navigate("/admin");
  };

  // Filter forecast data based on search/filters
  const filterMatches = (date: Date): boolean => {
    if (!filters.searchTerm && !filters.species && !filters.location) {
      return true; // No filters applied
    }

    const forecast = getForecastForDate(date);
    
    // Check if any recommendation matches all filters
    return forecast.recommendations.some(rec => {
      const searchTermMatch = !filters.searchTerm || 
        rec.species.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        rec.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        rec.tactics.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const speciesMatch = !filters.species || rec.species === filters.species;
      const locationMatch = !filters.location || rec.location === filters.location;
      
      return searchTermMatch && speciesMatch && locationMatch;
    });
  };

  // When filters change and we're in calendar view, we might need to update the calendar
  useEffect(() => {
    if (activeTab === "calendar" && selectedDate) {
      // If the current selected date doesn't match filters, we could handle that here
      // For now, we'll just let the calendar highlight valid dates
    }
  }, [filters, activeTab, selectedDate]);

  return (
    <div className="min-h-screen sky-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Repositioned header with logo on far left, admin button on far right */}
        <div className="flex justify-between items-center mb-8 w-full">
          <div className="flex items-start">
            <img 
              src="/lovable-uploads/679012c2-7caf-48b4-9a7c-240099f54020.png" 
              alt="Fishing Rod Logo" 
              className="app-logo"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToAdmin}
            className="flex items-center gap-1"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Button>
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Pacific NW Extreme Fishing Forecast
          </h1>
          
          <p className="text-center text-muted-foreground mt-2">
            Daily forecasts for fishing conditions in Washington and Oregon
          </p>
        </div>
        
        <SearchFilters onFilterChange={setFilters} />
        
        <Tabs 
          defaultValue="today" 
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            <CurrentConditions filterCondition={filterMatches(new Date())} />
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
              filterFunction={filterMatches}
            />
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <FishingDetailsView 
              selectedDate={selectedDate}
              filters={filters}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Advertisements */}
      <Advertisement 
        title="DINO TRADEZ"
        description="DinoTradez putting odds in your favor with probabilities on your side"
        url="https://DINOTRADEZ.COM"
        position="bottom-left"
        color="bg-black"
      />
      
      <Advertisement 
        title="JJ'S CATERS"
        description="Catering events with premium treats and fiesta plates"
        url="https://JJSCATERS.COM"
        position="bottom-right"
        color="bg-gradient-to-r from-pink-500 to-blue-500"
      />
    </div>
  );
};

export default Index;
