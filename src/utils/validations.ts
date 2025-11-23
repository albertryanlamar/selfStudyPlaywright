import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import assert from '../../src/utils/assert';

class validations{

    validateBodyPropert(res:any){
       //validate body propert
       assert.bodyProperty(res,"firstname");
       assert.bodyProperty(res,"lastname");
       assert.bodyProperty(res,"totalprice");
   }
   validateResponseStatus(res:any,stat:number)
   {
        if(stat == 200){
            assert.status(res,200);
            return true;
        }
        if(stat ===201){
            assert.status(res,201);
        }
        
   }

}

export default new validations;