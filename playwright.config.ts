import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import type { TestOptions } from './testOptions';


require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  //globalTimeout: 60000,

  expect: {
    timeout: 2000
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [['allure-playwright']],
//[['html']],

  
  use: {
    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV == '1' ? 'http://localhost:4201/'
          : process.env.STAGGING == '1' ? 'http://localhost:4202/'
          :'http://localhost:4200/',
    
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'retain-on-failure',
      size: {width:1920, height: 1080}
    }
},

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
       baseURL: 'http://localhost:4201/'
      },
    },
    {
      name: 'stagging',
      use: { 
        ...devices['Desktop Chrome'],
       baseURL: 'http://localhost:4202/'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },
  ],

  //webServer: {
  //  command: 'npm run start',
  //  url:'http://localhost:4200/'
  //}
});
