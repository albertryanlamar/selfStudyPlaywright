import {test,expect} from '@playwright/test'
import { setTimeout } from 'timers/promises';

test('Autowaiting and forcing',async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');

    //hard assertions
    expect(page).toHaveTitle("");
    expect(page).toHaveURL("");
    expect(page.locator("")).toBeVisible();
    page.waitForTimeout(500);

    //soft assertions
    expect.soft(page).toHaveTitle("");
    expect.soft(page).toHaveURL("");
    expect.soft(page.locator("")).toBeVisible();
    page.waitForTimeout(500);

})