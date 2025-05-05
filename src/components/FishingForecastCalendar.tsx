
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { getForecastForDate } from "@/lib/fishingForecast";
import { ForecastDayContent } from "./ForecastDayContent";

interface FishingForecastCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export const FishingForecastCalendar = ({
  selectedDate,
  onSelectDate,
}: FishingForecastCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between border-b">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="p-0 pointer-events-auto"
          modifiers={{
            excellent: (date) => getForecastForDate(date).rating >= 80,
            good: (date) => getForecastForDate(date).rating >= 60 && getForecastForDate(date).rating < 80,
            moderate: (date) => getForecastForDate(date).rating >= 40 && getForecastForDate(date).rating < 60,
            poor: (date) => getForecastForDate(date).rating < 40,
          }}
          modifiersClassNames={{
            excellent: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
            good: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
            moderate: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
            poor: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
          }}
          components={{
            DayContent: ({ date }) => <ForecastDayContent date={date} selectedDate={selectedDate} />,
          }}
        />
        
        <div className="p-4 flex justify-between text-xs border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Excellent (80-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Good (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Fair (40-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Poor (0-39)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
