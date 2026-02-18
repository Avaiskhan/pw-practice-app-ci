import {test, expect} from '@playwright/test'
import { first } from 'rxjs-compat/operator/first'
import { Value } from 'sass'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
}) 


test('Locators',async({page}) => {
    
    //by t
    page.locator('input')

    //by id
    page.locator('#inputEmail1')

    // by class value
    page.locator('.input-full-width')

    // by placeholder
    page.locator('[placeholder="Email"]')

    //by class value full
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //by different selectors
    await page.locator('input[placeholder="Email"]#inputEmail1')

    // by partial match
    await page.locator(':text("Using")')

    // by exact match
    await page.locator(':text-is("Using the Grid")')
})

test('user locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    //await page.getByRole('button', {name: "Sign In"}).click()

    await page.getByTestId('Sign In').click()
})

test('child element',async({page}) => {
    await page.locator('nb-card nb-checkbox :text-is("Check me out") ').click()
})

test('parent locator', async({page}) =>{
    await page.locator('nb-card', {hasText: 'Using the Grid'}).locator('#inputEmail1').click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).filter({hasText:'Basic form'})
    .getByRole('textbox',{name: "password"}).click()
})

// reusing locators

test('resuing locators',async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailFiled = basicForm.getByRole('textbox',{name: "Email"})
    const passwordFiled = basicForm.getByRole('textbox',{name: "Password"})
    const buttonField = basicForm.getByRole('button', {name: "Submit"})
    
    await emailFiled.fill('text@test.com')
    await passwordFiled.fill('Welcome123')
    await buttonField.click()
})

// extracting values

test('extracting values',async({page}) => {

    //Input value
    const usingGrid = page.locator('nb-card').filter({hasText: "Using the Grid"})
    const inputField =  usingGrid.getByRole('textbox', {name: "Email"})
    await inputField.fill('test@test.com')
    const inputValue = await inputField.inputValue()
    expect (inputValue).toEqual('test@test.com')

    //all text values
    const allRadio = await page.locator('nb-radio').allTextContents()
    expect(allRadio).toContain("Option 1")

    // single value
    const buttonText = await usingGrid.locator('button').textContent()
    expect (buttonText).toEqual("Sign in")

    const Place = await inputField.getAttribute('placeholder')
    expect(Place).toEqual("Email1")
})

// Assertions

test('Assertions',async({page}) => {
    //General Assertion
    const usingGrid = page.locator('nb-card').filter({hasText: "Using the Grid"}).locator('button')
     const buttonText = await usingGrid.textContent()
    expect(buttonText).toEqual('Sign in')

    //Locator Assertion
    await expect(usingGrid).toHaveText('Sign in')

    //soft assertion
    await expect.soft(usingGrid).toHaveText('Sign in')
    await usingGrid.click()
})

