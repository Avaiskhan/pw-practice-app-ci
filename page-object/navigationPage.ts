import {Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase{

    constructor (page: Page){
        super(page)
    }
/**
 * Navigate to forms and click froms layout
 */
    async formsLayoutPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layout').click()
        await this.waitForNumberOfSeconds(2)
    }


}