export const PartnersSection = () => {
  return (
    <div className="mt-8 mb-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 shadow-lg text-center text-white">
        <h3 className="text-xl font-bold mb-2">Our Partners</h3>
        <p className="text-blue-100 mb-4 text-sm">
          Check out our trusted partner for great deals
        </p>
        <a
          href="https://DinoTradez.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all text-lg"
        >
          DinoTradez.com
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};
