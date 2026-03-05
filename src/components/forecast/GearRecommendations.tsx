import { useState } from 'react';
import { ShoppingBag, ExternalLink, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { GearItem } from '@/lib/constants/gearRecommendations';
import type { GearRecommendationResult } from '@/lib/utils/recommendations/gearUtils';

interface GearRecommendationsProps {
  gear: GearRecommendationResult;
}

const categoryLabel: Record<string, string> = {
  rod: 'Rod',
  reel: 'Reel',
  line: 'Line',
  terminal: 'Terminal Tackle',
  lure: 'Lure / Bait',
  accessory: 'Accessory',
  apparel: 'Apparel',
  electronics: 'Electronics',
};

const categoryColor: Record<string, string> = {
  rod: 'bg-amber-600',
  reel: 'bg-blue-600',
  line: 'bg-green-600',
  terminal: 'bg-purple-600',
  lure: 'bg-red-600',
  accessory: 'bg-teal-600',
  apparel: 'bg-orange-600',
  electronics: 'bg-cyan-600',
};

function GearCard({ item }: { item: GearItem }) {
  return (
    <div className="flex flex-col justify-between p-3 rounded-lg border border-border/60 bg-card hover:border-amber-500/50 transition-colors">
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
          <Badge className={`${categoryColor[item.category] || 'bg-gray-600'} text-white text-[10px] px-1.5 py-0 shrink-0`}>
            {categoryLabel[item.category] || item.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs font-medium text-amber-500">{item.priceRange}</span>
        <div className="flex gap-1.5">
          <a
            href={item.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white transition-colors"
          >
            Shop <ExternalLink className="h-3 w-3" />
          </a>
          {item.partnerUrl && (
            <a
              href={item.partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              CWS <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function GearSection({ title, items, defaultOpen = true }: { title: string; items: GearItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  if (items.length === 0) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
      >
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {title}
        <span className="text-xs">({items.length})</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item, i) => (
            <GearCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export const GearRecommendations = ({ gear }: GearRecommendationsProps) => {
  const [expanded, setExpanded] = useState(false);
  const totalItems = gear.speciesGear.length + gear.seasonalGear.length +
    gear.coldWeatherGear.length + gear.universalGear.length;

  if (totalItems === 0) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left mb-3 group"
      >
        <ShoppingBag className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium group-hover:text-amber-400 transition-colors">
          Recommended Gear & Equipment
        </h3>
        <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500 ml-1">
          <Tag className="h-3 w-3 mr-1" />
          {totalItems} items
        </Badge>
        {expanded
          ? <ChevronUp className="h-5 w-5 ml-auto text-muted-foreground" />
          : <ChevronDown className="h-5 w-5 ml-auto text-muted-foreground" />
        }
      </button>

      {expanded && (
        <div>
          <GearSection title="Species-Specific Gear" items={gear.speciesGear} />
          <GearSection title="Seasonal Essentials" items={gear.seasonalGear} defaultOpen={false} />
          {gear.coldWeatherGear.length > 0 && (
            <GearSection title="Cold Weather Gear" items={gear.coldWeatherGear} defaultOpen={false} />
          )}
          <GearSection title="Universal Must-Haves" items={gear.universalGear} defaultOpen={false} />

          <p className="text-[10px] text-muted-foreground mt-3 italic">
            As an Amazon Associate, we earn from qualifying purchases. Prices and availability subject to change.
          </p>
        </div>
      )}
    </div>
  );
};
