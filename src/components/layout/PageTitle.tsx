
import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className="text-center mb-4 md:mb-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-center text-muted-foreground text-sm md:text-base mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
