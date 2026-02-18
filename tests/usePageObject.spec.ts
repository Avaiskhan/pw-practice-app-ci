import {test, expect} from '@playwright/test'
import { pageManager } from '../page-object/pageManage'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
}) 

test('navigate to form layout', async({page}) =>{
    const pm = new pageManager(page)
    await pm.navigateTo().formsLayoutPage()

})

test('paramitarizated method', async({page})=>{
    
    const pm = new pageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formsLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFromWithCredentialsAndSelectOption(process.env.PW_USERNAME, process.env.PW_PASSWORD, 'Option 1')
    await page.screenshot({path: 'screenshots/formsLayoutPage.png'})
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})