
import { washingtonLocations, washingtonLocationDetails } from './washington';
import { oregonLocations, oregonLocationDetails } from './oregon';
import { idahoLocations, idahoLocationDetails } from './idaho';
import { montanaLocations, montanaLocationDetails } from './montana';

// Combine all locations into a single object for backwards compatibility
export const FISHING_LOCATIONS = {
  "Washington": washingtonLocations,
  "Oregon": oregonLocations,
  "Idaho": idahoLocations,
  "Montana": montanaLocations
};

// Combine all location details into a single object for backwards compatibility
export const LOCATION_DETAILS = {
  ...washingtonLocationDetails,
  ...oregonLocationDetails,
  ...idahoLocationDetails,
  ...montanaLocationDetails
};

// Export individual state locations and details for more targeted imports
export {
  washingtonLocations,
  washingtonLocationDetails,
  oregonLocations,
  oregonLocationDetails,
  idahoLocations,
  idahoLocationDetails,
  montanaLocations,
  montanaLocationDetails
};
