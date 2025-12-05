import {test} from '@playwright/test';
import ajv, { Ajv } from 'ajv';
import method from '../../src/utils/apiMethods'
import { envConfig } from '../../src/config/environment';
import reader from '../../src/utils/readFile'
import validation from '../../src/utils/validations';
import { isSymbolObject } from 'node:util/types';
/* 
  pre re: install ajv
  npm install --save-dev playwright ajv
  ajv is used for schema validation
*/

test.beforeAll(async()=>{
   await method.init(envConfig.baseurl3);
})
test('Validate Schema',async()=>{
    let res;
    res = await method.gets('https://mocktarget.apigee.net/json');
    const responseBody = await res.json();
    console.log("Response:",responseBody);
    const schemaValidation = await reader.readJsonTestdataPath('schema.json')
    console.log("Schema:",schemaValidation);
    
    const ad = await reader.schemaValidator(schemaValidation,responseBody);
    await validation.validateSchema(ad)
})

test('Test Schema2',async ()=>{
    console.log("==============Start of test2====================");
    let responseBody;
    responseBody = await method.gets('https://jsonplaceholder.typicode.com/posts/1');
    const jsonResponse = await responseBody.json();
    console.log("Response Body", jsonResponse);
    const schema = await reader.readJsonTestdataPath('schema2.json');
    const ad  = await reader.schemaValidator(schema,jsonResponse);
    await validation.validateSchema(ad);

})



