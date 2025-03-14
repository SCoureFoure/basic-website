import {test,expect} from '@playwright/test';
import { FormPage } from '../po/formPage';

test.describe('Form test', () => {
    let formPage : FormPage;

    test.beforeEach(async({ page}) => {
        formPage = new FormPage(page);
        await formPage.goto(); 
    });

    test('This test is to submit a form with all the fields correctly filled', async() => {

    });

})