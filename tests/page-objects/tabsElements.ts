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
    async tabSectionIsDisplayed (){
        await expect(this.tabsSection).toBeVisible();
    }
    async tabOneIsDisplayed(){
        await expect(this.tabOne).toBeVisible();
    }
    async moveToTab1AndverifyIsDisplayed (){
        await this.tabOne.click();
        await expect(this.tabOne).toBeVisible();
    }
    async moveToTab2AndverifyIsDisplayed (){
        await this.tabTwo.click();
        await expect(this.tabTwo).toBeVisible();
    }
    async moveToTab3AndverifyIsDisplayed (){
        await this.tabThree.click();
        await expect(this.tabThree).toBeVisible();
    }
}