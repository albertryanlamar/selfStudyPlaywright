import {test,expect} from '@playwright/test'
import { setTimeout } from 'timers/promises';

test('Autowaiting and forcing',async({page})=>{
    test.setTimeout(60000);
    test.slow();
    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('#small-searchterms').fill("Laptop",{force:true})
    await page.locator('input.button-1.search-box-button').click({force:true});

    await page.waitForTimeout(20000);

    //auto retry assertions
    await expect(page).toHaveURL("");
    // auto retry:waits for the elment to be visible and have the expected text
    await expect(page.locator("sample")).toBeVisible({timeout:60});
    await expect(page.locator("sample")).toHaveText("");
     //non retrying assertion(executes imedietly, no retry)\
     await expect((await page.title()).includes("")).toBeTruthy();
     // negating matcher(applicable for bothe auto retrying and non retrying assertsions)
     expect(page.locator('')).not.toBeVisible(); 
     await page.waitForTimeout(5000);
})