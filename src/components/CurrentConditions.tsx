
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FishingDetailsView } from "./FishingDetailsView";
import { FishScoreIndicator } from "./FishScoreIndicator";
import { getForecastForDate } from "@/lib/fishingForecast";
import { MapPin } from "lucide-react";

export const CurrentConditions = () => {
  const today = new Date();
  const forecast = getForecastForDate(today);
  
  // Get top recommendation
  const topRecommendation = forecast.recommendations[0];
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Today's Fishing Forecast</CardTitle>
          <CardDescription>{format(today, "EEEE, MMMM d, yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-3xl font-bold">{forecast.rating}</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
            <FishScoreIndicator score={forecast.rating} size="lg" />
          </div>
          
          <div className="py-2 mb-3 border-y">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Moon Phase</div>
                <div className="font-medium">{forecast.moonPhase}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Pressure</div>
                <div className="font-medium">{forecast.barometricPressure} inHg ({forecast.pressureTrend})</div>
              </div>
            </div>
          </div>
          
          {topRecommendation && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Top Recommendation</h3>
              <div className="p-3 bg-muted rounded-md">
                <div className="font-medium">{topRecommendation.species}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {topRecommendation.location}
                </div>
                <div className="text-sm mt-2">{topRecommendation.tactics}</div>
                {topRecommendation.bait && (
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Bait: </span>{topRecommendation.bait}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
