
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fish, MapPin, Moon, Star, Wind } from "lucide-react";
import { getForecastForDate } from "@/lib/fishingForecast";

interface FishingDetailsViewProps {
  selectedDate: Date | undefined;
}

export const FishingDetailsView = ({ selectedDate }: FishingDetailsViewProps) => {
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

        <h3 className="text-lg font-medium mb-3">Recommended Species & Locations</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Species</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tactics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecast.recommendations.map((rec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rec.species}</TableCell>
                <TableCell>{rec.location}</TableCell>
                <TableCell>{rec.tactics}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
