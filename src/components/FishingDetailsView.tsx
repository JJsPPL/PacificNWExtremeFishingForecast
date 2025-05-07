
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fish, MapPin, Moon, Star, Wind } from "lucide-react";
import { getForecastForDate } from "@/lib/fishingForecast";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Species</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tactics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecommendations.map((rec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rec.species}</TableCell>
                <TableCell>{rec.location}</TableCell>
                <TableCell>
                  {rec.tactics}
                  {rec.bait && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">Recommended bait: </span>{rec.bait}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Tips for featured Oregon locations */}
        {(filteredRecommendations.some(rec => rec.location.includes("Nestucca")) || 
          filteredRecommendations.some(rec => rec.location.includes("Columbia"))) && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h4 className="font-medium flex items-center">
              <Fish className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              Featured Location Tips
            </h4>
            <div className="mt-2 space-y-3">
              {filteredRecommendations.some(rec => rec.location.includes("Nestucca")) && (
                <div>
                  <h5 className="text-sm font-medium">Nestucca River Insider Tips:</h5>
                  <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
                    <li>The Three Rivers section holds fish year-round, with deeper holes just below the confluence</li>
                    <li>The First Bridge area fishes best during higher water when fish are moving upriver</li>
                    <li>Tidewater fishing at Cloverdale is productive during incoming tides, especially for fall Chinook</li>
                    <li>Smaller presentations often work better during low water periods</li>
                  </ul>
                </div>
              )}
              {filteredRecommendations.some(rec => rec.location.includes("Columbia")) && (
                <div>
                  <h5 className="text-sm font-medium">Columbia River Insider Tips:</h5>
                  <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
                    <li>Target tributary mouths during spring and fall salmon runs</li>
                    <li>Focus on underwater structure for smallmouth bass during summer months</li>
                    <li>Deep channel edges are prime for sturgeon, especially during incoming tides</li>
                    <li>Early morning and late evening bites are often strongest during summer</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating / 20);
  const halfStar = rating % 20 >= 10;
  
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && halfStar) {
          return <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400/50" />;
        } else {
          return <Star key={i} className="h-5 w-5 text-gray-300" />;
        }
      })}
    </div>
  );
};

const ForecastFactorCard = ({ 
  icon, 
  title, 
  value, 
  detail 
}: { 
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 border rounded-md">
      <div className="mt-0.5">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <p className="text-base font-medium">{value}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
};

const getRatingDescription = (rating: number): string => {
  if (rating >= 80) return "Excellent fishing conditions";
  if (rating >= 60) return "Good fishing conditions";
  if (rating >= 40) return "Moderate fishing conditions";
  return "Poor fishing conditions";
};
