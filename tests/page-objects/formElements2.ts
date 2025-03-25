import { Page,Locator,expect} from '@playwright/test'

export class FormElements{
    protected page:Page;
    //Elements
    readonly nameInput;
    readonly email;
    readonly password;
    readonly age;
    readonly country;
    readonly genderMale;
    readonly genderFemale;
    readonly genderOther;
    readonly intrestSports;
    readonly interestMusic;
    readonly interestReading;
    readonly interestTravel;
    readonly bio;
    readonly birthDate;
    readonly favoriteColor;
    readonly satisfactionLevel;
    readonly submitButton;
    readonly resetButton;
    readonly formResults;
    constructor (page:Page){
        this.page = page;
        //corrected eliminated extra steps
        this.nameInput = this.page.getByTestId('inputUserName');
        this.email = this.page.getByTestId('userEmail');
        this.password = this.page.getByTestId('userPassword');
        this.age = this.page.getByTestId('userAge');
        this.country = this.page.getByTestId('userCountry');
        this.genderMale = this.page.getByTestId('radioGroupMale');
        this.genderFemale = this.page.getByTestId('radioGroupFemale');
        this.genderOther = this.page.getByTestId('radioGroupOther');
        this.intrestSports = this.page.getByTestId('checkboxItemSports');
        this.interestMusic = this.page.getByTestId('checkboxItemMusic');
        this.interestReading = this.page.getByTestId('checkboxItemReading');
        this.interestTravel = this.page.getByTestId('checkboxItemTravel');
        this.bio = this.page.getByTestId('userBio');
        this.birthDate = this.page.getByTestId('birthDate');
        this.favoriteColor = this.page.getByTestId('favoriteColor');
        this.satisfactionLevel = this.page.getByTestId('satisfactionLevel');
        this.submitButton = this.page.getByTestId('formGroupSubmitButton');
        this.resetButton = this.page.getByTestId('formGroupResetButton');
        this.formResults = this.page.getByTestId('formResults');
    }
    async isLoaded() {
        try {
            await this.page.getByRole('heading',{name: 'Testing Elements Playground'}).waitFor({state:'visible'})
            return true; //correctet from locator to header
        } catch (error) {
            console.error("Testing Elements Playground did not load:", error);
            return false;
        }
    }
    async goto(){
        await this.page.goto('http://localhost:9000/');
        await this.isLoaded();
    }
    async fillForm(userData: any): Promise<void> {userData
        if (userData.userName !== undefined) await this.nameInput.fill(userData.userName);
        if (userData.userEmail !== undefined) await this.email.fill(userData.userEmail);
        if (userData.userPassword !== undefined) await this.password.fill(userData.userPassword);
        if (userData.userAge !== undefined) await this.age.fill(String(userData.userAge));
        if (userData.userCountry !== undefined){ //corrected hardcoded ca
            await this.country.click();
            await this.country.selectOption(userData.userCountry);
        } else {}
        if (userData.userBio !== undefined) await this.bio.fill(userData.userBio);
        if (userData.birthDate !== undefined) await this.birthDate.fill(userData.birthDate);
        if (userData.favColor !== undefined){
            await this.favoriteColor.click();
            await this.favoriteColor.fill(userData.favColor);
        } 
        if (userData.satisfactionLevel !== undefined) await this.satisfactionLevel.fill(String(userData.satisfactionLevel));
        if (userData.gender) {
            switch (userData.gender) {
              case 'male':
                await this.genderMale.check();
                break;
              case 'female':
                await this.genderFemale.check();
                break;
              case 'other':
                await this.genderOther.check();
                break;
            }
          }
        if (userData.interests && typeof userData.interests === 'object' && !Array.isArray(userData.interests)){
            await this.intrestSports.uncheck().catch(() => {});
            await this.interestMusic.uncheck().catch(() => {});
            await this.interestReading.uncheck().catch(() => {});
            await this.interestTravel.uncheck().catch(() => {});
            if (userData.interests.sports) {
                await this.intrestSports.check();
              }
              if (userData.interests.music) {
                await this.interestMusic.check();
              }
              if (userData.interests.reading) {
                await this.interestReading.check();
              }
              if (userData.interests.travel) {
                await this.interestTravel.check();
              }
        }
    }
    async fillAndSubmitForm(userData:any): Promise<void> {
        await this.fillForm(userData);
        await this.page.waitForTimeout(5000); //debug pourpuses
        await this.submitButton.click(); 
        await this.page.waitForTimeout(5000); //debug pourpuses
    }
    async resetForm(): Promise<void> {
        await this.resetButton.click();
    }
    async verifyFormIsEmpty(): Promise<void> {
        expect(await this.nameInput.inputValue()).toBe('');
        expect(await this.email.inputValue()).toBe('');
        expect(await this.password.inputValue()).toBe('');
        expect(await this.age.inputValue()).toBe('');
        expect(await this.bio.inputValue()).toBe('');
        expect(await this.birthDate.inputValue()).toBe('');
        //expect(await elements.favoriteColor.inputValue()).toBe('');
        const selectedCountry = await this.country.evaluate((el: HTMLSelectElement) => el.value);
        expect(selectedCountry).toBe('');
        expect(await this.genderMale.isChecked()).toBe(false);
        expect(await this.genderFemale.isChecked()).toBe(false);
        expect(await this.genderOther.isChecked()).toBe(false);
        expect(await this.intrestSports.isChecked()).toBe(false);
        expect(await this.interestMusic.isChecked()).toBe(false);
        expect(await this.interestReading.isChecked()).toBe(false);
        expect(await this.interestTravel.isChecked()).toBe(false);
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
    async getFormValues (){ //we now save it on a json object
        await this.page.waitForSelector('#formResult h3:has-text("Form Submission:")');
        const formData2 = await this.page.evaluate(() => {
            const items = document.querySelectorAll('#formResult ul li');
            const result = {};
        
            items.forEach(item => {
              const strongEl = item.querySelector('strong');
              const field = strongEl?.textContent?.replace(':', '') || '';
              const fullText = item.textContent || '';
              const value = fullText.substring(fullText.indexOf(':') + 1).trim();

              if (field in result){
                if (!Array.isArray(result[field])){
                    result[field] = [result[field]];
                }
                result[field].push(value);
              }else{
                result[field] = value;
              }
            });        
            return result;
          });
          return formData2;
    }
}
