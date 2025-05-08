
import React from "react";
import Advertisement from "@/components/Advertisement";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdvertisementSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
      <div className={isMobile ? "flex flex-col items-center space-y-4" : "flex justify-between"}>
        <Advertisement 
          title="DINO TRADEZ"
          description="DinoTradez putting odds in your favor with probabilities on your side"
          url="https://DINOTRADEZ.COM"
          position="bottom-left"
          color="bg-black"
        />
        
        <Advertisement 
          title="JJ'S CATERS"
          description="Catering events with premium treats and fiesta plates"
          url="https://JJSCATERS.COM"
          position="bottom-right"
          color="bg-gradient-to-r from-pink-500 to-blue-500"
        />
      </div>
    </div>
  );
};
