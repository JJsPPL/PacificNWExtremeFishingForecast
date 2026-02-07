import { format } from "date-fns";

/** Returns the current year (e.g. 2026) */
export const getCurrentYear = (): number => new Date().getFullYear();

/** Returns the previous year (e.g. 2025) */
export const getPreviousYear = (): number => new Date().getFullYear() - 1;

/** Returns a season label spanning two years, e.g. "2025-26" */
export const getSeasonLabel = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  // If Jan-June, the season started the previous year
  if (month <= 5) {
    return `${year - 1}-${String(year).slice(2)}`;
  }
  // Jul-Dec, the season ends next year
  return `${year}-${String(year + 1).slice(2)}`;
};

/** Returns the current season: "Winter" | "Spring" | "Summer" | "Fall" */
export const getCurrentSeason = (): string => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  return "Winter";
};

/** Returns full month and year, e.g. "February 2026" */
export const getCurrentMonthYear = (): string => format(new Date(), "MMMM yyyy");

/** Returns abbreviated month and year, e.g. "Feb 2026" */
export const getCurrentMonthYearShort = (): string => format(new Date(), "MMM yyyy");

/** Returns true if the current year is odd (relevant for pink salmon runs) */
export const isOddYear = (): boolean => new Date().getFullYear() % 2 === 1;
