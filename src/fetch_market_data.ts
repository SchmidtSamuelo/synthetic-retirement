/* eslint-disable no-restricted-syntax */
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import { defaultColumnMap } from './data/column_map';
import OrganizedCleanedMarketData from './helpers/reorganize_json';

// const data = require('./data/data');
const excelFilePath = './files/excel/ie_data.xls';
const organizedMarketDataPath = './files/json/monthlyMarketData.json';

const headerRows = 8;
const columnMap = defaultColumnMap;
let organizedMarketData;

// If we don't have the .json data file
// ToDo: Figure out how to download the excel file from the URL
// Axios and http.get don't seem to be working for some reason
if (!fs.existsSync(organizedMarketDataPath)) {
  // convert excel to JSON
  const rawData = excelToJson({
    sourceFile: excelFilePath,
    header: {
      rows: headerRows, // file from yale has 8 header rows for some reason.
    },
    columnToKey: columnMap,
    sheets: ['Data'], // stock data, other sheets are charts/disclaimers
  });

  // write data to .json file. no overwrite
  organizedMarketData = new OrganizedCleanedMarketData(rawData.Data).reorganizeJson();
  console.log(Object.keys(organizedMarketData));
  fs.writeFileSync(organizedMarketDataPath, JSON.stringify(organizedMarketData), { flag: 'wx' });
}

const rawMarketData = fs.readFileSync(organizedMarketDataPath, 'utf-8');
const marketData = JSON.parse(rawMarketData);

// eslint-disable-next-line guard-for-in
for (const o in marketData) {
  console.log(marketData[o]);
}
