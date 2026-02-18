import { expect} from '@playwright/test'
import { test } from '../testOptions'
import { first } from 'rxjs-compat/operator/first'
import { Value } from 'sass'
import { DialogComponent } from '../src/app/pages/modal-overlays/dialog/dialog.component'


test('drag and drop with i frame', async({page, globalQaURL}) => {
    await page.goto(globalQaURL)
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    //await frame.locator('li', {hasText: "High Tatras 3"}).dragTo(frame.locator('#trash'))
    //await expect(frame.locator('#trash li h5')).toHaveText("High Tatras 3")

    // mouse actions more precise 
    await frame.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()
    await expect(frame.locator('#trash li h5')).toHaveText("High Tatras 4")
})