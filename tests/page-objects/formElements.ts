import { Page, Locator} from '@playwright/test'

export class FormElements {
    readonly page : Page;
    readonly nameInput : Locator;
    readonly email : Locator;
    readonly password: Locator;
    readonly age: Locator;
    readonly country: Locator;

    constructor(page:Page){
        this.page = page;
        this.nameInput = page.locator('data-testid="inputUserName"');
        this.email = page.locator('data-testid="userEmail"');
        this.password = page.locator('data-testid="userPassword"');
        this.age = page.locator('data-testid="userAge"');
        this.country = page.locator('data-testid="userCountry"');
        


    }

    async isLoaded() {
        try {
            await Promise.all([
              this.page.locator('Testing Elements Playground')
            ]);
            return true;
        } catch (error) {
            console.error("Testing Elements Playground did not load:", error);
            return false;
        }
    }

    async goto(){
        await this.page.goto('http://localhost:9000/');
        await this.isLoaded();
    }

    // fieldData {
    // firstName: '',
    // blah bhalhba}
    async fillTextFields(fieldData = Object = {}) {

    }
}

