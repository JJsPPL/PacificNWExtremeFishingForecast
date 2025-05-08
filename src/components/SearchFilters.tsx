
import { useState } from "react";
import { SearchInput } from "@/components/filters/SearchInput";
import { FiltersPopover } from "@/components/filters/FiltersPopover";
import { ActiveFilters } from "@/components/filters/ActiveFilters";
import { getUniqueFilters, IMPORTANT_SPECIES, IMPORTANT_LOCATIONS } from "@/components/filters/filterUtils";

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
  
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({
      searchTerm: value,
      species: selectedSpecies,
      location: selectedLocation
    });
  };
  
  const handleSpeciesChange = (value: string) => {
    const newSpecies = value === "all" ? null : value;
    setSelectedSpecies(newSpecies);
    onFilterChange({
      searchTerm,
      species: newSpecies,
      location: selectedLocation
    });
  };
  
  const handleLocationChange = (value: string) => {
    const newLocation = value === "all" ? null : value;
    setSelectedLocation(newLocation);
    onFilterChange({
      searchTerm,
      species: selectedSpecies,
      location: newLocation
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
      <SearchInput 
        searchTerm={searchTerm}
        onChange={handleSearchChange}
      />
      
      <div className="flex gap-2">
        <FiltersPopover
          species={species}
          locations={locations}
          selectedSpecies={selectedSpecies}
          selectedLocation={selectedLocation}
          onSpeciesChange={handleSpeciesChange}
          onLocationChange={handleLocationChange}
          onClearFilters={clearFilters}
        />
        
        <ActiveFilters 
          selectedSpecies={selectedSpecies}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};
