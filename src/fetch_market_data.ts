/* eslint-disable no-restricted-syntax */
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import axios from 'axios';
import { OrganizedMarketData } from 'data/data_types';
import { defaultColumnMap } from './data/column_map';
import OrganizedCleanedMarketData from './helpers/reorganize_json';

const excelUrl = 'http://www.econ.yale.edu/~shiller/data/ie_data.xls';
// const excelUrl = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls';
const excelFilePath = './files/excel/ie_data.xls';
const organizedMarketDataPath = './files/json/monthlyMarketData.json';

async function fetchData(): Promise<any> {
  const filestream = fs.createWriteStream(excelFilePath);

  // if the excel file doesn't exist
  // holy shit this is ugly... Someone please tell me how to do it correctly
  return axios({
    method: 'get',
    url: excelUrl,
    responseType: 'stream',
  })
    .then(
      (response) =>
        new Promise((resolve) => {
          response.data.pipe(filestream);
          let error: boolean = false;
          filestream.on('error', (err) => {
            error = Boolean(err);
            filestream.close();
            throw err;
          });
          filestream.on('close', () => {
            if (!error) {
              resolve(true);
            }
          });
        }),
    )
    .catch((error) => {
      throw error;
    });
}

function buildWriteManipulatedMarketDataJson() {
  // convert excel to JSON
  const rawData = excelToJson({
    sourceFile: excelFilePath,
    header: {
      rows: 8, // file from yale has 8 header rows for some reason
    },
    columnToKey: defaultColumnMap,
    sheets: ['Data'], // stock data, other sheets are charts/disclaimers
  });
  // write data to .json file no overwrite
  const organizedMarketData = new OrganizedCleanedMarketData(
    rawData.Data,
  ).reorganizeJson();

  fs.writeFileSync(
    organizedMarketDataPath,
    JSON.stringify(organizedMarketData),
    { flag: 'wx' },
  );
  return organizedMarketData;
}

async function fetchOrWriteManipulatedMarketData(): Promise<OrganizedMarketData> {
  // If we don't have the .json data file we need to build it
  if (!fs.existsSync(organizedMarketDataPath)) {
    // If we also don't have the .xls file fetch it
    if (!fs.existsSync(excelFilePath)) {
      await fetchData();
    }
    buildWriteManipulatedMarketDataJson();
  }

  const rawMarketData = fs.readFileSync(organizedMarketDataPath, 'utf-8');
  const marketData: OrganizedMarketData = JSON.parse(rawMarketData);
  console.log(marketData['187102']);

  return marketData;
}

async function runScript(): Promise<void> {
  const marketData = await fetchOrWriteManipulatedMarketData();
  console.log(marketData['187101']);
}

runScript();

export default fetchOrWriteManipulatedMarketData;
