
import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ForecastTabs } from "@/components/forecast/ForecastTabs";
import { AppFooter } from "@/components/layout/AppFooter";

const Index = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    species: null as string | null,
    location: null as string | null
  });

  return (
    <div className="min-h-screen sky-gradient-bg">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-4xl">
        <AppHeader />
        
        <PageTitle 
          title="Pacific NW Extreme Fishing Forecast"
          subtitle="Daily forecasts for fishing conditions in Washington and Oregon"
        />
        
        <SearchFilters onFilterChange={setFilters} />
        
        <ForecastTabs filters={filters} />
      </div>
      
      <AppFooter />
    </div>
  );
};

export default Index;
