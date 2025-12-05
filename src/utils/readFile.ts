import { error } from 'console';
import {testdataBasepath} from './constant'
import * as fs from "fs";
import path from "path";
import { errors } from '@playwright/test';
import ajv, { Ajv } from 'ajv';



class readFile{

     readJsonTestdataPath(jsonFile:any){
      const finalpath = path.join(testdataBasepath,jsonFile);
      if(!fs.existsSync(finalpath)){
           throw new Error(`Testdata file not found ${finalpath}`);
      }
         const readfile = JSON.parse(fs.readFileSync(finalpath,'utf-8')); 
         return readfile;
     }

     schemaValidator(file:any,responseBody:any){
          let ajv = new Ajv();   
          const scheme= ajv.compile(file);
          if(scheme(responseBody)){
               console.log(scheme(responseBody))
               console.info('Success schema validations');
          }
          else{
           console.log(scheme(responseBody))
           console.info('Failed schema validations');
          }
          return scheme(responseBody);
     }

}
export default new readFile;