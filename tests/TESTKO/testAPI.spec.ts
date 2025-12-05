import { test, TestInfo } from '@playwright/test'
import api from '../../src/apisClient/apis'
import execute from '../../src/apisClient/excelExecute'
import method from '../../src/utils/apiMethods'
import { envConfig } from '../../src/config/environment'
import commonFunc from '../../src/utils/commonFunctions'
import testScenarios from '../../src/testdata/CreateUser_Scenarios.json'

let id;

test.describe.configure({ mode: 'serial' })


/*
//hooks are inside the group
test.describe('First Group API',{tag:'@regression'},()=>{
     test.beforeEach(async()=>{
        console.log('This is before Each inside a group');
        await method.init(envConfig.baseUrl1);
     })

     test.afterEach(async()=>{
      console.log('This is after Each inside the gorup');
     })

    test('Test Creat user API',async ()=>{
        id = await api.creat_user_API();
    })
    
    test('Test Update User API',async ()=>{  
        await api.getUser(1);
    })
})

test.describe.skip('Second Group API',()=>{
     test.beforeEach(async()=>{
        console.log('This is before Each inside a group');
        await method.init(envConfig.baseUrl1);
     })

     test.afterEach(async()=>{
      console.log('This is after Each inside the gorup');
     })

    test('Second Group Creat user API',async ()=>{
        id = await api.creat_user_API();
    })
    
    test('Second group update User API',async ()=>{  
        await api.getUser(1);
    })
})

test.describe('Third Group API',{tag:'@sanity'},()=>{
     test.beforeEach(async()=>{
        console.log('This is before Each inside a group');
        await method.init(envConfig.baseUrl1);
     })

     test.afterEach(async()=>{
      console.log('This is after Each inside the gorup');
     })

    test.fail('Third group API 1',async ()=>{
        id = await api.creat_user_API();
    })
    
    test.fixme('Third group API 2',async ()=>{  
        await api.getUser(1);
    })
})

test.describe('fourth Group API',{tag:['@sanity','@regression']},()=>{
     test.beforeEach(async()=>{
        console.log('This is before Each inside a group');
        await method.init(envConfig.baseUrl1);
     })

     test.afterEach(async()=>{
      console.log('This is after Each inside the gorup');
     })

    test.fail('Fourth group API 1',async ()=>{
        id = await api.creat_user_API();
    })
    
    test.fixme('Fourth group API 2',async ()=>{  
        await api.getUser(1);
    })
}) */

// data driven 
test.beforeAll(async () => {
    //console.log('This is before Each inside a group');
    await method.init(envConfig.baseUrl1);
})
/*
test.describe('Create Users using data driven(json)',()=>{
    //const create = await commonFunc.readJsonTestdataPath('CreateUser_Scenarios.json');
     let id;
    for(let runcreate of Object.keys(testScenarios ))
    {
        if(runcreate.startsWith('CreateUser')){
            let tcgroup = testScenarios[runcreate];
            for(let ge of tcgroup){
                let tcnumber = Object.keys(ge)[0];
                let sdn = ge[tcnumber];
                test(`${tcnumber}: ${sdn.Scenario}`,async()=>{
                    await test.step(`Create a user`,async()=>{
                         id  = await api.creat_user(sdn.name, sdn.job)
                    })
                    await test.step(`Get Created User and Validate`,async ()=>{
                        await api.getUser2(id,sdn.name,sdn.job)
                    })

                })
            }
        }
        else{
            console.log('TestCases Not Found!')
        }
    }
})

test.describe('Register User using data driven(json)',()=>{
    const create = commonFunc.readJsonTestdataPath('register_login.json');
    for(let runcreate of Object.keys(create))
    {
        if(runcreate.startsWith('SCN')){
            let tcgroup = create[runcreate];
            for(let ge of tcgroup){
                let tcnumber = Object.keys(ge)[0];
                let sdn = ge[tcnumber];
                test(`${tcnumber}: ${sdn.Scenario}`,async()=>
                {
                    let isTrue:boolean;

                    //register step
                    await test.step(`Step1: Register user`,async()=>
                    {
                         isTrue = await api.register(sdn.email,sdn.password)
                    })
                    await test.step(`Step2: Login`,async(testInfo)=>{   
                        testInfo.skip(!isTrue, "User not registered, skip login step");
                        await api.login(sdn.email,sdn.password);
                    })
                })


            }
        }
        else{
            console.log('TestCases Not Found!')
        }
    }
})
*/

test.describe(`Data Driven using excel format`, async () => {
    const read = commonFunc.readPropertyFile();

    // Convert to number explicitly if needed
    const rowStart = parseInt(read.get('Start'), 10);
    const rowEnd = parseInt(read.get('End'), 10);
    const sheetname = read.get('Sheetname');

    console.log(`Sheet Name: ${sheetname}`);
    console.log(`Reading rows from ${rowStart} to ${rowEnd}`);
    let tcData = commonFunc.readJsonTestdataPath('SampleTestData.xlsx', rowStart, rowEnd, sheetname);
    console.log(tcData)
    for (let d of tcData) {
        let tcGroup = d;

            test(`${tcGroup.TestCaseNo}: ${tcGroup.TestCaseName}.`, async () => {
                const step1 = await tcGroup['Step_1'];
                // first need to check the step1 not to be empty
                    if (!step1 || step1.trim() === '') {
                        //throw new Error
                        console.error(`Step_1 is empty for TestCase: ${tcGroup.TestCaseNo}`);
                    }

                //continuation of steps
                for (let i = 1; i <= 16; i++) {
                    const stepKey = `Step_${i}`;
                    const stepAction = await tcGroup[stepKey];

                    if (await stepAction === null || await stepAction.trim() === '' || await stepAction === undefined) {
                        console.log('End of Test Steps');
                        break;
                    }
                    else {
                        await test.step(`${stepKey}: ${stepAction}`, async () => {
                            console.log(`Executing ${stepKey}: ${stepAction}`)
                            await execute.stepExecute(stepAction);
                        })
                    }
                }

            })
    }




})