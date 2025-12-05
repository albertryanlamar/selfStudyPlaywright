import {test,expect} from '@playwright/test'

/* 
    hooks
    1. beforeEach = run before each test
        if you have 4 test it will run 4 times also
       synatax: test.beforeEach(async()=>{
                })
    2. afterEach = run after each test
        if you have 4 test it will run 4 times after test
    3. beforeAll = run at once
       syntax: test.beforeAll(async()=>{
       })
*/
/*
test.beforeEach('',async()=>{
   console.log('this is before each');
}) */

/*
test.afterEach(async()=>{
    console.log('This is after each');
}) */

test.beforeAll('',async()=>{
   console.log('this is before All');
})

test.afterAll(async ()=>{
   console.log('This is after all');
})

console.log('======================Testing before each============')
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