
interface ActiveFiltersProps {
  selectedSpecies: string | null;
  selectedLocation: string | null;
}

export const ActiveFilters = ({ selectedSpecies, selectedLocation }: ActiveFiltersProps) => {
  if (!selectedSpecies && !selectedLocation) return null;
  
  return (
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
  );
};
