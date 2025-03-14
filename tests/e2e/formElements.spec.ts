import {test,expect} from '@playwright/test';
import { FormElements } from '../page-objects/formElements';

test.describe('Form Elements Page', () => {
    let formElements : FormElements;

    test.beforeEach(async({ page}) => {
        formElements = new FormElements(page);
        await formElements.goto();

        // Create a Form Data object to enter into the form fields and check against the form verification
    defaultFieldData = {firstName: 'bob'}
    });

    test('Fill the Form Elements on the page', async() => {
        // FormTextField Fill
            // Enter the Name
            // Enter the Email
            // Enter the password
            // Enter the age
        formElements.fillTextFields(defaultFieldData)

        // Select the Country from dropdown

        // Select Radio Buttons
        // and Checkboxes

        // Fill the Bio

        // Choose a birthday

        // Favorite Color selector

        // Submit Results
    });

    test('Clicking submit generates the Form data on the bottom of the page', async() => {
        // Check form data against the generated form data
        formElements.verifyFormDataSubmission(defaultFieldData)
    });

    test('Verify the form fields and results are cleared when reset is selected', async() => {
        expect(formElements.fieldsEmpty).toBe(True);
    });
})