import { OrganizedMarketData } from '../data/data_types';
import { formatDateForObjectKey, getDateKeysForSimulation } from './date_helpers';

// ToDo: Make this take a "deposit amount" object formatted as
// {[`Date`='190012': `DepositAmount`=1000]} to allow more customization
function simulateNMonthSavingsTimeWindow(
  start: Date,
  simulationLength: number, // in months
  monthlyDeposit:number = 0,
  organizedMarketData: OrganizedMarketData,
  startingBalance: number,
): number {
  const startDateKey = formatDateForObjectKey(start);
  const simulationKeys = getDateKeysForSimulation(
    startDateKey,
    organizedMarketData,
    simulationLength,
  );
  let portfolioBalance = startingBalance;
  simulationKeys.forEach((key) => {
    portfolioBalance += monthlyDeposit;
    portfolioBalance *= (1 + organizedMarketData[key].INXRollingMonthlyReturnAdjustedForInflation);
  });
  return portfolioBalance;
}

export default simulateNMonthSavingsTimeWindow;
