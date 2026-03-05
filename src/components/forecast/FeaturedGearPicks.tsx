import { ExternalLink, Droplets, Fish, Anchor, Package } from 'lucide-react';
import type { FeaturedProduct } from '@/lib/constants/gearRecommendations';
import { getFeaturedForSpecies } from '@/lib/utils/recommendations/gearUtils';

interface FeaturedGearPicksProps {
  species: string[];
  date: Date;
}

const iconMap: Record<string, React.ReactNode> = {
  lure: <Fish className="h-5 w-5 text-amber-400" />,
  terminal: <Anchor className="h-5 w-5 text-amber-400" />,
  line: <Droplets className="h-5 w-5 text-amber-400" />,
  accessory: <Package className="h-5 w-5 text-amber-400" />,
};

function FeaturedCard({ product }: { product: FeaturedProduct }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between p-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-amber-500/60 hover:bg-card/80 transition-all duration-200"
    >
      <div className="flex items-start gap-2.5 mb-2">
        <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-amber-500/10">
          {iconMap[product.categoryIcon] || iconMap.accessory}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium leading-tight group-hover:text-amber-400 transition-colors line-clamp-2">
            {product.name}
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1.5">
        <span className="text-xs font-medium text-amber-500">{product.priceRange}</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-amber-600/90 group-hover:bg-amber-500 text-white transition-colors">
          Shop <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}

export const FeaturedGearPicks = ({ species, date }: FeaturedGearPicksProps) => {
  const picks = getFeaturedForSpecies(species, date);

  if (picks.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        Featured Gear Picks
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {picks.map((product) => (
          <FeaturedCard key={product.asin} product={product} />
        ))}
      </div>
      <p className="text-[9px] text-muted-foreground/60 mt-1.5 italic">
        Affiliate links — we may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
};
