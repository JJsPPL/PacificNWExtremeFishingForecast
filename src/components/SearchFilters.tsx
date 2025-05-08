import { useState } from "react";
import { Filter, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { getForecastForDate } from "@/lib/fishingForecast";
import { FISHING_LOCATIONS, LOCATION_DETAILS } from "@/lib/constants/fishingLocations";

// Explicitly add important species that should always be in filters
const IMPORTANT_SPECIES = ["Coho Salmon", "Winter Steelhead", "Chinook Salmon", "Summer Steelhead"];

// Add important locations that should always be in filters
const IMPORTANT_LOCATIONS = [
  "Sequim, WA",
  "Wind River - Mouth",
  "Wind River - Shipherd Falls", 
  "Wind River - Trout Creek",
  "Drano Lake",
  "Kalama River - Lower",
  "Kalama River - Upper",
  "Kalama River - Fallert Creek",
  "Lewis River - Mouth",
  "Lewis River - North Fork",
  "Lewis River - South Fork",
  "Lewis River - East Fork",
  "Lewis River - Hatchery",
  "Cowlitz River - Mouth",
  "Cowlitz River - Blue Creek",
  "Cowlitz River - Mission Bar",
  "Cowlitz River - Barrier Dam",
  "Cowlitz River - Salmon Hatchery",
  "Cowlitz River - Trout Hatchery",
  "Toutle River - Mouth",
  "Toutle River - North Fork",
  "Toutle River - South Fork",
  "Toutle River - Tower Road Bridge",
  "Toutle River - Hatchery"
];

// Get unique filters and sort them alphabetically
const getUniqueFilters = () => {
  try {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    const species = new Set<string>(IMPORTANT_SPECIES);
    const locations = new Set<string>(IMPORTANT_LOCATIONS);
    
    // Generate dates for the next 30 days
    for (let d = new Date(today); d <= thirtyDaysLater; d.setDate(d.getDate() + 1)) {
      try {
        const forecast = getForecastForDate(new Date(d));
        forecast.recommendations.forEach(rec => {
          if (rec.species) species.add(rec.species);
          if (rec.location) locations.add(rec.location);
        });
      } catch (error) {
        console.error("Error getting forecast for date:", d, error);
      }
    }

    // Also add all location details from our constants
    if (LOCATION_DETAILS) {
      Object.keys(LOCATION_DETAILS).forEach(location => {
        if (location) locations.add(location);
      });
    }
    
    // Add all locations from FISHING_LOCATIONS
    if (FISHING_LOCATIONS) {
      for (const state in FISHING_LOCATIONS) {
        const stateLocations = FISHING_LOCATIONS[state as keyof typeof FISHING_LOCATIONS];
        if (stateLocations && Array.isArray(stateLocations)) {
          stateLocations.forEach(location => {
            if (location) locations.add(location);
          });
        }
      }
    }
    
    return {
      species: Array.from(species).sort(),
      locations: Array.from(locations).sort()
    };
  } catch (error) {
    console.error("Error in getUniqueFilters:", error);
    return { species: IMPORTANT_SPECIES, locations: IMPORTANT_LOCATIONS };
  }
};

// Use try-catch to safely get filters
let species: string[] = IMPORTANT_SPECIES;
let locations: string[] = IMPORTANT_LOCATIONS;

try {
  const filters = getUniqueFilters();
  species = filters.species;
  locations = filters.locations;
} catch (error) {
  console.error("Error initializing filters:", error);
}

interface SearchFiltersProps {
  onFilterChange: (filters: {
    searchTerm: string;
    species: string | null;
    location: string | null;
  }) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange({
      searchTerm: e.target.value,
      species: selectedSpecies,
      location: selectedLocation
    });
  };
  
  const handleSpeciesChange = (value: string) => {
    setSelectedSpecies(value === "all" ? null : value);
    onFilterChange({
      searchTerm,
      species: value === "all" ? null : value,
      location: selectedLocation
    });
  };
  
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value === "all" ? null : value);
    onFilterChange({
      searchTerm,
      species: selectedSpecies,
      location: value === "all" ? null : value
    });
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecies(null);
    setSelectedLocation(null);
    onFilterChange({
      searchTerm: "",
      species: null,
      location: null
    });
  };
  
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for locations..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      
      <div className="flex gap-2">
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
                  onValueChange={handleSpeciesChange}
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
                  onValueChange={handleLocationChange}
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
              
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {(selectedSpecies || selectedLocation) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {selectedSpecies && (
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                {selectedSpecies}
              </span>
            )}
            {selectedLocation && (
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                {selectedLocation}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
