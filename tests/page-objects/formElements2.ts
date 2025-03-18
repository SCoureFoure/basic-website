import { Page } from "@playwright/test";

export class FormElements {
    protected page: Page;
    // ELEMENTS
    readonly nameInput;
    readonly email;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = this.page.getByTestId("inputUserName");
        this.email = this.page.getByTestId("userEmail");
    }

    private selectors = {
        nameInput : 'inputUserName',
        email : 'userEmail',
        password : 'userPassword',
        age : 'userAge',
        country : 'userCountry',
        genderMale : 'radioGroupMale',
        genderFemale : 'radioGroupFemale',
        genderOther : 'radioGroupOther', 
        interestSports : 'checkboxItemSports',
        interestMusic : 'checkboxItemMusic',
        interestReading : 'checkboxItemReading',
        interestTravel : 'checkboxItemTravel',
        bio : 'userBio',
        birthDate : 'birthDate',
        favoriteColor : 'favoriteColor',
        satisfactionLevel : 'satisfactionLevel',
        submitButton : 'formGroupSubmitButton',
        resetbutton : 'formGroupResetButton',
        formResults : 'formResults',
    }

    get allElementsFromForm (){
        return{
            nameInput : this.page.getByTestId(this.selectors.nameInput),
            email : this.page.getByTestId(this.selectors.email),
            password : this.page.getByTestId(this.selectors.password),
            age : this.page.getByTestId(this.selectors.age),
            country : this.page.getByTestId(this.selectors.country),
            genderFemale: this.page.getByTestId(this.selectors.genderFemale),
            genderMale: this.page.getByTestId(this.selectors.genderMale),
            genderOther: this.page.getByTestId(this.selectors.genderOther),
            interestSports: this.page.getByTestId(this.selectors.interestSports),
            interestMusic: this.page.getByTestId(this.selectors.interestMusic),
            interestReading: this.page.getByTestId(this.selectors.interestReading),
            interestTravel: this.page.getByTestId(this.selectors.interestTravel),
            bio: this.page.getByTestId(this.selectors.bio),
            birthDate: this.page.getByTestId(this.selectors.birthDate),
            favoriteColor: this.page.getByTestId(this.selectors.favoriteColor),
            satisfactionLevel: this.page.getByTestId(this.selectors.satisfactionLevel),
            submitButton: this.page.getByTestId(this.selectors.submitButton),
            resetButton: this.page.getByTestId(this.selectors.resetbutton),
            formResults: this.page.getByTestId(this.selectors.formResults)
        }
    }

    // METHODS
    async goto(){
        await this.page.goto('http://localhost:9000/');
        await this.isLoaded();
    }

    async isLoaded() {
        try {
            // TODO use the element call for the header, not the .locator call directly.
            await this.page.locator('text=Testing Elements Playground').waitFor({state:'visible'})
            return true;
        } catch (error) {
            console.error("Testing Elements Playground did not load:", error);
            return false;
        }
    }

    async fillForm(data: any): Promise<void> {
        const elements = this.allElementsFromForm;
        if (data.name !== undefined) await elements.nameInput.fill(data.name);
        if (data.email !== undefined) await elements.email.fill(data.email);
        if (data.password !== undefined) await elements.password.fill(data.password);
        if (data.age !== undefined) await elements.age.fill(String(data.age));
        if (data.country !== undefined){
            await elements.country.click();
            await elements.country.selectOption('Canada'); // TODO : Hardcoded value
        } else {}
        if (data.bio !== undefined) await elements.bio.fill(data.bio);
        if (data.birthDate !== undefined) await elements.birthDate.fill(data.birthDate);
        if (data.favoriteColor !== undefined){
            await elements.favoriteColor.click();
            await elements.favoriteColor.fill(data.favoriteColor);
        } 

        if (data.satisfactionLevel !== undefined) await elements.satisfactionLevel.fill(String(data.satisfactionLevel));


        // fill gender
        await this.page.locator(`radioGroup${data.gender}`).click(); // TODO This resolves to radioGroupMale, radioGroupOther, radioGroupFemale


        // For each of data.interests(interest) {
        // click await this.page.locator(`interests{data.interest}`).click();
        // }
        if (data.interest && Array.isArray(data.interest)){
            for (const interest of data.interest){
                switch (interest){
                    case 'sports':
                        await elements.interestSports.check();
                        break;
                    case 'music':
                        await elements.interestMusic.check();
                        break;
                    case 'reading':
                        await elements.interestReading.check();
                    case 'travel':
                        await elements.interestTravel.check();
                }
            }
        }
    }

    // UserData == this.FormData
    async getFormResults(): Promise<Record<string, string>> {
        const results: Record<string, string> = {};
        const formResult = this.page.getByTestId(this.selectors.formResults);

        await formResult.waitFor({ state: 'visible' });
        const resultItems = formResult.locator('li');
        const count = await resultItems.count();
        for (let i = 0; i < count; i++) {
          const text = await resultItems.nth(i).textContent() || '';
          const match = text.match(/^(.*?):\s*(.*)$/);
          if (match && match.length >= 3) {
            let key = match[1].trim();
            const value = match[2].trim();
            if (key === 'favColor'){
              results['favoriteColor'] = value;
            } 
            else {
              results[key] = value;
            }
          }
        }        
        return results; // TODO returns an object with the values mapped to the same keys as the userData object we pass into other methods.
    }

    async fillAndSubmitForm(data:any): Promise<void> {
        await this.fillForm(data);
        await this.allElementsFromForm.submitButton.click();
    }

    async resetForm(): Promise<void> {
        await this.allElementsFromForm.resetButton.click();
    }

    async timeOut(){
        return this.page.waitForTimeout(500);
    }

    async verifyFormIsEmpty(): Promise<void> {
        const elements = this.allElementsFromForm;
        // Verificar que todos los campos de texto estén vacíos
        expect(await elements.nameInput.inputValue()).toBe('');
        expect(await elements.email.inputValue()).toBe('');
        expect(await elements.password.inputValue()).toBe('');
        expect(await elements.age.inputValue()).toBe('');
        expect(await elements.bio.inputValue()).toBe('');
        expect(await elements.birthDate.inputValue()).toBe('');
        //expect(await elements.favoriteColor.inputValue()).toBe('');
        const selectedCountry = await elements.country.evaluate((el: HTMLSelectElement) => el.value);
        expect(selectedCountry).toBe('');
        expect(await elements.genderMale.isChecked()).toBe(false);
        expect(await elements.genderFemale.isChecked()).toBe(false);
        expect(await elements.genderOther.isChecked()).toBe(false);
        expect(await elements.interestSports.isChecked()).toBe(false);
        expect(await elements.interestMusic.isChecked()).toBe(false);
        expect(await elements.interestReading.isChecked()).toBe(false);
        expect(await elements.interestTravel.isChecked()).toBe(false);
    }
    
    getCountryCode(countryName: string): string {
        const map: Record<string, string> = {
          'United States': 'us',
          'Canada': 'ca',
          'United Kingdom': 'uk',
          'Australia': 'au'
        };
        return map[countryName] || countryName;
    }

    async verifyFormResults(formElements,inputData,expectFn){
        const formResults = await this.getFormResults();
        
        expectFn(formResults.userName).toBe(inputData.name);
        expectFn(formResults.userEmail).toBe(inputData.email);
        expectFn(formResults.userPassword).toBe(inputData.password);
        expectFn(formResults.userAge).toBe(String(inputData.age));
        expectFn(formResults.gender).toBe(inputData.gender);
        expectFn(formResults.userBio).toBe(inputData.bio);
        expectFn(formResults.birthDate).toBe(inputData.birthDate);
        expectFn(formResults.favoriteColor).toBe(inputData.favoriteColor);
        expectFn(formResults.satisfactionLevel).toBe(String(inputData.satisfactionLevel));
        expectFn(formResults.userCountry).toBe(this.getCountryCode(inputData.country));
    }
}