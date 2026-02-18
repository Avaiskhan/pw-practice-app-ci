import { expect} from '@playwright/test'
import {test} from '../testOptions'
import { first } from 'rxjs-compat/operator/first'
import { Value } from 'sass'


test.beforeEach(async({page, autoWait}) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
}) 

// Auto Waits

test('Auto Waiting', async({page}) => {
    const sucessButton = page.locator('.bg-success')
    //const text = await Sucess.textContent()
    //await Sucess.waitFor({state: 'attached'})
    
   //await expect(Sucess).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})

   //await page.waitForSelector('.bg-success')
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
  await page.waitForLoadState('networkidle')
   const text = await sucessButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})