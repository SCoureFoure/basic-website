import {Page, Locator, expect} from '@playwright/test';

export class TabsElements{
    protected page:Page;
    readonly tabsSection;
    readonly tabOne;
    readonly tabTwo;
    readonly tabThree;
    constructor (page:Page){
        this.page = page;
        this.tabsSection = this.page.$('tabs.section');
        this.tabOne = this.page.getByTestId('tab1');
        this.tabTwo = this.page.getByTestId('tab2');
        this.tabThree = this.page.getByTestId('tab3');
    }
    async switchToTab(tabNumber : 1| 2 | 3 ): Promise<void>{
        const tab = tabNumber = tabNumber === 1 ? this.tabOne:
                 tabNumber === 2 ? this.tabTwo: this.tabThree;
        await tab.click();
        await expect(tab).toHaveClass(/active|selected/);
    }
   async verifyTabSectonIsDisplayed(){
    await expect(this.tabsSection).toBeVisible();
   }
   async verifyTabOneIsDisplayed(){
    await expect(this.tabOne).toBeVisible();
   }
   async moveToTabOneAndVerifyIsDisplayed(){
    await this.switchToTab(1);
    await expect(this.tabOne).toBeVisible();
   }
   async moveToTabTwoAndVerifyIsDsiplayed(){
    await this.switchToTab(2);
    await expect(this.tabTwo).toBeVisible();
   }
   async movetoTabThreeAndverifyIsDisplayed(){
    await this.switchToTab(3);
    await expect(this.tabThree).toBeVisible();
   }
}