
export const getRatingDescription = (rating: number): string => {
  if (rating >= 80) return "Excellent fishing conditions";
  if (rating >= 60) return "Good fishing conditions";
  if (rating >= 40) return "Moderate fishing conditions";
  return "Poor fishing conditions";
};
