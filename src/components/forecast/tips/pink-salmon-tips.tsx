import { isOddYear, getCurrentYear } from "@/lib/utils/dateUtils";

export const PinkSalmonTips = () => {
  const year = getCurrentYear();
  const oddYear = isOddYear();

  return (
    <div>
      <h5 className="text-sm font-medium">Pink Salmon (Humpy) Insider Tips:</h5>
      <ul className="text-xs mt-1 ml-4 list-disc space-y-1">
        <li>{year} is {oddYear ? "an odd year - expect massive Pink salmon runs in Puget Sound" : "an even year - Pink salmon runs will be minimal (they return in odd years)"}</li>
        <li>Peak runs typically occur from mid-July through August</li>
        <li>Use small lures - Pink salmon have smaller mouths than other salmon</li>
        <li>Pink and silver colors are most effective</li>
        <li>Focus on areas with structure like piers, jetties, and underwater features</li>
        <li>Fish during tide changes for best results</li>
        <li>Size 2-3 spinners work better than larger lures</li>
        <li>Pink salmon are aggressive feeders but spook easily</li>
        <li>Schools can be massive in odd years - when you find one, there are thousands</li>
        <li>Target depths of 10-30 feet in saltwater areas</li>
        <li>Early morning and evening provide the most consistent action</li>
      </ul>
    </div>
  );
};
