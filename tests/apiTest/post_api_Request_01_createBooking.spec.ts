/* 
Test: create booking
Request: Post
Request body:static

*/

import { test,expect } from "@playwright/test";
import fs from 'fs';
test("Create post using static body",async ({request})=>{
    const requestBody={
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }
    const response = await request.post("/booking",
      {
        data:requestBody
      }  
    );

    //validate status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);
    
    const responsedBody = await response.json();
    console.log("Response Body",responsedBody);
    //validate response body structure
     
    expect(responsedBody).toHaveProperty("bookingid");
    expect(responsedBody).toHaveProperty("booking");
   
   
    const resbooking = responsedBody.booking;
    Object.keys(resbooking).forEach((element:any) => {
        expect(resbooking).toHaveProperty("firstname");
        expect(resbooking).toHaveProperty("lastname");
        expect(resbooking).toHaveProperty("additionalneeds");

    });

    // validate the object
    expect(responsedBody.booking).toMatchObject(
      {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }
    );
})