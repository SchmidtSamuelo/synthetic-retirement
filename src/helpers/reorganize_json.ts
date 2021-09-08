import {
  OrganizedMarketData,
  OriginalMonthMarketData,
  OrganizedMonthMarketData,
} from '../data/data_types';

/*
 * Reorganize the parsed file to make it more easily accessible in backtests.
 * Specifically for date accessibility. Getting date data is faster if we are
 * able to call it like stockData[dateString]
 */

class OrganizedCleanedMarketData {
  originalMarketData: OriginalMonthMarketData[];

  constructor(originalMarketData: OriginalMonthMarketData[]) {
    // filter out trailing or leading rows without a Date
    this.originalMarketData = originalMarketData.filter(
      (monthData) => monthData.Date,
    );
  }

  reorganizeJson() {
    const organizedMarketData: OrganizedMarketData = {};

    this.originalMarketData.forEach((monthData) => {
      monthData.Date = formattedDate(monthData.Date.toString());
    });
    this.originalMarketData.map((monthData) => {
      organizedMarketData[monthData.Date] = formatData(monthData);
    }); // make date the key

    calculateRollingMonthlyReturnAdjustedForInflation(organizedMarketData);
    calculateRollingUnadjustedMonthlyReturn(organizedMarketData);
    return organizedMarketData;
  }
}

// // ToDo: Is this function doing too much work?
function calculateRollingUnadjustedMonthlyReturn(
  organizedMarketData: OrganizedMarketData,
) {
  // Calculate the "Total Return Price" with closing and interpolated dividend payout
  // Calculate the rolling unadjusted monthly return as a decimal
  let lastMonthlyClose = organizedMarketData['187101'].INXClosingPrice;
  let lastInterpolatedDividendYield =
    organizedMarketData['187101'].YearlyInterpolatedDividends;
  let lastUnadjustedTotalReturnPrice =
    lastMonthlyClose + lastInterpolatedDividendYield;
  organizedMarketData['187101'].UnadjustedTotalReturnPrice =
    lastUnadjustedTotalReturnPrice;

  Object.keys(organizedMarketData).forEach((monthlyData) => {
    // convert the yearly interpolated dividend back to a monthly yield
    const reterpolatedDividendYield = lastInterpolatedDividendYield / 12;
    const inxClosingPrice = organizedMarketData[monthlyData].INXClosingPrice;

    // calculate the new undadjusted total return price (IE: What holding one
    // share of simulated S&P 500 would yield over time)
    const unadjustedTotalReturnPrice =
      lastUnadjustedTotalReturnPrice *
      ((inxClosingPrice + reterpolatedDividendYield) / lastMonthlyClose);

    organizedMarketData[monthlyData].UnadjustedTotalReturnPrice =
      unadjustedTotalReturnPrice;

    organizedMarketData[monthlyData].INXRollingMonthlyUnadjustedReturn =
      (unadjustedTotalReturnPrice - lastUnadjustedTotalReturnPrice) /
      lastUnadjustedTotalReturnPrice;

    lastMonthlyClose = organizedMarketData[monthlyData].INXClosingPrice;
    lastInterpolatedDividendYield =
      organizedMarketData[monthlyData].YearlyInterpolatedDividends;
    lastUnadjustedTotalReturnPrice =
      organizedMarketData['187101'].RealTotalReturnPrice;
  });
}

function calculateRollingMonthlyReturnAdjustedForInflation(
  organizedMarketData: OrganizedMarketData,
) {
  let lastMonthlyClose = organizedMarketData['187101'].RealTotalReturnPrice;
  Object.keys(organizedMarketData).forEach((monthlyData) => {
    organizedMarketData[
      monthlyData
    ].INXRollingMonthlyReturnAdjustedForInflation =
      (organizedMarketData[monthlyData].RealTotalReturnPrice -
        lastMonthlyClose) /
      lastMonthlyClose;

    lastMonthlyClose = organizedMarketData[monthlyData].RealTotalReturnPrice;
  });
}

function formatData(
  monthData: OriginalMonthMarketData,
): OrganizedMonthMarketData {
  // shallow copy
  const formattedMonthData: Partial<OrganizedMonthMarketData> = {
    ...monthData,
  };

  delete formattedMonthData.Date;
  return formattedMonthData as OrganizedMonthMarketData;
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
