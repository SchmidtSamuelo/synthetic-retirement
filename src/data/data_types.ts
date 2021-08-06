export interface OrganizedMonthMarketData {
    Date?: string | number,
    INXClosingPrice?: number,
    YearlyInterpolatedDividends?: number,
    Earnings?: number,
    CPI?: number,
    DateFraction?: number,
    LongInterestRateGS10?: number,
    RealPrice?: number,
    RealDividends?: number,
    RealTotalReturnPrice?: number,
    RealEarnings?: number,
    RealTRScaledEarnings?: number,
    CyclicallyAdjustedPERatio?: number,
    MonthlyTotalBondReturns?: number,
    ExcessCAPEYield?: number,
    RealTotalBondReturns?: number
}

export interface OrganizedMarketData {
    [key: string]: OrganizedMonthMarketData
}

export interface OriginalMonthMarketData {
    Date: number | string,
    INXClosingPrice?: number,
    YearlyInterpolatedDividends?: number,
    Earnings?: number,
    CPI?: number,
    DateFraction?: number,
    LongInterestRateGS10?: number,
    RealPrice?: number,
    RealDividends?: number,
    RealTotalReturnPrice?: number,
    RealEarnings?: number,
    RealTRScaledEarnings?: number,
    CyclicallyAdjustedPERatio?: any,
    MonthlyTotalBondReturns?: number,
    RealTotalBondReturns?: number,
    '10YearAnnualizedStockRealReturn'?: number,
    '10YearAnnualizedBondsRealReturn'?: number,
    Real10YearExcessAnnualizedReturns?: number
}
