
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fish, Sunrise } from "lucide-react";

export const AdvertisementSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
      <div className="flex justify-center">
        <div className="relative w-full max-w-3xl h-40 md:h-56 rounded-lg overflow-hidden shadow-lg">
          {/* Sunrise background */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-700 via-blue-500 to-orange-300">
            {/* Sun */}
            <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-300 shadow-lg shadow-yellow-500/50"></div>
            
            {/* Water */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-600">
              {/* Water ripples */}
              <div className="absolute top-2 left-0 w-full h-2 bg-blue-400 opacity-30"></div>
              <div className="absolute top-6 left-0 w-full h-1 bg-blue-400 opacity-20"></div>
              <div className="absolute top-10 left-0 w-full h-1 bg-blue-400 opacity-10"></div>
            </div>
            
            {/* Jumping salmon - large */}
            <div className="absolute bottom-1/3 right-1/4 transform rotate-45">
              <Fish className="text-gray-700 w-12 h-12 md:w-16 md:h-16" />
            </div>
            
            {/* Jumping salmon - medium */}
            <div className="absolute bottom-1/4 left-1/3 transform -rotate-45">
              <Fish className="text-gray-800 w-10 h-10 md:w-12 md:h-12" />
            </div>
            
            {/* Jumping salmon - small */}
            <div className="absolute bottom-2/5 left-1/4 transform rotate-12">
              <Fish className="text-gray-600 w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Sun rays */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full">
              <Sunrise className="text-yellow-200 w-full h-16 md:h-24 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
