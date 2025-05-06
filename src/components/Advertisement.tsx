
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
  
  // Adjust positions for mobile and desktop layouts
  const positionClasses = isMobile 
    ? {
        'bottom-left': 'bottom-1 left-1/2 -translate-x-1/2 mb-20', // Stack on mobile
        'bottom-right': 'bottom-1 left-1/2 -translate-x-1/2 mb-2',  // Stack on mobile
      }
    : {
        'bottom-left': 'bottom-6 left-6',
        'bottom-right': 'bottom-6 right-6',
      };

  const widthClass = isMobile ? 'max-w-[80%]' : 'max-w-[240px]';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses[position]} z-10 ${widthClass} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
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
