import {test,expect} from '@playwright/test'
// we have default set in playwright config fully parallel: false(),true(parallel execution of test)
/* 
to group test
1.describe
 syntax: test.describe('',()=>{})
*/

test('Test1', async ()=>{
   console.log('this is test 1')
})

test('Test2', async ()=>{
   console.log('this is test 2')
})

test('Test3', async ()=>{
   console.log('this is test 3')
})

test('Test4', async ()=>{
   console.log('this is test 4')
})

// using describe to group test

test.describe('Group1',async()=>{
   test('Test 1',async()=>{
      console.log(" Test 1 belong to group1")
   })
   test('Test 2',async()=>{
      console.log(" Test 2 belong to group1")
   })
})

test.describe('Group 2',async()=>{
   test('Test 3',async()=>{
      console.log(" Test 3 belong to group2")
   })
   test('Test 4',async()=>{
      console.log(" Test 4 belong to group2")
   })
})

/* 
 To run the specific group, 
 in terminal: npx playwright test <file> --grep <groupname>
note: if the groupname is having space inclose it to "" or single quote
*/ 
