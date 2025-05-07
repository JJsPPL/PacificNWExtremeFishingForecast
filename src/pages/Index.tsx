
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
      // Only search location when using the search term
      const searchTermMatch = !filters.searchTerm || 
        rec.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-3xl">
        {/* Header with logo on far left, admin button on far right */}
        <div className="header-container">
          <div className="logo-container">
            <img 
              src="/lovable-uploads/11a94d78-68db-4003-8e29-e4c614fe905f.png" 
              alt="Fishing on Moon Logo" 
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
        
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Pacific NW Extreme Fishing Forecast
          </h1>
          
          <p className="text-center text-muted-foreground text-sm md:text-base mt-2">
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
      
      {/* Advertisement section at bottom of page */}
      <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
        <div className={isMobile ? "flex flex-col items-center space-y-4" : "flex justify-between"}>
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
      </div>
      
      {/* Disclaimer section with adjusted fishing logo image size */}
      <footer className="mt-8 pt-6 pb-8 bg-slate-800 text-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="border-t border-slate-600 pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <img 
                src="/lovable-uploads/ddba0b8a-aada-4edb-b82f-a7e0788057da.png" 
                alt="Fishing Rod and Bass" 
                className="w-full md:w-1/3 max-w-[250px] object-contain mb-4 md:mb-0 md:mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
                <p className="text-sm text-slate-300">
                  Created using multiple AI Models synthesized into a unified dataset to forecast prime fishing conditions 
                  and fish run probabilities in the Pacific Northwest. Our goal is to provide insights for anglers to be 
                  productive by not wasting time and money going out fishing when there's no fish or they're simply just 
                  not biting. The forecasts generated are from environmental factors and successful historical harvesting patterns.
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  <strong>Important:</strong> Past performance is not indicative of future results. This application is 
                  provided for educational and entertainment purposes only. Always check local regulations, weather forecasts, 
                  and fishing reports before heading out.
                </p>
                <p className="text-sm font-semibold text-slate-300 mt-3">
                  Tight lines & Fish on!
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
