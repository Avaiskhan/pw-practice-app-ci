import {test, expect} from '@playwright/test'
import { first } from 'rxjs-compat/operator/first'
import { Value } from 'sass'
import { DialogComponent } from '../src/app/pages/modal-overlays/dialog/dialog.component'

test.beforeEach(async({page}) => {
    await page.goto('/')
}
)


    test('input field',async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
        const inputfield = page.locator('nb-card').filter({hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"})
        await inputfield.fill('test@test.com')
        await inputfield.clear()
        await inputfield.pressSequentially('test2@test.com')
        await expect(inputfield).toHaveValue('test2@test.com')
    })

    test('radio button @smoke',async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
        const usingthegrid = page.locator('nb-card').filter({hasText: "Using the Grid"})
        await usingthegrid.getByRole('radio', {name: "Option 2"}).check({force: true})
        const radioStatus = await usingthegrid.getByRole('radio', {name: "Option 2"}).isChecked()
        await expect(usingthegrid).toHaveScreenshot()
       // expect(radioStatus).toBeTruthy()
        //await usingthegrid.getByRole('radio', {name: "Option 2"}).check({force: true})
        //expect(await usingthegrid.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        //const radioStatus2 = await usingthegrid.getByRole('radio', {name: "Option 2"}).isChecked()
        //expect(await usingthegrid.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })

    test('checkbox @regression',async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
        const allboxs = page.getByRole('checkbox')
        for(const box of await allboxs.all()){
          await box.check({force: true})
          expect(await box.isChecked()).toBeTruthy()
        }
    })

    test('list and dropdown', async({page}) => {
        const list = page.locator('ngx-header nb-select')
        await list.click()
        const optionlist = page.locator('nb-option-list nb-option')
        await expect(optionlist).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionlist.filter({hasText: "Dark"}).click()
        const header = page.locator('ngx-header')
        await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    })

    test('tooltip', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
        
        const tooltipcard = page.locator('nb-card', {hasText: "Tooltip Placements"})
        await tooltipcard.getByRole('button', {name: "Top"}).hover()
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual("This is a tooltip")
    })

test('dialog', async({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1 get the row by any text in this row
    const targetrow = page.getByRole('row', {name: "mdo@gmail.com"})
    await targetrow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('40')
    await page.locator('.nb-checkmark').click()

    //2 get the row based on the value in specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetrowid = page.getByRole('row', {name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetrowid.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetrowid.locator('td').nth(5)).toHaveText('test@test.com')

    //test filter of the table
    const ages = ["20", "30", "40", "200"]

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)

        const allrows = page.locator('tbody tr')

        for (let row of await allrows.all()){
            const cellvalue = await row.locator('td').last().textContent()
            if (age == '200')
            {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellvalue).toEqual(age)
            } 
        }
    }
})

test('date picker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const frompicker = page.getByPlaceholder('Form Picker')
    await frompicker.click()

    await page.locator('nb-calendar-picker').getByText('3', {exact: true}).click()
    await expect(frompicker).toHaveValue('Feb 3, 2026')


})

test('Slider', async({page}) => {
    //update attribute
const tempgauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
await tempgauge.evaluate(node => {
    node.setAttribute('cx', '232.630')
    node.setAttribute('cy', '232.630')
})
await tempgauge.click()
})

