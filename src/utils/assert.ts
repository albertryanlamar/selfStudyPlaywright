import {expect} from '@playwright/test';

class assert{
   async status(res:any,status:number){
       await expect(res.status()).toEqual(status);
       await expect(res.ok()).toBeTruthy();
   }
  async bodyProperty(res:any,prop:any){
       const responseBody = await res.json();
       await expect(responseBody).toHaveProperty(prop)
   }
}
export default new assert;