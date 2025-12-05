import {test} from '@playwright/test';
import method from '../../src/utils/apiMethods';
import { envConfig } from '../../src/config/environment';
import validate from '../../src/utils/validations';
import file from '../../src/utils/readFile';


test.beforeAll(async()=>{
    await method.init(envConfig.baseUrl2);
})
test('Delete Booking',async()=>{
    // create booking
    let res;
    let reqBody;

    reqBody =  await file.readJsonTestdataPath('post_request.json');
    res = await method.post('/booking',{data:reqBody})
    await validate.validateResponseStatus(res,200)
    //get the bookingid
    const getid = await res.json();
    const bookingid = getid.bookingid;
    console.log("====================Create Response================");
    console.log("Booking Id", bookingid);
    console.log("Create Response", getid);
    
    
    //delete
    // generate auth
    console.log("====================Create Token================");
    reqBody = await file.readJsonTestdataPath('token_request_body.json');
    res = await method.post('/auth',{data:reqBody})
    let resBody = await res.json();
    let autToken = resBody.token;
    console.log("Token: ",autToken);
    console.log("Create Token Response: ",res);
    //validation of success creation of token
    await validate.validateResponseStatus(res,200)
    
    console.log("====================Start Delete================");
    let option={
        headers:{
                 Cookie:`token=${autToken}`
                }
    }
    res  = await method.delete(`/booking/${bookingid}`,option);

    console.log({
    status: res.status(),
    statusText: res.statusText(),
    url: res.url(),
    });
    await validate.validateResponseStatus(res,201)

})