import { url } from "inspector";
import { envConfig } from "../config/environment";
import{APIRequestContext, APIResponse,request} from "@playwright/test";
import { head } from "axios";


export class apiMethods{

    private client:APIRequestContext;

    async init(base:any)
    {    
        if (!this.client) {
            this.client = await request.newContext({
                baseURL:base, // use default if no base provided
            });
            console.log("Initialized baseURL:", envConfig.baseUrl2);
        }
        else{
            console.error("❌ Initialized baseURL not set");
        }
    }
    
    // method for get
    async gets(url:string,options:{headers?:Record<any,any>,params?:Record<any,any>}={}){
        return await this.client.get(url,options);
    }

    //method for post
    async post(url:string, options:{data?:any,headers?:any,params?:any}={}){
         return await this.client.post(url,options);
    }

    // method for update
    async update(url:string,options:{data?:any,headers?:any,params?:any}={}){
        return await this.client.put(url,options);
    }
    async delete(url:string,options:{data?:any,headers?:any,params?:any}={}){
        return await this.client.delete(url,options);
    }
    
}
export default new apiMethods();
