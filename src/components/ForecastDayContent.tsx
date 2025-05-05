
import { format } from "date-fns";
import { FishScoreIndicator } from "./FishScoreIndicator";
import { getForecastForDate } from "@/lib/fishingForecast";
import { useIsMobile } from "@/hooks/use-mobile";

interface ForecastDayContentProps {
  date: Date;
  selectedDate?: Date;
}

export const ForecastDayContent = ({ date }: ForecastDayContentProps) => {
  const isMobile = useIsMobile();
  const forecast = getForecastForDate(date);
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-center">{date.getDate()}</div>
      {isMobile ? (
        <div className="mt-1 text-xs font-semibold">{forecast.rating}</div>
      ) : (
        <div className="mt-1 scale-75 origin-top">
          <FishScoreIndicator score={forecast.rating} size="sm" />
        </div>
      )}
    </div>
  );
};
