import {test,expect, chromium} from '@playwright/test';
import { FormElements } from '../page-objects/formElements';


test.describe('Form Elements Page', () => {
    let formElements: FormElements;
    test.beforeEach(async({ page }) => {
      formElements = new FormElements(page);  // Correctd class name
      await formElements.goto();
    });
    const userData = {
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPassword: 'securePassword123',
        userAge: 30,
        userCountry: 'Canada',
        gender: 'male',
        interests: {
          sports: true,
          reading: true,
          music: false,
          travel: false
          },
        userBio: 'This is my biography',
        birthDate: '1999-10-11',
        favColor: '#0000ff',
        satisfactionLevel: 5
      };
      test('Fill and submit form', async () => {
        await test.step('We fill the elements on the page', async () => {
          await formElements.fillAndSubmitForm(userData);
          await formElements.getFormValues();
        });
        await test.step('We compare the Userdata object with the information displayed',async() => {
          const formData2 = await formElements.getFormValues();
          //Needed to normalize the data before comparison
          expect (formData2).toMatchObject({ //corrected comparison
            userEmail: userData.userEmail,
            userBio: userData.userBio,
            gender: userData.gender,
            birthDate: userData.birthDate,
            favColor: userData.favColor
          });
          //expect(userData).toEqual(await formElements.formResults) // TODO switch this to this format.
        });
        await test.step('We reset the form', async () => {
          await formElements.resetForm();
        });
        await test.step('Verify all teh fields are cleared after reset',async() => {
          await formElements.verifyFormIsEmpty();
        })
        //notes: the reset button does clear all the entrys except for the color submit
        //canada shows as ca, uk, us, au
        //satisfaction level does not get reset with the reset button
      });
})
