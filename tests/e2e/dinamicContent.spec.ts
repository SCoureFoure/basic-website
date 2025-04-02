import {test, expect} from '@playwright/test'
import { FormElements } from '../page-objects/formElements'
import { dinamicContentElements } from '../page-objects/dinamicContent';


test.describe('Dinamic content section test',()=>{
    let formElements: FormElements;
    let dinamicContent: dinamicContentElements;
    test.beforeEach(async({page})=>{
        formElements = new FormElements(page);
        dinamicContent = new dinamicContentElements(page);
        await formElements.goto();
    })
    const initialContent= [
        {text : 'Initial item 1'},
        {text : 'Initial item 2'},
    ]
    const contentToAdd = [
        {text: 'item3'},
        {text: 'item4'},
        {text: 'item5'}
    ]
    const fullList = [
        {text : 'Initial item 1'},
        {text : 'Initial item 2'},
        {text : 'item3'},
        {text : 'item4'},
        {text : 'item5'}
    ]
    let itemCount : number;
    let itemCount2 : number;

    test('Dinamic content section test',async() =>{
        await test.step('Dinamic operations is displayed',async()=>{
            await dinamicContent.verifyThedynamiccontentSectionIsDisplayed();
        })
        await test.step('Verify the initial content is there as expected',async() =>{
            
            await dinamicContent.verifyTheContentIsThere(initialContent);
            
            itemCount = await dinamicContent.getItemCount();
            console.log(itemCount);
        })
        await test.step('Submit new items to the list',async()=>{
            for (const newContent of contentToAdd){
                await dinamicContent.addNewContentToTheList(newContent.text);
            }
            itemCount2 = await dinamicContent.getItemCount();
        })
        await test.step('Verify the content is added',async() =>{
            const numberOfNewItems = contentToAdd.length;
            await expect(itemCount + numberOfNewItems).toBe(itemCount2);
            await dinamicContent.verifyTheContentIsThere(fullList);
        })


    })
})