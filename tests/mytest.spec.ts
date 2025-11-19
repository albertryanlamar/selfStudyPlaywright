import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

    // fixture -global variable
    test("Verify page title",async ({page})=>{
        await page.goto("http://www.automationpractice.pl/index.php")

        let ti = await page.title();
        console.log(ti);
        await expect(page).toHaveTitle("My Shop"); 

    })
      test("Verify page url",async ({page})=>{
        await page.goto("http://www.automationpractice.pl/index.php")

        let url:string = await page.url();
        console.log(url);
        await expect(page).toHaveURL(url);

    })
   

