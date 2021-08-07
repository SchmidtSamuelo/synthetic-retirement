// ToDo: Convert to Typescript
const excelToJson = require('convert-excel-to-json');
const ColumnMap = require('./data/column_map');
const OrganizedMarketData = require('./helpers/reorganize_json');
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
  columnMap = ColumnMap.defaultColumnMap;
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

const organizedMarketData = new OrganizedMarketData(marketData.Data);
console.log(organizedMarketData.reorganizeJson()['187101']);

// console.log(organizedMarketData)

// write data to .json file
// fs.writeFile('')

console.log('data');
