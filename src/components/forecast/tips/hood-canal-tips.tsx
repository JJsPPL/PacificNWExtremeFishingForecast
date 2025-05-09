
import { Map } from "lucide-react";

export const HoodCanalTips = () => {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium flex items-center gap-1">
        <Map className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        Hood Canal Fishing Tips
      </h5>
      <p className="text-xs text-muted-foreground">
        Hood Canal offers excellent opportunities for salmon, especially during the fall chum run. 
        Key locations include Skokomish River mouth, Lilliwaup, and Seabeck. Use bright colored lures 
        like Vibrax spinners in sizes 4-5 with chartreuse, pink or orange blades. For trolling, 
        flashers with green squid hoochies or Coho Killers in white/green work well.
      </p>
      <p className="text-xs text-muted-foreground">
        For lingcod and rockfish (during open season), target underwater humps and structure in 50-100 feet near 
        Toandos Peninsula and Dabob Bay. Point Whitney and Misery Point offer good shore opportunities for salmon during 
        peak runs. Hood Canal is also famous for shellfish - check for seasonal openings for oysters, 
        clams, and shrimp.
      </p>
    </div>
  );
};
