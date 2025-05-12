
import React from "react";
import Advertisement from "@/components/Advertisement";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdvertisementSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
      <div className="flex justify-center">
        <Advertisement 
          title="DinoTradez"
          description="DinoTradez putting odds in your favor with probabilities on your side"
          url="https://DINOTRADEZ.COM"
          position="bottom-left"
          color="bg-black"
        />
      </div>
    </div>
  );
};
