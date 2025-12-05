import { Console } from 'console';
import api from './apis'


let data;
let name;
let job;
let id;

class apisxcel{


     async stepExecute(stepAction:any){
        if(await stepAction.startsWith('create')){
            data = await stepAction.split('_');
            name  = await data[1];
            job = await data[2];
            id =  await api.creat_user(name,job);
        }
        else if(await stepAction.startsWith('validateCreate')){;
            await api.getUser2(id,name,job);
        }
        else{
            console.log(`Step action not found!:${stepAction}`)
        }

     }


}

export default new apisxcel;
