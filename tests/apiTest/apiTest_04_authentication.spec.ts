import {test} from '@playwright/test';
import method from '../../src/utils/apiMethods'
import { envConfig } from '../../src/config/environment';
import validations from '../../src/utils/validations';
import { assert } from 'console';


test.beforeAll(async()=>{
 await method.init(envConfig.baseurl3);
})

test('public api no auth',async ()=>{
    let res;
    res = await method.gets('/posts/1');
    await validations.validateResponseStatus(res,200);
})

// basic auth
/*
test('Basic Auth',async ()=>{
    let res;

    res = await method.gets('/user/pass',{headers:{
        Authorization: "Basic "+Buffer.from(`user:pass`).toString(`base64`)
    }});
    validations.validateResponseStatus(res,200);
    
    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
}) */

test('Bearer Token',async ()=>{
   // const token= "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";
    const res = await method.gets(`https://api.github.com/user/repos`,{
        headers:{
                Authorization:`Bearer ${token}`
                }
    });
    validations.validateResponseStatus(res,200)

})

test('API Key Authentication',async()=>{
    
})
