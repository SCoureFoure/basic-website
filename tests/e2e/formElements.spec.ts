import {test,expect, chromium} from '@playwright/test';
import { FormElements } from '../page-objects/formElements2';

test.describe('Form Elements Page', () => {
    let formElements: FormElements;
    test.beforeEach(async({ page }) => {
      formElements = new FormElements(page);
      await formElements.goto();
    });
    const userData = {
        userName: 'John Doe',
        userEmail: 'john@example.com',
        password: 'securePassword123',
        age: 30,
        country: 'Canada',
        gender: 'male',
        interests: ['sports', 'reading'],
        bio: 'This is my biography',
        birthDate: '1999-10-11',
        favoriteColor: '#0000ff',
        satisfactionLevel: 5
      };

      test('Fill and submit form', async () => {
        await test.step('We fill the elements on the page', async () => {
          await formElements.fillAndSubmitForm(userData);
        });
        await test.step('We compare the userData object with the information displayed',async() => {
          expect(userData).toEqual(await formElements.formResults) // TODO switch this to this format.
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
