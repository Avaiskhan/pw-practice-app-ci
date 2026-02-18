import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class formsLayoutPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }
    /**
     * 
     * @param email 
     * @param password 
     * @param optiontext 
     */
        async submitUsingTheGridFromWithCredentialsAndSelectOption(email: string, password: string, optiontext:string) {
        const usingTheGrid = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGrid.getByRole('textbox', {name:"Email"}).fill(email)
        await usingTheGrid.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGrid.getByRole('radio', {name: optiontext}).check({force: true})
        await usingTheGrid.getByRole('button').click()
    }
     
        async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: Boolean) {
        const inLineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inLineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if (rememberMe)
            await inLineForm.getByRole('checkbox').check({force: true})
        await inLineForm.getByRole('button').click()   
        }
}