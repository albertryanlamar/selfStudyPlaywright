import { error } from 'console';
import {testdataBasepath} from './constant'
import * as fs from "fs";
import path from "path";
import { errors } from '@playwright/test';



class readFile{

     readJsonTestdataPath(jsonFile:any){
      const finalpath = path.join(testdataBasepath,jsonFile);
      if(!fs.existsSync(finalpath)){
           throw new error(`Testdata file not found ${finalpath}`);
      }
         const readfile = JSON.parse(fs.readFileSync(finalpath,'utf-8')); 
         return readfile;
     }

}
export default new readFile;