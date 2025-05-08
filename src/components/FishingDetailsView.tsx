
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Wind } from "lucide-react";
import { getForecastForDate } from "@/lib/fishingForecast";
import { RatingStars } from "./ratings/RatingStars";
import { ForecastFactorCard } from "./forecast/ForecastFactorCard";
import { RecommendationsTable } from "./forecast/RecommendationsTable";
import { getRatingDescription } from "@/utils/ratingUtils";
import { FeaturedLocationTips } from "./forecast/FeaturedLocationTips";

interface FishingDetailsViewProps {
  selectedDate: Date | undefined;
  filters?: {
    searchTerm: string;
    species: string | null;
    location: string | null;
  };
}

export const FishingDetailsView = ({ selectedDate, filters }: FishingDetailsViewProps) => {
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
        <CardTitle className="flex items-center justify-between">
          <span>{format(selectedDate, "MMMM d, yyyy")}</span>
          <div className="flex items-center">
            <RatingStars rating={forecast.rating} />
            <span className="ml-2 text-lg">{forecast.rating}/100</span>
          </div>
        </CardTitle>
        <CardDescription>
          {getRatingDescription(forecast.rating)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ForecastFactorCard 
            icon={<Moon className="h-5 w-5 text-indigo-500" />}
            title="Moon Phase"
            value={forecast.moonPhase}
            detail={`${forecast.moonRising ? "Moon Rising" : "Moon Setting"}`}
          />
          <ForecastFactorCard 
            icon={<Wind className="h-5 w-5 text-blue-500" />}
            title="Barometric Pressure"
            value={`${forecast.barometricPressure} inHg`}
            detail={`${forecast.pressureTrend}`}
          />
        </div>

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
