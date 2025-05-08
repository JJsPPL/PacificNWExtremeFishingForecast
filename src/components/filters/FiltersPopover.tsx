
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersPopoverProps {
  species: string[];
  locations: string[];
  selectedSpecies: string | null;
  selectedLocation: string | null;
  onSpeciesChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FiltersPopover = ({
  species,
  locations,
  selectedSpecies,
  selectedLocation,
  onSpeciesChange,
  onLocationChange,
  onClearFilters,
}: FiltersPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Fish Species</h4>
            <Select
              value={selectedSpecies || "all"}
              onValueChange={onSpeciesChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                {species.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Location</h4>
            <Select
              value={selectedLocation || "all"}
              onValueChange={onLocationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
