
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
        className={`${color} rounded-lg p-3 text-white backdrop-blur-sm bg-opacity-90 border border-white border-opacity-20`}
        style={{
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-sm md:text-base mb-1">{title}</h3>
          <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-70" />
        </div>
        <p className="text-xs md:text-sm opacity-90 mb-1">{description}</p>
        <div className="text-xs opacity-70 text-right font-medium">Advertisement</div>
      </div>
    </a>
  );
};

export default Advertisement;
