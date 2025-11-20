import { envConfig } from "../config/environment";
import{APIRequestContext, request} from "@playwright/test";

class HTTPClient{

    private client:APIRequestContext;

    async init()
    {
       this.client = await request.newContext(
        {
         baseURL: envConfig.baseUrl,
        });
    }
    async get(url:any){
        return await this.client.post(url)
    }
    
}
export default new HTTPClient;