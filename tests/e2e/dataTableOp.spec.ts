import { test } from '@playwright/test';
import { FormElements } from "../page-objects/formElements";
import { dataTableElements } from '../page-objects/dataTable';

test.describe('Data table section test', () => {
  let formElements: FormElements;
  let dataElements: dataTableElements;
  
  // Datos de prueba
  const testUsers = [
    { row: 1, name: 'jose', email: 'something@gmail.com' },
    { row: 2, name: 'manuel', email: 'something2@gmail.com' },
    { row: 3, name: 'pedro', email: 'something3@gmail.com' }
  ];

  test.beforeEach(async ({ page }) => {
    formElements = new FormElements(page);
    dataElements = new dataTableElements(page);
    await formElements.goto();
  });

  test('Complete data table workflow', async () => {

    await test.step('Verify Data Table is displayed',async() =>{
        await dataElements.verifyTableSectionsIsDisplayed();
    })

    await test.step('Verify the use of edit button on every row',async()=>{
        for (const user of testUsers) {
            await dataElements.clickEditButtonandVerifyIsEditable(
              user.row, 
              user.name, 
              user.email
            );
          }
    });
    await test.step('Verify the use of all delte buttons',async()=>{
        for (const user of testUsers) {
            await dataElements.clickDeleteButtonAndDeleteR(user.row);
          }
    });
  });
});