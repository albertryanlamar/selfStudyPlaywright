import {test,expect} from '@playwright/test';

class assert{
   async status(res:any,status:number){
         try{
         expect(res.status()).toBe(status);
         }catch(err){
          console.log(`Status Error: ${err}`);
         }
   }
  async bodyProperty(res:any,prop:any){
       const responseBody = await res.json();
       await expect(responseBody).toHaveProperty(prop)
   }
   async bodyResponseOfGet(res,name,job,id){
    const responseBody = await res.json();
    await expect(responseBody.name).toBe(name)
    await expect(responseBody.job).toBe(job)
    await  expect(responseBody.id).toBe(id)

   }
  
}
export default new assert;