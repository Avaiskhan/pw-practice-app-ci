import { Page, expect } from "@playwright/test";
import {NavigationPage} from '../page-object/navigationPage'
import { formsLayoutPage } from '../page-object/formLayoutsPage'

export class pageManager{

    private readonly page: Page
    private readonly NavigationPage: NavigationPage
    private readonly formslayoutPage: formsLayoutPage

    constructor(page: Page) {
        this.page = page
        this.NavigationPage = new NavigationPage(this.page)
        this.formslayoutPage = new formsLayoutPage(this.page)
    }

    navigateTo(){
        return this.NavigationPage
    }

    onFormLayoutsPage(){
        return this.formslayoutPage
    }


}