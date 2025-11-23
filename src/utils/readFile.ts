import {testdataBasepath} from './constant'
import * as fs from "fs";
import path from "path";



class readFile{

     readJsonTestdataPath(jsonFile:any){
      const finalpath = path.join(testdataBasepath,jsonFile);
      const readfile = JSON.parse(fs.readFileSync(finalpath,'utf-8'));
      return readfile
     }

}
export default new readFile;