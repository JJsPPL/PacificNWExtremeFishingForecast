
import { columbiaRiverLocations, columbiaRiverDetails } from './columbia';
import { willametteRiverLocations, willametteRiverDetails } from './willamette';
import { sandyRiverLocations, sandyRiverDetails } from './sandy';
import { clackamasRiverLocations, clackamasRiverDetails } from './clackamas';
import { nestuccaRiverLocations, nestuccaRiverDetails } from './nestucca';
import { tillamookSystemLocations, tillamookSystemDetails } from './tillamook';
import { otherOregonLocations, otherOregonDetails } from './other';

// Combine all Oregon locations into a single array
export const oregonLocations = [
  ...columbiaRiverLocations,
  ...willametteRiverLocations,
  ...sandyRiverLocations,
  ...clackamasRiverLocations,
  ...nestuccaRiverLocations,
  ...tillamookSystemLocations,
  ...otherOregonLocations
];

// Combine all Oregon location details into a single object
export const oregonLocationDetails = {
  ...columbiaRiverDetails,
  ...willametteRiverDetails,
  ...sandyRiverDetails,
  ...clackamasRiverDetails,
  ...nestuccaRiverDetails,
  ...tillamookSystemDetails,
  ...otherOregonDetails
};
