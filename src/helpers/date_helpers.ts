import { OrganizedMarketData } from '../data/data_types';

export function getDateKeysForSimulation(
  startDateKey: string,
  organizedMarketData: OrganizedMarketData,
  cycles: number,
): string[] {
  const keys = Object.keys(organizedMarketData);
  const startIndex = keys.indexOf(startDateKey);
  return keys.slice(startIndex, startIndex + cycles);
}

export function formatDateForObjectKey(date: Date): string {
  return String(date.getFullYear() + date.getMonth());
}
