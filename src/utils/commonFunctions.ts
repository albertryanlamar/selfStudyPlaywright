import { error } from 'console';
import { testdataBasepath } from './constant'
import * as fs from "fs";
import path from "path";
import { errors } from '@playwright/test';
import ajv, { Ajv } from 'ajv';
import * as XLSX from 'xlsx'
import { parse } from 'csv-parse';
import PropertiesReader from 'properties-reader';

let finalpath;
let readFile;

class commonFunctions {


     readJsonTestdataPath(file: any, rowStart?: number, rowEnd?: number, sheetName?) {

          //json file
          if (file.endsWith('.json')) {
               finalpath = path.join(testdataBasepath, file);
               if (!fs.existsSync(finalpath)) {
                    throw new Error(`Testdata file json not found ${finalpath}`);
               }
               readFile =  JSON.parse(fs.readFileSync(finalpath, 'utf-8'));
          }
          else if (file.endsWith('.csv')) {
               finalpath = path.join(testdataBasepath, file)
               if (!fs.existsSync(finalpath)) {
                    throw new Error(`Testdata file csv not found ${finalpath}`);
               }
               let files = fs.readFileSync(finalpath, 'utf-8');
               readFile = parse(files, {
                    columns: true,
                    skip_empty_lines: true
               })

          }
          else if (file.endsWith('.xlsx') || file.endsWith('.xls')) {
               const finalpath = path.join(testdataBasepath, "excel", file);
               if (!fs.existsSync(finalpath)) {
                    throw new Error(`Testdatafile excel not found! ${finalpath}`);
               }

               const workbook = XLSX.readFile(finalpath);
               const worksheet = workbook.Sheets[sheetName]; // 
               const headersRangeStr = 'A1:Z1'; // =

               // Kunin ang headers mula sa header row
               const headersResult = XLSX.utils.sheet_to_json(worksheet, { range: headersRangeStr, header: 1 });
               const headers: string[] = headersResult ? (headersResult[0] as string[]) : [];

               const testCases = [];

               for (let rowNum = rowStart; rowNum <= rowEnd; rowNum++) {
                    const dataRangeStr = `${XLSX.utils.encode_cell({ r: rowNum - 1, c: 0 })}:${XLSX.utils.encode_cell({ r: rowNum - 1, c: headers.length - 1 })}`;

                    const rowResult = XLSX.utils.sheet_to_json(worksheet, { range: dataRangeStr, header: 1 });
                    const rowValues: any[] = rowResult ? (rowResult[0] as any[]) : [];

                    const rowObject: any = {};

                    headers.forEach((header, index) => {
                         rowObject[header] = rowValues[index] !== undefined ? rowValues[index] : null;
                    });

                    testCases.push(rowObject);
               }

               // I-store ang resulta sa variable na `readFile`
                readFile = testCases;
          }
          else {
               throw new Error(`No testdata are set`);
          }


          return readFile;
     }

     readPropertyFile() {
          finalpath = path.join(__dirname, '../../src/config/excelConfig.properties');
          console.log(finalpath)
          const property = PropertiesReader(finalpath)
          if (!property) {
               throw new Error('No properties found!');
          }
          return property;

     }

     schemaValidator(file: any, responseBody: any) {
          let ajv = new Ajv();
          const scheme = ajv.compile(file);
          if (scheme(responseBody)) {
               console.log(scheme(responseBody))
               console.info('Success schema validations');
          }
          else {
               console.log(scheme(responseBody))
               console.info('Failed schema validations');
          }
          return scheme(responseBody);
     }

     async printResult(baseURL: any, expectedResCode: any, actualResCode: any, actualResponseText: any, resultForAPI: string) {
          console.log(`\n ------ ${resultForAPI} API Response Details ------ `);
          console.log(`Base URL: ${baseURL}`);
          console.log(`---------------------------------------------------`);
          console.log(`Expected Response Code: ${expectedResCode}`);
          console.log(`Actual Response Code: ${actualResCode}`);
          console.log(`Actual Response: ${actualResponseText}`);
          console.log(`---------------------------------------------------\n`);
     }
}

export default new commonFunctions;