import {test} from '@playwright/test'
import { FormElements } from '../page-objects/formElements'
import { asyncOpsElements } from '../page-objects/asyncOPS'

test.describe('Async Operations section test',()=>{
    let formElements: FormElements;
    let asyncOps: asyncOpsElements;
    test.beforeEach(async({page})=>{
        formElements = new FormElements(page);
        asyncOps = new asyncOpsElements(page);
        await formElements.goto();
    })

    test('Async operations section test',async() =>{
        await test.step('verify the async operation is displayed',async()=>{
            await asyncOps.validateAsyncOperatiosIsDsiaplyed();
        })

        await test.step('Verify the opetions parts is working as expected',async() =>{
            await asyncOps.validateLoadButonAndVerifyDataIsDisplayedAfterClick();
        })
    })
})