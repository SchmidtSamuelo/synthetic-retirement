import excelToJson from 'convert-excel-to-json';
// const fs = require('fs');
// const data = require('./data/data');
import { defaultColumnMap } from './data/column_map';
import OrganizedCleanedMarketData from './helpers/reorganize_json';
// const fileLocation = 'http://www.econ.yale.edu/~shiller/data/ie_data.xls'
const fileLocation = './files/excel/ie_data.xls';

let headerRows = 1;
let columnMap = {};

// If we are collecting the file from yale
if (fileLocation.slice(4) === 'http') {
  console.log('Downloading file');

// else grab local file
} else {
  console.log('Grabbing local file');
  headerRows = 8;
  columnMap = defaultColumnMap;
}

// convert excel to JSON
const marketData = excelToJson({
  sourceFile: fileLocation,
  header: {
    rows: headerRows, // file from yale has 8 header rows for some reason.
  },
  columnToKey: columnMap,
  sheets: ['Data'], // stock data, other sheets are charts/disclaimers
});

const organizedMarketData = new OrganizedCleanedMarketData(marketData.Data);
console.log(Object.keys(organizedMarketData.reorganizeJson()));

// console.log(organizedMarketData)

// write data to .json file
// fs.writeFile('')

console.log('data');
