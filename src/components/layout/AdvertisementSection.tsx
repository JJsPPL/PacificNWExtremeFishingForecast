import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdvertisementSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
      <div className="flex justify-center">
        <div className="relative w-full max-w-3xl h-40 md:h-56 rounded-lg overflow-hidden shadow-lg">
          {/* Circular background - mirroring the logo's circular design */}
          <div className="absolute inset-0 bg-blue-700 rounded-lg">
            {/* Sun - replacing the moon from the logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-300 shadow-lg">
              {/* Sun rays */}
              <div className="absolute inset-0 rounded-full animate-pulse" style={{
                boxShadow: "0 0 40px 20px rgba(255, 236, 130, 0.8)",
              }}></div>
            </div>
            
            {/* Blue water - matching the logo's water styling */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900 via-blue-800 to-blue-700">
              {/* Water ripples */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-30"></div>
              <div className="absolute top-3 left-0 w-full h-px bg-blue-400 opacity-20"></div>
            </div>
            
            {/* Animated fish - keeping in theme with fishing */}
            <div className="absolute bottom-1/4 left-1/4 transform rotate-45">
              <svg className="text-gray-100 w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10c-1 1.5-3 3-6 3s-5-1.5-6-3 3-3 6-3 5 1.5 6 3z"></path>
                <path d="M18 10c-.5 1.5-1.79 3-5 3-3 0-4.27-1.5-5-3h10z" fill="currentColor"></path>
                <path d="M19 9c.64 0 1.27-.17 1.81-.48A2.5 2.5 0 0023 6.5a2.5 2.5 0 00-2.19-2.48A18.99 18.99 0 0019 4"></path>
              </svg>
            </div>
            
            <div className="absolute bottom-1/6 right-1/3 transform -rotate-12">
              <svg className="text-gray-100 w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10c-1 1.5-3 3-6 3s-5-1.5-6-3 3-3 6-3 5 1.5 6 3z"></path>
                <path d="M18 10c-.5 1.5-1.79 3-5 3-3 0-4.27-1.5-5-3h10z" fill="currentColor"></path>
                <path d="M19 9c.64 0 1.27-.17 1.81-.48A2.5 2.5 0 0023 6.5a2.5 2.5 0 00-2.19-2.48A18.99 18.99 0 0019 4"></path>
              </svg>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-500 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
