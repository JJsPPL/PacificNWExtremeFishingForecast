
import React from "react";

export const AppFooter = () => {
  return (
    <footer className="mt-8 pt-6 pb-8 bg-slate-800 text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="border-t border-slate-600 pt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-300">
              Created using multiple AI Models synthesized into a unified dataset to forecast prime fishing conditions 
              and fish run probabilities in the Pacific Northwest. Our goal is to provide insights for anglers to be 
              productive by not wasting time and money going out fishing when there's no fish or they're simply just 
              not biting. The forecasts generated are from environmental factors and successful historical harvesting patterns.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              <strong>Important:</strong> Past performance is not indicative of future results. This application is 
              provided for educational and entertainment purposes only. Always check local regulations, weather forecasts, 
              and fishing reports before heading out.
            </p>
            <p className="text-sm font-semibold text-slate-300 mt-3">
              Tight lines & Fish on!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
