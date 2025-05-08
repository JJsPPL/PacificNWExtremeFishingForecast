
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FishingForecastCalendar } from "@/components/FishingForecastCalendar";
import { FishingDetailsView } from "@/components/FishingDetailsView";
import { CurrentConditions } from "@/components/CurrentConditions";
import { getForecastForDate } from "@/lib/fishingForecast";

interface ForecastTabsProps {
  filters: {
    searchTerm: string;
    species: string | null;
    location: string | null;
  };
}

export const ForecastTabs = ({ filters }: ForecastTabsProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("today");

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
  );
};
