/* 
1. create a booking (post)
2. update booking(put) - required booking id, token
*/

import {test} from '@playwright/test';
import method from '../../src/utils/apiMethods';
import { envConfig } from '../../src/config/environment';
import validate from '../../src/utils/validations';
import filer from '../../src/utils/readFile';
import { head } from 'axios';

test.beforeAll(async ()=>{
await method.init(envConfig.baseUrl2);
})

test('Update Booking (Put)',async ()=>{
    let res:any;
    //create a booking
     const bodyreq = await filer.readJsonTestdataPath("post_request.json");
     res = await method.post('/booking',{data:bodyreq});
     //validation of status
     await validate.validateResponseStatus(res,200)
     const resbody = await res.json();
     const bookingid = resbody.bookingid;
     console.log("Booking Id:",bookingid);
    //====================================================================

    // 2. Update booking
       // Perform token creation
    const reqToken = await filer.readJsonTestdataPath("token_request_body.json");
    res = await method.post('/auth',{data:reqToken});
    //validation of response
    await validate.validateResponseStatus(res,200)
    //extarct tokenresponsebody
    const getToken = await res.json();
    const tokeBody = getToken.token;
    console.log("Token Id:",tokeBody);
    // perform update ()put
     const reqBody = await filer.readJsonTestdataPath("put_request_body.json");
     const reWrap = {
        data:reqBody,
        headers:{
                 "Cookie":`token=${tokeBody}`,
                 "Content-Type":"application/json"
                }
     }
     console.log("data:",reWrap);
    res = await method.update(`/booking/${bookingid}`,reWrap);
     //validation of response
     await validate.validateResponseStatus(res,200)
    // validation of propter
    let parseRes = res.json();
    await validate.validateBodyPropert(res);
     console.log("Booking updated succssfully");
});