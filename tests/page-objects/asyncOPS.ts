import { Page,expect,Locator } from "@playwright/test";

export class asyncOpsElements{
    protected page:Page;
    readonly asyncOps
    readonly loadDataBtn: Locator;
    readonly asyncResults : Locator;
    constructor(page:Page){
        this.page = page;
        this.asyncOps = this.page.getByTestId('async-operations');
        this.loadDataBtn = this.page.getByTestId('LoadDataBtn');
        this.asyncResults = this.page.getByTestId('asyncResult');
    }

    async validateAsyncOperatiosIsDsiaplyed(){
        await expect(this.asyncOps).toBeVisible();
    }

    async validateLoadButonAndVerifyDataIsDisplayedAfterClick(){
        await expect(this.loadDataBtn).toBeVisible();
        await expect(this.asyncResults).toHaveText('Async data will appear here...');
        await this.loadDataBtn.click();
        await expect(this.asyncResults).not.toHaveText('Async data will appear here...')
    }
}