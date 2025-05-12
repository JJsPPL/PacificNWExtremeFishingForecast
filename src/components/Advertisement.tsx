
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdvertisementProps {
  title: string;
  description: string;
  url: string;
  position: 'bottom-left' | 'bottom-right';
  color: string;
}

const Advertisement = ({ title, description, url, position, color }: AdvertisementProps) => {
  const isMobile = useIsMobile();
  
  // Non-fixed positioning classes
  const positionClasses = isMobile 
    ? 'mb-4 mx-auto' // Center on mobile
    : {
        'bottom-left': 'ml-6 mb-6 float-left',
        'bottom-right': 'mr-6 mb-6 float-right',
      }[position];

  const widthClass = isMobile ? 'w-[90%] max-w-[300px]' : 'w-[280px]';
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${isMobile ? positionClasses : positionClasses} ${widthClass} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
    >
      <div 
        className={`${color} rounded-lg overflow-hidden border border-white border-opacity-20`}
        style={{
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Website-like header with URL bar */}
        <div className="bg-gray-800 px-3 py-2 flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-gray-700 rounded-md px-2 py-1 text-[10px] text-gray-300 truncate">
              {url.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Website content section */}
        <div className="p-3 text-white backdrop-blur-sm bg-opacity-90">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-sm md:text-base mb-1">{title}</h3>
            <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-70" />
          </div>
          
          {/* Website-like content section */}
          <div className="mb-2">
            <div className="w-3/4 h-2 bg-white bg-opacity-20 rounded mb-1.5"></div>
            <div className="w-full h-2 bg-white bg-opacity-20 rounded mb-1.5"></div>
            <div className="w-2/3 h-2 bg-white bg-opacity-20 rounded"></div>
          </div>
          
          <p className="text-xs md:text-sm opacity-90 mb-1 mt-2">{description}</p>
          <div className="text-xs opacity-70 text-right font-medium">Advertisement</div>
        </div>
      </div>
    </a>
  );
};

export default Advertisement;
