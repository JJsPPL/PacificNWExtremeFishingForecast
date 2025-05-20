
import { format, addDays, subDays } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Wind, ArrowLeft, ArrowRight, Anchor } from "lucide-react";
import { getForecastForDate } from "@/lib/fishingForecast";
import { RatingStars } from "./ratings/RatingStars";
import { ForecastFactorCard } from "./forecast/ForecastFactorCard";
import { RecommendationsTable } from "./forecast/RecommendationsTable";
import { getRatingDescription } from "@/utils/ratingUtils";
import { FeaturedLocationTips } from "./forecast/FeaturedLocationTips";
import { Button } from "./ui/button";

interface FishingDetailsViewProps {
  selectedDate: Date | undefined;
  filters?: {
    searchTerm: string;
    species: string | null;
    location: string | null;
  };
  onDateChange?: (date: Date) => void;
}

export const FishingDetailsView = ({ 
  selectedDate, 
  filters,
  onDateChange 
}: FishingDetailsViewProps) => {
  if (!selectedDate) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Select a date to view fishing details
          </p>
        </CardContent>
      </Card>
    );
  }

  const forecast = getForecastForDate(selectedDate);
  
  // Navigation functions
  const goToPrevDay = () => {
    if (onDateChange && selectedDate) {
      onDateChange(subDays(selectedDate, 1));
    }
  };
  
  const goToNextDay = () => {
    if (onDateChange && selectedDate) {
      onDateChange(addDays(selectedDate, 1));
    }
  };
  
  // Filter recommendations based on filters
  const filteredRecommendations = filters 
    ? forecast.recommendations.filter(rec => {
        // Only search location when using the search term
        const searchTermMatch = !filters.searchTerm || 
          rec.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        const speciesMatch = !filters.species || rec.species === filters.species;
        const locationMatch = !filters.location || rec.location === filters.location;
        
        return searchTermMatch && speciesMatch && locationMatch;
      })
    : forecast.recommendations;

  if (filteredRecommendations.length === 0 && filters) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{format(selectedDate, "MMMM d, yyyy")}</CardTitle>
          <CardDescription>No matches found for your filters</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToPrevDay}
            disabled={!onDateChange}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous Day</span>
          </Button>
          <CardTitle className="flex items-center justify-center flex-1">
            <span>{format(selectedDate, "MMMM d, yyyy")}</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToNextDay}
            disabled={!onDateChange}
            className="rounded-full"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next Day</span>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <RatingStars rating={forecast.rating} />
          <span className="ml-2 text-lg">{forecast.rating}/100</span>
        </div>
        <CardDescription className="text-center mt-2">
          {getRatingDescription(forecast.rating)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ForecastFactorCard 
            icon={<Moon className="h-5 w-5 text-indigo-500" />}
            title="Moon Phase"
            value={forecast.moonPhase}
            detail={`${forecast.moonPosition}`}
          />
          <ForecastFactorCard 
            icon={<Wind className="h-5 w-5 text-blue-500" />}
            title="Barometric Pressure"
            value={`${forecast.barometricPressure} inHg`}
            detail={`${forecast.pressureTrend}`}
          />
        </div>

        {/* New tide information section */}
        {forecast.tideData && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Tide Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ForecastFactorCard 
                icon={<Anchor className="h-5 w-5 text-teal-500" />}
                title="Tide Status"
                value={forecast.tideData.currentDirection || "Not Available"}
                detail={`High: ${forecast.tideData.highTide || "N/A"}, Low: ${forecast.tideData.lowTide || "N/A"}`}
              />
              
              {forecast.salmonRunStatus && (
                <div className="sm:col-span-2">
                  <div className="p-3 border rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Salmon Run Status</h4>
                    <p className="text-base font-medium">{forecast.salmonRunStatus}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <h3 className="text-lg font-medium mb-3">
          {filteredRecommendations.length < forecast.recommendations.length 
            ? "Filtered Species & Locations" 
            : "Recommended Species & Locations"}
        </h3>
        
        <RecommendationsTable recommendations={filteredRecommendations} />

        {/* Tips for featured Oregon locations */}
        <FeaturedLocationTips 
          locations={filteredRecommendations.map(rec => rec.location)}
        />
      </CardContent>
    </Card>
  );
};
