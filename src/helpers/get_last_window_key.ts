import fs from 'fs';
import { OrganizedMarketData } from '../data/data_types';
import { organizedMarketDataPath } from '../fetch_market_data';

// Get the number of starting points for simulation and last key
function getSimulationStopConditions(
  timeFrame: number, // months
): { lastSimulationKey: string; startKeys: string[] } {
  const organizedMarketData: OrganizedMarketData = JSON.parse(
    fs.readFileSync(organizedMarketDataPath, 'utf-8'),
  );

  const keys = Object.keys(organizedMarketData);
  const numStartKeys = keys.length - timeFrame;
  const startKeys = keys.slice(0, numStartKeys + 1);
  console.log(startKeys[startKeys.length - 1]);
  return { lastSimulationKey: keys[numStartKeys], startKeys }; // Make sure we don't overflow
}

export default getSimulationStopConditions;
