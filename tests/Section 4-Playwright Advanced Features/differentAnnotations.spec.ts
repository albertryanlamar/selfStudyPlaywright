import { test } from '@playwright/test'
import { BlobOptions } from 'buffer';
/* 
 Kinds of annotations in  plywright
 1. only
 2. skip
 3. fail
 4. fixme
 5. slow
*/

//npx playwright test <testfile> --grep "(?=*@sanity)(?=*@regression))"

/*
// use only annotations
test.only('Test Only', async () => {
    console.log("This is test only annotations");
})

test('Test 2', async () => {
    console.log("This is test 2");
})

// use only annotations inside the group
test.describe('sdsds', async () => {
    test.only('Test Only inside group', async () => {
        console.log("This is test only annotations inside group");
    })

    test('Test 2 insdie group', async () => {
        console.log("This is test 2");
    })
})
 let ssd = "oks";
// skip annotations
 test.skip('',async()=>{

 })
test.only('Test Skip', async () => {
    test.skip(ssd === "ok","thsssssssssssssssssssssssssssss");
    console.log("This is tests skip");
})

*/
//  3. fail
test.fail();
test.fixme();
