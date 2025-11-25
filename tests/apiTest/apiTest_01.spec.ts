import {test, expect} from '@playwright/test';
import method from '../../src/utils/apiMethods';
import { envConfig } from '../../src/config/environment';
import assert from '../../src/utils/assert';
import validate from '../../src/utils/validations';

test('Test Get Booking API with path parameters',async(page)=>{
   const bookingId = 49;
   await method.init(envConfig.baseUrl2);
   const res = await method.gets(`/booking/${bookingId}`);

   const istrue:Boolean  = await validate.validateResponseStatus(res,200);
   
   //validate body propert
   if(istrue){
   await validate.validateBodyPropert(res);
   }
})
test('Test Get Booking API with query param',async()=>{
    const params = {
        firstname:"sdsdsd",
        lastname:"Brown"
    }
    await method.init(envConfig.baseUrl2);
    const res = await method.gets(`/booking/`,{params});
    validate.validateResponseStatus(res,200)
})
