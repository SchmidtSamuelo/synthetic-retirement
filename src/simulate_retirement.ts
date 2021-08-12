import { OrganizedMarketData } from './data/data_types';
import { fetchOrWriteManipulatedMarketData } from './fetch_market_data';

async function backtestNPercentRule(
  withdrawPercent: number,
  portfolioBalance: number,
  simulationLength: number,
): Promise<void> {
  const organizedMarketData: OrganizedMarketData =
    await fetchOrWriteManipulatedMarketData();
}
