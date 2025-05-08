
import { X, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ searchTerm, onChange }: SearchInputProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const clearSearch = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search for locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-9 pr-8"
      />
      {searchTerm && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-1 top-1 h-7 w-7 p-0 rounded-full" 
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
};
