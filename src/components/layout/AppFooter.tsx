
import React from "react";

export const AppFooter = () => {
  return (
    <footer className="mt-8 pt-6 pb-8 bg-slate-800 dark:bg-[#0c1018] text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Partners Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Our Partners</h3>
          <div className="flex flex-wrap justify-center gap-10">
            <a
              href="https://DinoTradez.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <img src="https://dinotradez.com/logo.png" alt="DinoTradez" className="h-52 w-auto" />
              <span className="text-base font-semibold text-slate-300">DinoTradez.com</span>
            </a>
            <a
              href="https://www.resumebuilderusa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <img src="https://www.resumebuilderusa.com/og-image.png" alt="ResumeBuilderUSA" className="h-52 w-auto rounded-lg" />
              <span className="text-base font-semibold text-slate-300">ResumeBuilderUSA.com</span>
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
