
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FishingDetailsView } from "./FishingDetailsView";
import { FishScoreIndicator } from "./FishScoreIndicator";
import { ScoreGauge } from "./ScoreGauge";
import { FactorBreakdown } from "./FactorBreakdown";
import { getForecastForDate, getLiveForecastForDate } from "@/lib/fishingForecast";
import { MapPin, CloudRain, Thermometer, Wind, Moon, ArrowDown, ArrowUp, Minus, RefreshCw, Clock, Activity, ShoppingBag, ExternalLink } from "lucide-react";
import type { FishingForecast } from "@/lib/types/fishingTypes";
import { getGearForSpecies } from "@/lib/utils/recommendations/gearUtils";
import RegulationsDisclaimer from "./RegulationsDisclaimer";

interface CurrentConditionsProps {
  filterCondition?: boolean;
}

export const CurrentConditions = ({ filterCondition = true }: CurrentConditionsProps) => {
  const today = new Date();
  const [forecast, setForecast] = useState<FishingForecast>(getForecastForDate(today));
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  // Auto-fetch live data on mount and every 15 minutes
  useEffect(() => {
    let mounted = true;

    const loadLiveData = async () => {
      setIsLoading(true);
      try {
        const liveForecast = await getLiveForecastForDate(new Date());
        if (mounted) {
          setForecast(liveForecast);
          setLastRefresh(format(new Date(), "h:mm a"));
        }
      } catch {
        // Fallback already handled in getLiveForecastForDate
        if (mounted) {
          setForecast(getForecastForDate(new Date()));
          setLastRefresh(format(new Date(), "h:mm a") + " (offline)");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadLiveData();

    // Refresh every 15 minutes
    const interval = setInterval(loadLiveData, 15 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const topRecommendation = forecast.recommendations[0];

  // Activity level color
  const getActivityColor = (level: string | undefined) => {
    switch (level) {
      case 'Excellent': return 'bg-green-500 text-white';
      case 'Very Good': return 'bg-emerald-400 text-white';
      case 'Good': return 'bg-yellow-400 text-black';
      case 'Fair': return 'bg-orange-400 text-white';
      case 'Poor': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  // Pressure trend icon
  const PressureTrendIcon = ({ trend }: { trend: string }) => {
    if (trend.includes('Falling')) return <ArrowDown className="h-4 w-4 text-green-500" />;
    if (trend.includes('Rising')) return <ArrowUp className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-yellow-500" />;
  };

  if (!filterCondition) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Today's Fishing Forecast</CardTitle>
          <CardDescription>{format(today, "EEEE, MMMM d, yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            No matches found for your filters. Try adjusting your search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Today's Fishing Forecast</CardTitle>
              <CardDescription>{format(today, "EEEE, MMMM d, yyyy")}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {forecast.dataSource === 'live' && (
                <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/40 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400">
                  LIVE
                </Badge>
              )}
              {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Score Gauge */}
          <div className="mb-4">
            <ScoreGauge
              score={forecast.rating}
              activityLevel={forecast.activityLevel || 'Good'}
            />
          </div>

          {/* Conditions Grid */}
          <div className="py-2 mb-3 border-y">
            <div className="grid grid-cols-2 gap-3">
              {/* Moon Phase */}
              <div>
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Moon className="h-3.5 w-3.5" /> Moon Phase
                </div>
                <div className="font-medium">{forecast.moonPhase}</div>
                {forecast.moonIllumination !== undefined && (
                  <div className="text-xs text-muted-foreground">{forecast.moonIllumination}% illuminated</div>
                )}
                {forecast.isFirstQuarterWindow && (
                  <Badge variant="outline" className="text-xs mt-1 bg-amber-50 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-400">
                    Prime 1st Quarter Window!
                  </Badge>
                )}
              </div>

              {/* Barometric Pressure */}
              <div>
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" /> Pressure
                </div>
                <div className="font-medium flex items-center gap-1">
                  {forecast.barometricPressure} inHg
                  <PressureTrendIcon trend={forecast.pressureTrend} />
                </div>
                <div className="text-xs text-muted-foreground">{forecast.pressureTrend}</div>
                {forecast.pressureTrend.includes('Falling') && (
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">Dropping pressure = Prime fishing!</div>
                )}
              </div>

              {/* Weather (if live data) */}
              {forecast.temperature !== undefined && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Thermometer className="h-3.5 w-3.5" /> Temperature
                  </div>
                  <div className="font-medium">{Math.round(forecast.temperature)}°F</div>
                  {forecast.windSpeed !== undefined && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Wind className="h-3 w-3" /> {Math.round(forecast.windSpeed)} mph
                    </div>
                  )}
                </div>
              )}

              {/* Solunar */}
              {forecast.solunarRating && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Solunar
                  </div>
                  <div className="font-medium">{forecast.solunarRating}</div>
                  {forecast.moonOverhead && (
                    <div className="text-xs text-muted-foreground">
                      Moon overhead: {forecast.moonOverhead}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Major/Minor Feeding Periods */}
            {forecast.majorPeriods && forecast.majorPeriods.length > 0 && (
              <div className="mt-3 pt-2 border-t">
                <div className="text-xs font-medium text-muted-foreground mb-1">Peak Feeding Periods</div>
                <div className="flex flex-wrap gap-2">
                  {forecast.majorPeriods.map((p, i) => (
                    <Badge key={`major-${i}`} variant="outline" className="text-xs bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 dark:text-green-400">
                      Major: {p.start} - {p.end}
                    </Badge>
                  ))}
                  {forecast.minorPeriods?.map((p, i) => (
                    <Badge key={`minor-${i}`} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 dark:text-blue-400">
                      Minor: {p.start} - {p.end}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Factor Breakdown Bars */}
          {forecast.scoringFactors && forecast.scoringFactors.length > 0 && (
            <div className="mb-3">
              <FactorBreakdown factors={forecast.scoringFactors} />
            </div>
          )}

          {/* Regulations Disclaimer */}
          <RegulationsDisclaimer />

          {/* Top Recommendation */}
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
                {topRecommendation.runForecast && (
                  <div className="text-xs mt-2 text-teal-700 dark:text-teal-400">
                    <span className="font-medium">Run Status: </span>{topRecommendation.runForecast}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Gear Pick for Top Recommendation */}
          {topRecommendation && (() => {
            const gear = getGearForSpecies([topRecommendation.species], today, forecast.temperature);
            const topGear = gear.speciesGear.slice(0, 3);
            if (topGear.length === 0) return null;
            return (
              <div className="mt-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <ShoppingBag className="h-3.5 w-3.5 text-amber-500" /> Gear for {topRecommendation.species}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {topGear.map((item, i) => (
                    <a
                      key={i}
                      href={item.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded border border-border/60 hover:border-amber-500/50 transition-colors text-xs"
                    >
                      <div className="flex-1">
                        <div className="font-medium leading-tight">{item.name}</div>
                        <div className="text-amber-500 mt-0.5">{item.priceRange}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                    </a>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 italic">
                  As an Amazon Associate, we earn from qualifying purchases.
                </p>
              </div>
            );
          })()}

          {/* Last Updated */}
          {lastRefresh && (
            <div className="mt-3 text-xs text-muted-foreground text-right">
              Last updated: {lastRefresh}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
