import { OrganizedMarketData } from './data/data_types';
import fetchOrWriteManipulatedMarketData from './fetch_market_data';
import simulateNMonthSavingsTimeWindow from './helpers/simulate_time_window';

async function backtestNPercentRule(
  withdrawPercent: number,
  portfolioBalance: number,
  simulationLength: number,
): Promise<void> {
  const organizedMarketData: OrganizedMarketData =
    await fetchOrWriteManipulatedMarketData();
}

// async function backtestMonthlySavingsRate(deposit: number, startingPortfolioBalance: number = 0, simulationLength: number): Promise<void> {
//   const organizedMarketData: OrganizedMarketData = await fetchOrWriteManipulatedMarketData();
//   const endingBalances: number[];
//   for (let i = 0; i < simulationLength; i+=1) {

//   }
// }
