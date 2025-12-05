import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import assert from '../../src/utils/assert';
import { expect } from 'playwright/test';

class validations{

    async validateBodyPropert(res:any){
       //validate body propert
       await assert.bodyProperty(res,"firstname");
       await  assert.bodyProperty(res,"lastname");
       await assert.bodyProperty(res,"totalprice");
   }

   async validateResponseBody(res,name:string, job:string, id:number){
      await assert.bodyResponseOfGet(res,name,job,id)
   }

   async validateResponseStatus(res:any,stat:number)
   {    
         await assert.status(res,stat) 
   }


   
   async validateSchema(res:any){
      await expect(res).toBeTruthy();
   }

}

export default new validations;