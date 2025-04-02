import { Page, Locator, expect } from "@playwright/test"
import { Dialog } from "puppeteer";

export class dataTableElements{
    protected page: Page;
    readonly dataTable
    readonly table: Map<number,{editBtn:Locator,deleteBtn:Locator,nameEdit:Locator,emailEdit:Locator,saveBtn:Locator, name:Locator, email:Locator}>
   
    constructor(page: Page) {
        this.page = page;
        this.dataTable = this.page.getByTestId('dataTable');
    
        this.table = new Map([
          [1, {
            editBtn: this.page.getByTestId('editBtn1'),
            deleteBtn: this.page.getByTestId('deleteBtn1'),
            nameEdit : this.page.locator('//input[@class="edit-name"]'),
            emailEdit : this.page.locator('//input[@class="edit-email"]'),
            saveBtn : this.page.getByText('Save'),
            name : this.page.getByTestId('name1'),
            email : this.page.getByTestId('email1')
          }],
          [2, {
            editBtn: this.page.getByTestId('editBtn2'),
            deleteBtn: this.page.getByTestId('deleteBtn2'),
            nameEdit : this.page.locator('//input[@class="edit-name"]'),
            emailEdit : this.page.locator('//input[@class="edit-email"]'),
            saveBtn : this.page.getByText('Save'),
            name : this.page.getByTestId('name2'),
            email : this.page.getByTestId('email2')
          }],
          [3, {
            editBtn: this.page.getByTestId('editBtn3'),
            deleteBtn: this.page.getByTestId('deleteBtn3'),
            nameEdit : this.page.locator('//input[@class="edit-name"]'),
            emailEdit : this.page.locator('//input[@class="edit-email"]'),
            saveBtn : this.page.getByText('Save'),
            name : this.page.getByTestId('name3'),
            email : this.page.getByTestId('email3')
          }]
        ]);
    }
    async verifyTableSectionsIsDisplayed(){
        await expect(this.dataTable).toBeVisible();
    }
    async clickEditButtonandVerifyIsEditable(rowNumber:number, newName:string, newEmail:string ): Promise <void>{
        const row = this.table.get(rowNumber);
        if (row){
            await row.editBtn.click();
            await expect(row.saveBtn).toBeVisible();
            await row.nameEdit.click();
            await row.nameEdit.fill(newName);
            await row.emailEdit.click();
            await row.emailEdit.fill(newEmail);
            await row.saveBtn.click();
            await this.page.waitForTimeout(5000);
            await expect(row.name).toHaveText(newName);
            await expect(row.email).toHaveText(newEmail);
        }else{
            throw new Error(`Row ${rowNumber} not found in table`);
        }
    } 
    async clickDeleteButtonAndDeleteR(rowNumber: number): Promise<void>{
        const row = this.table.get(rowNumber);
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept(); // Aceptar el diálogo
        });  
        if (row){
            await row.deleteBtn.click();
            await expect (row.name).not.toBeVisible();
        } else{
            throw new Error(`Row ${rowNumber} not found in table`);
        }    
    }

}