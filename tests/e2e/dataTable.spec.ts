import {test} from '@playwright/test'
import { FormElements } from "../page-objects/formElements";
import { dataTableElements } from '../page-objects/dataTable';

test.describe('Data table section test',() =>{
    let formElements: FormElements;
    let dataElements: dataTableElements;
    test.beforeEach(async({page}) =>{
        formElements = new FormElements(page);
        dataElements = new dataTableElements(page);
        await formElements.goto();
    });
    const newNames = {
        user1 : 'jose',
        user2 : 'manuel',
        user3 : 'pedro'
    }
    const newEmail ={
        user1 : 'something@gmail.com',
        user2 : 'something2@gmail.com',
        user3 : 'something3@gmail.com'
    }

    test.skip('We verify the Data table section',async() =>{
        test.step('Verify Data Table section is displayed', async()=>{
            await dataElements.verifyTableSectionsIsDisplayed();
        });
    
        test.step('Verify the use of edit button on every row',async()=>{
            await dataElements.clickEditButtonandVerifyIsEditable(1,newNames.user1,newEmail.user1);
            await dataElements.clickEditButtonandVerifyIsEditable(2,newNames.user1,newEmail.user1);
            await dataElements.clickEditButtonandVerifyIsEditable(3,newNames.user1,newEmail.user1);
        });
        test.step('Verify the use of all delte buttons',async()=>{
            await dataElements.clickDeleteButtonAndDeleteR(1);
            await dataElements.clickDeleteButtonAndDeleteR(2);
            await dataElements.clickDeleteButtonAndDeleteR(3);
        });
    });
})