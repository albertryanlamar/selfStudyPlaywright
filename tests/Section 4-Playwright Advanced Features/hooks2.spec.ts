import {test} from '@playwright/test'
import method from '../../src/utils/apiMethods'
import { envConfig } from '../../src/config/environment'
import commonFunc from '../../src/utils/commonFunctions'
import validation from '../../src/utils/validations'

let responsbody;
let apiKey={
        "x-api-key": "reqres-free-v1"
        }
test.describe('Reqres API Group',()=>{
    test.beforeAll(async()=>{
        await method.init(envConfig.baseUrl1)
    })
    test.afterAll(async()=>{
        await method.tearDown();
    })
    test('Create API',async ()=>{
        let reqBody = await commonFunc.readJsonTestdataPath('req_postRequest.json');
        console.log("Request body",reqBody);
        responsbody = await method.post('api/users',{data:reqBody,headers:apiKey})
        let getResponse = await responsbody.json();
        console.log('REsponse of API:', getResponse );
        validation.validateResponseStatus(responsbody,201)
        const id = getResponse.id;
        console.log('ID', id);
    })

})