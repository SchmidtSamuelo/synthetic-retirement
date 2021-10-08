import { OrganizedMarketData } from 'data/data_types';
import { organizedMarketDataPath } from 'fetch_market_data';
import fs from 'fs';

function averageYearlyRoi(
  formattedStartDate: number,
  formattedEndDate: number,
) {
  const organizedMarketData: OrganizedMarketData = JSON.parse(
    fs.readFileSync(organizedMarketDataPath, 'utf-8'),
  );

  const monthlyRoI = Object.keys(organizedMarketData)
    .filter(
      (key) =>
        Number(key) >= formattedStartDate && Number(key) <= formattedEndDate,
    )
    .map(
      (key) =>
        organizedMarketData[key].INXRollingMonthlyReturnAdjustedForInflation,
    );

  const averageMonthlyRoI =
    monthlyRoI.reduce((a, b) => a + b) / monthlyRoI.length;
  return (averageMonthlyRoI + 1) ** 12 - 1;
}

averageYearlyRoi(192500, 202000);
