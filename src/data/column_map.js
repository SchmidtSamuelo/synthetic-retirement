/*
*  unfortunately, this has to be hardcoded since column names span up to 6 rows
*  and convert-excel-to-json does not have a way to combine all title rows
*  into one auto-named property.
*  ToDo: Convert to interface with Typescript conversion
*/
const defaultColumnMap = {
  A: 'Date',
  B: 'INXClosingPrice',
  C: 'YearlyInterpolatedDividends',
  D: 'Earnings',
  E: 'CPI',
  F: 'DateFraction',
  G: 'LongInterestRateGS10',
  H: 'RealPrice',
  I: 'RealDividends',
  J: 'RealTotalReturnPrice',
  K: 'RealEarnings',
  L: 'RealTRScaledEarnings',
  M: 'CyclicallyAdjustedPERatio',
  N: 'CyclicallyAdjustedTRPERatio',
  O: 'MonthlyTotalBondReturns',
  P: 'EMPTY',
  Q: 'ExcessCAPEYield',
  R: 'MonthlyTotalBondReturns',
  S: 'RealTotalBondReturns',
  T: '10YearAnnualizedStockRealReturn',
  U: '10YearAnnualizedBondsRealReturn',
  V: 'Real10YearExcessAnnualizedReturns',
};

// hardcoded for local testing in case I am manipulating files.
const manuallyManipulatedColumnMap = {
  A: 'INXClosingPrice',
  B: 'YearlyInterpolatedDividends',
  C: 'Earnings',
  D: 'CPI',
  E: 'LongInterestRate',
  F: 'RealPrice',
  G: 'RealDividends',
  H: 'RealTotalReturnPrice',
  I: 'RealEarnings',
  J: 'RealTRScaledEarnings',
  K: 'CyclicallyAdjustedPERatio',
  L: 'CyclicallyAdjustedTRPERatio',
  M: 'MonthlyTotalBondReturns',
  N: 'RealTotalBondReturns',
  O: '10YearAnnualizedStockRealReturn',
  P: '10YearAnnualizedBondRealReturn',
  Q: 'Real10YearExcessAnnualizedReturns',
};

module.exports = {
  defaultColumnMap,
  manuallyManipulatedColumnMap,
};
