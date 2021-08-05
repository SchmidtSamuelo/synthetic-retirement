/*
* Reorganize the parsed file to make it more easily accessible in backtests.
* Specifically for date accessibility. Getting date data is faster if we are
* able to call it like stockData[dateString]
*/
class OrganizedCleanedMarketData {
  constructor(originalMarketData) {
    // filter out trailing or leading rows without a Date
    this.originalMarketData = originalMarketData.filter((monthData) => monthData.Date);
  }

  reorganizeJson() {
    const organizedMarketData = {};

    this.originalMarketData.forEach((monthData): object => {
      monthData.Date = formattedDate(monthData.Date.toString());
    });
    this.originalMarketData.map((monthData): object => {
      organizedMarketData[monthData.Date] = formatData(monthData);
    }); // make date the key

    return organizedMarketData;
  }
}

function formatData(monthData) {
  let formattedMonthData = {};
  formattedMonthData = { ...monthData }; // shallow copy
  delete formattedMonthData.Date;
  return formattedMonthData;
}

// Takes the date input as `YYYY.MM` and outputs as `YYYYMM`
// 10th month is also added a 0. EX: `1871.1` will return `187110`
function formattedDate(dateString) {
  // 10th month handling
  if (dateString.length < 7) {
    dateString += '0';
  }
  return dateString.replace('.', '');
}

module.exports = OrganizedCleanedMarketData;
