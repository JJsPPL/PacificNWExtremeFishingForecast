import React from "react";

interface FactorBreakdownProps {
  factors: Array<{
    name: string;
    value: string;
    impact: 'positive' | 'neutral' | 'negative';
    points: number;
    description: string;
  }>;
}

const FACTOR_MAX_POINTS: Record<string, number> = {
  'Barometric Pressure': 25,
  'Pressure Trend': 35,
  'Moon Phase': 20,
  'Solunar Activity': 5,
  'Season': 25,
  'Time of Day': 15,
  'Tides': 15,
};

export const FactorBreakdown = ({ factors }: FactorBreakdownProps) => {
  if (!factors || factors.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Scoring Factors</h4>
      {factors.map((factor, i) => {
        const maxPoints = FACTOR_MAX_POINTS[factor.name] || 25;
        const percentage = Math.min(100, (factor.points / maxPoints) * 100);

        const barColor = factor.impact === 'positive'
          ? 'bg-gradient-to-r from-teal-500 to-green-500'
          : factor.impact === 'neutral'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
            : 'bg-gradient-to-r from-red-600 to-red-400';

        return (
          <div key={i} className="space-y-0.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-medium">{factor.name}</span>
              <span className="text-xs text-muted-foreground">+{factor.points}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-[#1e242d] overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-700`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground">{factor.value}</div>
          </div>
        );
      })}
    </div>
  );
};
