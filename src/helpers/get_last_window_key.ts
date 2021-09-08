import fs from 'fs';
import { OrganizedMarketData } from '../data/data_types';
import { organizedMarketDataPath } from '../fetch_market_data';

// Get the number of starting points for simulation and last key
function getSimulationStopConditions(
  timeFrame: number, // months
): { lastSimulationKey: string; keys: string[]; numStartKeys: number } {
  const organizedMarketData: OrganizedMarketData = JSON.parse(
    fs.readFileSync(organizedMarketDataPath, 'utf-8'),
  );

  const keys = Object.keys(organizedMarketData);
  const numStartKeys = keys.length - timeFrame;
  console.log(keys[keys.length - 1]);
  return { lastSimulationKey: keys[keys.length - 1], keys, numStartKeys };
}

export default getSimulationStopConditions;
