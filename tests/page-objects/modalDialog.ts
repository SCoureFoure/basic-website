import { Page, Locator, expect } from "@playwright/test";

export class modalDialogElements{
    protected page: Page;
    readonly modalSection : Locator;
    readonly modalBtn : Locator;
    constructor(page:Page){
        this.page = page;
        this.modalSection = this.page.getByTestId('modalSection');
        this.modalBtn = this.page.getByTestId('opemModalBtn');
    }
    async verifyModalSectionIsDisplayed(){
        await expect(this.modalSection).toBeVisible();
    }
    async handleModalSection(){
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept(); // Aceptar el diálogo
        });
        await expect(this.modalBtn).toBeVisible();
        await this.modalBtn.click();
    }
}