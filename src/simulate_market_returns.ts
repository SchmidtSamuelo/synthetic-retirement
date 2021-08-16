import fs from 'fs';
import {
  OrganizedMarketData,
  OrganizedMonthMarketData,
} from './data/data_types';
import { organizedMarketDataPath } from './fetch_market_data';
import getSimulationStopConditions from './helpers/get_last_window_key';
/*
 * This function is used to backtest the regularly referenced
 * '7% rule', which dictates that after inflation adjustment,
 * the market typically returns 7% per year. This rule inherently
 * results in a smooth graph with no dips or peaks.
 *
 * The lack of dips and peaks in this interpolated 7% return
 * calculation doesn't properly represent market returns
 * in their entirity, and may either over or undershoot the actual
 * returns of the market. With a significant number of simulated
 * savings windows, we can better estimate a more accurate
 * interpolated return rate than just taking S&P500s yearly
 * single-share returns and interpolating that to a yearly
 * cycle.
 *
 * Some extreme 1 year trading window examples visualizing why
 * interpolated return rate projections are misleading
 *
 * $1,000 deposited monthly for 12 months.
 * Undershooting; 2020 Return - ~18.40%
 *  Actual market returns -
 *    End portfolio balance: ~$14,000
 *    Total annualized RoI for 2020: 16.67%
 *  Interpolated returns -
 *    End portfolio balance: ~$13,266
 *    Total annualized RoI for interpolated 2020: 10.55%
 *
 * Overshooting; 2019 Return - ~33.07%
 *  Actual market returns -
 *    End portfolio balance: ~$13,471
 *    Total annualized RoI for 2019: ~12.26%
 *  Interpolated returns -
 *    End portfolio balance: ~$14,382
 *    Total annualized RoI for interpolated 2019: ~19.85%
 */

function backtestMonthlySavingsRate(
  deposit: number,
  startingPortfolioBalance: number = 0,
  simulationLength: number, // months
): void {
  const organizedMarketData: OrganizedMarketData = JSON.parse(
    fs.readFileSync(organizedMarketDataPath, 'utf-8'),
  );
  const rollingMonthlyBalances: any[][] = [];
  const endingBalances: { month: string; balance: number }[] = [];
  const { lastSimulationKey, keys, numStartKeys } =
    getSimulationStopConditions(simulationLength);
  let currentBalance = startingPortfolioBalance;

  // Loop through all simulation windows.
  for (let i = 0; i < numStartKeys; i += 1) {
    const windowMonthEndingBalances = [];
    // Simulate deposits for window starting with startKey[i]
    for (let j = 0; j < simulationLength; j += 1) {
      // double check we are not going to overflow
      if (keys[i + j] === lastSimulationKey) {
        break;
      }
      // continue with simulation
      const monthEndingBalance = getMonthEndingBalance(
        organizedMarketData[keys[i + j]],
        currentBalance,
        deposit,
      );
      windowMonthEndingBalances.push(monthEndingBalance);
      currentBalance =
        windowMonthEndingBalances[windowMonthEndingBalances.length - 1];
    }
    rollingMonthlyBalances.push([keys[i], ...windowMonthEndingBalances]);
    endingBalances.push({ month: keys[i], balance: currentBalance });
    currentBalance = startingPortfolioBalance;
  }
  endingBalances.sort((a, b) => (a.balance > b.balance ? 1 : -1));
  const averageEndingBalance = getAverageEndingBalance(endingBalances);
  console.log(endingBalances);
  console.log(averageEndingBalance);
}

function getMonthEndingBalance(
  monthData: OrganizedMonthMarketData,
  currentBalance: number,
  depositAmount: number,
): number {
  const monthReturn = 1 + monthData.INXRollingMonthlyReturnAdjustedForInflation;
  return (currentBalance + depositAmount) * monthReturn;
}

function getAverageEndingBalance(
  endingBalances: { month: string; balance: number }[],
) {
  const endingBalancesSum = endingBalances
    .map((month) => month.balance)
    .reduce((accumulator, balance) => accumulator + balance);
  return endingBalancesSum / endingBalances.length;
}

backtestMonthlySavingsRate(1000, 0, 360);
