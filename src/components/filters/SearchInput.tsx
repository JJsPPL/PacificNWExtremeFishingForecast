
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ searchTerm, onChange }: SearchInputProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search for locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-9"
      />
    </div>
  );
};
