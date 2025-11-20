/* 
Test: create booking
Request: Post
Request body:static

*/

import { faker } from "@faker-js/faker";
import { test,expect } from "@playwright/test";
import { DateTime } from "luxon";

import fs from 'fs';

test("Create post using static body",async ({request})=>{


  const requestBody = {
    "firstname" : faker.person.firstName,
    "lastname" : faker.person.lastName,
    "totalprice" : faker.number.int({min:100,max:200}),
    "depositpaid" : faker.datatype.boolean(),
    "bookingdates" : {
        "checkin" : DateTime.now().toFormat("yyyy-MM-dd"),
        "checkout" : DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")
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
        "firstname" : requestBody.firstname,
        "lastname" : requestBody.lastname,
        "totalprice" : requestBody.totalprice,
        "depositpaid" : requestBody.depositpaid,
        "additionalneeds" : requestBody.additionalneeds
    }
    );
})