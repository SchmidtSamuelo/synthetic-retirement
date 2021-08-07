import { OrganizedMarketData, OriginalMonthMarketData, OrganizedMonthMarketData } from '../data/data_types';

/*
* Reorganize the parsed file to make it more easily accessible in backtests.
* Specifically for date accessibility. Getting date data is faster if we are
* able to call it like stockData[dateString]
*/

class OrganizedCleanedMarketData {
  originalMarketData: OriginalMonthMarketData[];

  constructor(originalMarketData: OriginalMonthMarketData[]) {
    // filter out trailing or leading rows without a Date
    this.originalMarketData = originalMarketData.filter((monthData) => monthData.Date);
  }

  reorganizeJson() {
    const organizedMarketData: OrganizedMarketData = {};

    this.originalMarketData.forEach((monthData) => {
      monthData.Date = formattedDate(monthData.Date.toString());
    });
    this.originalMarketData.map((monthData) => {
      organizedMarketData[monthData.Date] = formatData(monthData);
    }); // make date the key

    return organizedMarketData;
  }
}

function formatData(monthData: OriginalMonthMarketData): OrganizedMonthMarketData {
  const formattedMonthData: OrganizedMonthMarketData = { ...monthData }; // shallow copy
  delete formattedMonthData.Date;
  return formattedMonthData;
}

// Takes the date input as `YYYY.MM` and outputs as `YYYYMM`
// 10th month is also added a 0. EX: `1871.1` will return `187110`
function formattedDate(dateString: string) {
  // 10th month handling
  if (dateString.length < 7) {
    dateString += '0';
  }
  return dateString.replace('.', '');
}

export { OrganizedCleanedMarketData as default };
