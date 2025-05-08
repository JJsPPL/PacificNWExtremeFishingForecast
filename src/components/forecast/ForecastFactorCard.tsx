
import React from "react";

interface ForecastFactorCardProps { 
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}

export const ForecastFactorCard = ({ icon, title, value, detail }: ForecastFactorCardProps) => {
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
