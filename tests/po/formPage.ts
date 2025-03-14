import { Page, Locator} from '@playwright/test'

export class FormPage {
    readonly page : Page;
    readonly nameInput : Locator;
    readonly email : Locator;
    readonly password: Locator;
    readonly age: Locator;
    readonly country: Locator;
    readonly genderMale : Locator;
    readonly genderFemale : Locator;
    readonly genderOther : Locator;
    readonly checkboxSports : Locator;
    readonly checkboxMusic : Locator;
    readonly checkboxReading : Locator;
    readonly checkboxtraveling: Locator;
    readonly userBio: Locator;
    readonly birthDay: Locator;
    readonly favoriteColor: Locator;
    readonly satisfactionLevel : Locator;
    readonly submit: Locator;
    readonly retry: Locator;



    constructor(page:Page){
        this.page = page;
        this.nameInput = page.locator('data-testid="inputUserName"');
        this.email = page.locator('data-testid="userEmail"');
        this.password = page.locator('data-testid="userPassword"');
        this.age = page.locator('data-testid="userAge"');
        this.country = page.locator('data-testid="userCountry"');
        


    }



    async goto(){
        await this.page.goto('http://localhost:9000/');
    }
}

