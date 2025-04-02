import {test} from '@playwright/test'
import { FormElements } from '../page-objects/formElements'
import { modalDialogElements } from '../page-objects/modalDialog';


test.describe('Modal DIalog',()=>{
    let formElements: FormElements;
    let modalDialog: modalDialogElements;
    test.beforeEach(async({page})=>{
        formElements = new FormElements(page);
        modalDialog = new modalDialogElements(page);
        await formElements.goto();
    })

    test('Modal Dialog section test',async() =>{
        await test.step('verify the modal dialog section is displayed',async()=>{
            await modalDialog.verifyModalSectionIsDisplayed();
        })

        await test.step('Verify the opetions parts is working as expected',async() =>{
            await modalDialog.handleModalSection();
        })
    })
})