import {Page, Locator, expect} from '@playwright/test';

export class TabsElements {
    protected page: Page;
    readonly tabsSection: Locator;
    readonly tabs: Map<number, Locator>; // Map que asocia numeros(123) con los localizadores de cada pestana
    constructor(page: Page) {
        this.page = page;
        this.tabsSection = this.page.getByTestId('tabs-section');
        this.tabs = new Map([ // este es el mapa, cada clave es un numero y los valores son localizadores de tab
            [1, this.page.getByTestId('tab1')],
            [2, this.page.getByTestId('tab2')],
            [3, this.page.getByTestId('tab3')]
          ]);
    }
    async switchToTab(tabNumber: number): Promise<void> {
        const tab = this.tabs.get(tabNumber); 
        // tomamos el tabnumer y es enumero lo revisamos en el mapa que lo guardamos en this.tab, por que en el anterior dijimos que tabNumber es numero y que el mapa se compone de un numero y un locator que declaramos en la linea 6
        // cuando tenemos este dato lo guardamos en la variable de tab para luego jugar con ella
        //comprueba si el tab es nulo
        if (!tab) {
            throw new Error(`Tab ${tabNumber} is not defined`);
        }
        await tab.click();
        await expect(tab).toHaveClass(/active|selected/);
    }
    async verifyTabSectionIsDisplayed(): Promise<void> {
        const section = await this.tabsSection;
        if (section) {
            await expect(section).toBeVisible();
        } else {
            throw new Error('Tab section not found');
        }
    }
    async verifyTabIsDisplayed(tabNumber: number): Promise<void> {
        const tab = this.tabs.get(tabNumber);
        if (!tab) {
            throw new Error(`Tab ${tabNumber} is not defined`);
        }
        await expect(tab).toBeVisible();
    }
    async moveToTabAndVerifyIsDisplayed(tabNumber: number): Promise<void> {
        await this.switchToTab(tabNumber);
        await this.verifyTabIsDisplayed(tabNumber);
    }
}