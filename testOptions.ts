import {test as base} from '@playwright/test'

export type TestOptions = {
    globalQaURL: string
    autoWait: string
    USERNAME: string
    PASSOWRD: string
}

export const test = base.extend<TestOptions>({
    globalQaURL: ['', {option: true}],
    autoWait: ['', {option: true}]
})