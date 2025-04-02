import {test,expect} from "@playwright/test"

import { FormElements } from "../page-objects/formElements";
import { TabsElements } from "../page-objects/tabElementsSwitch";

test.describe('Tab section test', () => {
    let tabsElements: TabsElements;
    let formElements: FormElements; // try to reuse code
        test.beforeEach(async({ page }) => {
          tabsElements = new TabsElements(page);
          formElements = new FormElements(page);  // Correctd class name
          await formElements.goto();
        });
     test.skip('We are going to verify the entire Tabs section', async() => {
        test.step('we verify the tab section is displayer', async() =>{
            await tabsElements.verifyTabSectonIsDisplayed();
        })
        test.step('We verify the fisrt tab is displayed', async() =>{
            await tabsElements.verifyTabOneIsDisplayed();
        })
        test.step('We move to the second tab amd verify is is displayed', async() =>{
            await tabsElements.moveToTabTwoAndVerifyIsDsiplayed();
        })
        test.step('We move to the third tab amd verify is is displayed', async() =>{
            await tabsElements.movetoTabThreeAndverifyIsDisplayed();
        })
        test.step('We move back to the first tab amd verify is is displayed', async() =>{
            await tabsElements.moveToTabOneAndVerifyIsDisplayed();
        })                                                                                                       
     })
})