
import { wynocheeLocations, wynocheeLocationDetails } from './wynochee';
import { olympicLocations, olympicLocationDetails } from './olympic';
import { cowlitzLocations, cowlitzLocationDetails } from './cowlitz';
import { lewisLocations, lewisLocationDetails } from './lewis';
import { kalamaLocations, kalamaLocationDetails } from './kalama';
import { toutleLocations, toutleLocationDetails } from './toutle';
import { windLocations, windLocationDetails } from './wind';
import { otherLocations, otherLocationDetails } from './other';

// Combine all Washington locations
export const washingtonLocations = [
  ...wynocheeLocations,
  ...olympicLocations,
  ...cowlitzLocations,
  ...lewisLocations,
  ...kalamaLocations,
  ...toutleLocations,
  ...windLocations,
  ...otherLocations
];

// Combine all Washington location details
export const washingtonLocationDetails = {
  ...wynocheeLocationDetails,
  ...olympicLocationDetails,
  ...cowlitzLocationDetails,
  ...lewisLocationDetails,
  ...kalamaLocationDetails,
  ...toutleLocationDetails,
  ...windLocationDetails,
  ...otherLocationDetails
};

// Export individual location groups for targeted imports
export {
  wynocheeLocations,
  wynocheeLocationDetails,
  olympicLocations,
  olympicLocationDetails,
  cowlitzLocations,
  cowlitzLocationDetails,
  lewisLocations,
  lewisLocationDetails,
  kalamaLocations,
  kalamaLocationDetails,
  toutleLocations,
  toutleLocationDetails,
  windLocations,
  windLocationDetails,
  otherLocations,
  otherLocationDetails
};
