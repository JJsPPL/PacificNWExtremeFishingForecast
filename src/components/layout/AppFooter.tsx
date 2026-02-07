
import React from "react";

export const AppFooter = () => {
  return (
    <footer className="mt-8 pt-6 pb-8 bg-slate-800 text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Partners Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Our Partners</h3>
          <div className="flex justify-center">
            <a
              href="https://DinoTradez.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105"
            >
              DinoTradez.com
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-600 pt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-300">
              This application utilizes multiple AI models to synthesize a unified dataset, forecasting optimal fishing conditions and fish run probabilities across the Pacific Northwest. Our goal is to equip anglers with valuable insights, helping them maximize productivity while minimizing wasted time and expenses on unfruitful outings. These forecasts are based on environmental factors and successful historical harvesting patterns.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              <strong>Important:</strong> Past performance is not indicative of future results. This application is intended for educational and entertainment purposes only. Always verify local fishing regulations, weather conditions, and reports before heading out.
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
