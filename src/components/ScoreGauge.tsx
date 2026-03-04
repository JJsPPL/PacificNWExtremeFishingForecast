import React, { useId } from "react";

interface ScoreGaugeProps {
  score: number;
  activityLevel: string;
  size?: "sm" | "lg";
}

const getColorConfig = (activityLevel: string) => {
  switch (activityLevel) {
    case "Excellent":
      return {
        text: "text-green-400",
        stroke: "#4ade80",
        glow: "rgba(74, 222, 128, 0.3)",
      };
    case "Very Good":
      return {
        text: "text-emerald-400",
        stroke: "#34d399",
        glow: "rgba(52, 211, 153, 0.3)",
      };
    case "Good":
      return {
        text: "text-yellow-400",
        stroke: "#facc15",
        glow: "rgba(250, 204, 21, 0.3)",
      };
    case "Fair":
      return {
        text: "text-orange-400",
        stroke: "#fb923c",
        glow: "rgba(251, 146, 60, 0.3)",
      };
    case "Poor":
      return {
        text: "text-red-400",
        stroke: "#f87171",
        glow: "rgba(248, 113, 113, 0.3)",
      };
    default:
      return {
        text: "text-gray-400",
        stroke: "#9ca3af",
        glow: "rgba(156, 163, 175, 0.3)",
      };
  }
};

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  activityLevel,
  size = "lg",
}) => {
  const uniqueId = useId();
  const clampedScore = Math.max(0, Math.min(100, score));

  const isLg = size === "lg";
  const wrapperSize = isLg ? "w-[200px] h-[130px]" : "w-[120px] h-[78px]";

  // Gauge geometry -- center of the arc circle and radius
  const cx = 100;
  const cy = 100;
  const r = 80;
  const strokeWidth = 14;

  // Semi-circle arc path from left (180deg) to right (0deg), sweeping clockwise
  // M moves to the leftmost point, A draws a half-circle arc to the rightmost point
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // The total length of a semicircular arc = pi * r
  const arcLength = Math.PI * r;

  // For the colored foreground arc we draw the full semicircle so the gradient
  // is fully visible. stroke-dasharray = arcLength (one full half-circle, no gap
  // beyond). No dashoffset needed because we want the entire coloured arc visible.
  // The background arc sits behind it in a muted dark color.

  // Needle: score 0 maps to 180deg (left), score 100 maps to 0deg (right)
  // Angle in radians where the needle points
  const scoreAngle = Math.PI - (clampedScore / 100) * Math.PI;
  const needleLen = r - 8;
  const needleX = cx + needleLen * Math.cos(scoreAngle);
  const needleY = cy - needleLen * Math.sin(scoreAngle);

  const colors = getColorConfig(activityLevel);

  // Unique IDs so multiple instances on the same page don't conflict
  const gradientId = `gaugeGradient-${uniqueId}`;
  const glowId = `gaugeGlow-${uniqueId}`;
  const needleGlowId = `needleGlow-${uniqueId}`;

  return (
    <div className={`relative ${wrapperSize} mx-auto select-none`}>
      <svg
        viewBox="0 0 200 115"
        className="w-full h-full overflow-visible"
        aria-label={`Score gauge: ${score} - ${activityLevel}`}
        role="img"
      >
        <defs>
          {/* Horizontal linear gradient: red (left) -> orange -> yellow -> teal -> green (right) */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f97316" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="80%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Soft glow filter for the colored arc */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter for the needle tip */}
          <filter id={needleGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tick marks along the arc for a speedometer look */}
        {Array.from({ length: 11 }).map((_, i) => {
          const tickAngle = Math.PI - (i / 10) * Math.PI;
          const outerR = r + strokeWidth / 2 + 2;
          const innerR = r + strokeWidth / 2 - 2;
          const isMajor = i % 5 === 0;
          const tickOuter = isMajor ? outerR + 3 : outerR;
          return (
            <line
              key={i}
              x1={cx + innerR * Math.cos(tickAngle)}
              y1={cy - innerR * Math.sin(tickAngle)}
              x2={cx + tickOuter * Math.cos(tickAngle)}
              y2={cy - tickOuter * Math.sin(tickAngle)}
              stroke="#3b4252"
              strokeWidth={isMajor ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Background arc (dark muted track) */}
        <path
          d={arcPath}
          fill="none"
          stroke="#262c35"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Colored gradient arc with glow */}
        <path
          d={arcPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          strokeDasharray={arcLength}
          strokeDashoffset={0}
        />

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={colors.stroke}
          strokeWidth={isLg ? 2.5 : 2}
          strokeLinecap="round"
          filter={`url(#${needleGlowId})`}
          style={{
            transition: "x2 0.8s ease-out, y2 0.8s ease-out",
          }}
        />

        {/* Needle pivot dot */}
        <circle
          cx={cx}
          cy={cy}
          r={isLg ? 5 : 3.5}
          fill={colors.stroke}
          style={{
            filter: `drop-shadow(0 0 4px ${colors.glow})`,
          }}
        />

        {/* Small bright dot at needle tip for emphasis */}
        <circle
          cx={needleX}
          cy={needleY}
          r={isLg ? 3 : 2}
          fill={colors.stroke}
          opacity={0.7}
          style={{
            transition:
              "cx 0.8s ease-out, cy 0.8s ease-out",
          }}
        />
      </svg>

      {/* Score number + activity label overlaid at the center-bottom of the gauge */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end"
        style={{ paddingBottom: isLg ? "6px" : "4px" }}
      >
        <span
          className={`${isLg ? "text-3xl" : "text-lg"} font-bold leading-none ${colors.text}`}
          style={{
            textShadow: `0 0 10px ${colors.glow}`,
          }}
        >
          {score}
        </span>
        <span
          className={`${isLg ? "text-xs" : "text-[9px]"} font-medium tracking-wide uppercase mt-0.5`}
          style={{ color: "#8892a4" }}
        >
          {activityLevel}
        </span>
      </div>
    </div>
  );
};

export default ScoreGauge;
