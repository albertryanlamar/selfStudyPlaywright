import method from '../../src/utils/apiMethods'
import commonFunc from '../../src/utils/commonFunctions'
import validate from '../../src/utils/validations'
import {apikey} from '../../src/utils/constant'
import { test, expect } from 'playwright/test'

class API{
      // Create User API
    async creat_user(name:string,job:string){
        //let reqBody;
        let res;
        let getID;
        console.log('============= Start of Create User ================')
        //reqBody = await commonFunc.readJsonTestdataPath('req_postRequest.json');
        let body={
            name:name,
            job:job
        }
        res =  await method.post('api/users',{data:body,headers:{"x-api-key":apikey}});
        let response = await res.json();
        getID = response.id;
        let resText = await res.text();

        if(res.status()=== 201){
            console.log('Create User APi Success',res.status());
            commonFunc.printResult(res.url(),201,res.status(),resText,'creat_user_API')
            validate.validateResponseStatus(res,201)
       }
       else{
        console.log('Create User APi Failed',res);
        commonFunc.printResult(res.url(),201,res.status(),resText,'creat_user_API')
        validate.validateResponseStatus(res, res.status())
       }
      
       return getID;
    }
    // Create User API
    async creat_user_API(reqBody){
        //let reqBody;
        let res;
        let getID;
        console.log('============= Start of Create User ================')
        //reqBody = await commonFunc.readJsonTestdataPath('req_postRequest.json');
        res =  await method.post('api/users',{data:reqBody,headers:{"x-api-key":apikey}});
        let response = await res.json();
        getID = response.id;
        let resText = await res.text();

        if(res.status()=== 201){
            console.log('Create User APi Success',res.status());
            commonFunc.printResult(res.url(),201,res.status(),resText,'creat_user_API')
            validate.validateResponseStatus(res,201)
       }
       else{
        console.log('Create User APi Failed',res);
        commonFunc.printResult(res.url(),201,res.status(),resText,'creat_user_API')
        validate.validateResponseStatus(res, res.status())
       }
      
       return getID;
    }

    // get User API
    async getUser(id:any){
        console.log('============= Start of Get User ================')
        const res = await method.gets(`/api/users/${id}`,{headers:{"x-api-key":apikey}})
        let restex = await res.text();

        if(res.status()===200){
            console.log('Get User APi Success',res.status());
            commonFunc.printResult(res.url(),200,res.status(),restex,'Get_user_API')
            validate.validateResponseStatus(res,200)
       }
       else{
        console.log('GEt User APi Failed',res.status());
        commonFunc.printResult(res.url(),500,res.status(),restex,'Get_user_API')
        //validate.validateResponseStatus(res, res.status())
       }
    }

        async getUser2(id:any, name:string, job:string){
        console.log('============= Start of Get User ================')
        const res = await method.gets(`/api/users/${id}`,{headers:{"x-api-key":apikey}})
        let restex = await res.text();

        if(await res.status()===200){
            console.log('Get User APi Success',res.status());
            await commonFunc.printResult(res.url(),200,res.status(),restex,'Get_user_API')
            await validate.validateResponseStatus(res,200)
            await validate.validateResponseBody(res,name,job,id)
       }
       else{
        console.log('GEt User APi Failed',res.status());
         await commonFunc.printResult(res.url(),500,res.status(),restex,'Get_user_API')
         await validate.validateResponseStatus(res, 500)
       }
    }

    async register(email,password){
        let reqbody={
            email:email,
            password:password
        }
        console.log('============= Start of Register User ================')
        const res  = await method.post(`/api/register`,{data:reqbody,headers:{"x-api-key":apikey}});
        let resTex = await res.text();
        if(res.status()===200){
            console.log('Register User APi Success',res.status());
            await commonFunc.printResult(res.url(),200,res.status(),resTex,'Register API')
            validate.validateResponseStatus(res,200);
            return true;
       }
       else{
        console.log('Register User APi  Failed',res.status());
        await commonFunc.printResult(res.url(),res.status(),res.status(),resTex,'Register API')
 
       }
       return false;
    }

    async login(email:string,password:string){
        let bodyreq={
            email:email,
            password:password
        }
        console.log('============= Start of Login User ================')
        const res = await method.post(`/api/login`,{data:bodyreq,headers:{"x-api-key":apikey}});
        let resText = await res.text();
        if(res.status()===200){
           console.log(`Login API Success: ${res.status()}`);
           await commonFunc.printResult(res.url(),200,res.status(),resText,`Login API`);
           validate.validateResponseStatus(res,200);
        }
        else{
           console.log(`Login API Failed: ${res.status()}`);
           await commonFunc.printResult(res.url(),res.status(),res.status(),resText,`Login API`)
           validate.validateResponseStatus(res,res.status());
        }
    }

}

export default new API;

