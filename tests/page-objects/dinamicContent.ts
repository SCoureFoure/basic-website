import { Page, Locator, expect } from "@playwright/test";

export class dinamicContentElements{
    protected page: Page;
    readonly dynamicSection : Locator;
    readonly addNewItemSection : Locator;
    readonly addNewItemBtn : Locator;
    readonly dynamicList : Locator;
    constructor(page:Page){
        this.page = page;
        this.dynamicSection = this.page.getByTestId('dynamic-section');
        this.addNewItemBtn = this.page.getByTestId('addNewItemButton');
        this.addNewItemSection = this.page.getByTestId('addNewItemSection');
        this.dynamicList = this.page.getByTestId('dynamicList');
    }
    async verifyThedynamiccontentSectionIsDisplayed(){
        await expect(this.dynamicSection).toBeVisible()
    }
    async verifyTheContentIsThere(initialContent: {text: string}[]): Promise<void>{
        const allItems = this.dynamicList.locator('li');
        const expectedText = initialContent.map(item => item.text);
        await expect(allItems).toHaveText(expectedText);
        
    }
    async addNewContentToTheList(content : string): Promise<void>{
        await this.addNewItemSection.fill(content);
        await this.addNewItemBtn.click();
        await this.page.waitForTimeout(5000);
    }
    async getItemCount(): Promise<number> {
        const items = this.dynamicList.locator('li');
        return await items.count();
    }
    
}