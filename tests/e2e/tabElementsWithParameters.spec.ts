import {test, expect} from "@playwright/test";
import { FormElements } from "../page-objects/formElements";
import { TabsElements } from "../page-objects/tabElementsParametisado";


test.describe('Tab section test', () => {
    let tabsElements: TabsElements;
    let formElements: FormElements;

    test.beforeEach(async({ page }) => {
        tabsElements = new TabsElements(page);
        formElements = new FormElements(page);
        await formElements.goto();
    });
    test('Verify tab section with parametetrs', async() => {
        // Definir los números de tab que queremos probar
        const tabsToTest = [1, 2, 3, 1]; // El último 1 es para volver a la primera tab
        await test.step('Verify tab ection is visble', async() => {
            await tabsElements.verifyTabSectionIsDisplayed();
        });
        // Verificar la primera tab inicialmente
        await test.step(`Verify that tba 1 is displayed at the begining`, async() => {
            await tabsElements.verifyTabIsDisplayed(1);
        });
        // Iterar por todas las tabs definidas
        for (const tabNumber of tabsToTest.slice(1)) { // Empezamos desde el segundo elemento por que ya verificamos el tab 1, convertimos 
           await test.step(`Move to tab ${tabNumber} and verify is visible`, async() => {
                await tabsElements.moveToTabAndVerifyIsDisplayed(tabNumber);
            });
        }
    });
});