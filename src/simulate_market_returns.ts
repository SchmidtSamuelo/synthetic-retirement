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
  const endingBalances: number[][] = [];
  const { lastSimulationKey, startKeys } =
    getSimulationStopConditions(simulationLength);
  let currentBalance = startingPortfolioBalance;

  // Loop through all simulation windows.
  for (let i = 0; i < startKeys.length; i += 1) {
    const windowMonthEndingBalances = [];
    // Simulate deposits for window starting with startKey[i]
    for (let j = 0; j < simulationLength; j += 1) {
      console.log(startKeys[i + j]);
      // double check we are not going to overflow
      if (startKeys[i + j] === lastSimulationKey) {
        break;
      }
      // continue with simulation
      const monthEndingBalance = getMonthEndingBalance(
        organizedMarketData[startKeys[i + j]],
        currentBalance,
        deposit,
      );
      windowMonthEndingBalances.push(monthEndingBalance);
    }
    currentBalance =
      windowMonthEndingBalances[windowMonthEndingBalances.length];
    endingBalances.push(windowMonthEndingBalances);
  }
  console.log(endingBalances);
}

function getMonthEndingBalance(
  monthData: OrganizedMonthMarketData,
  currentBalance: number,
  depositAmount: number,
): number {
  const monthReturn = 1 + monthData.INXRollingMonthlyReturnAdjustedForInflation;
  return (currentBalance + depositAmount) * monthReturn;
}

async function runScript() {
  const endingBalances = backtestMonthlySavingsRate(1000, 0, 360);
  console.log(endingBalances);
}
runScript();
