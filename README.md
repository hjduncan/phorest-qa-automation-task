# phorest-qa-automation-task

## Setup
npm install

npx playwright install

## View reports
npx playwright show-report

# Run all tests
npx playwright test:

This will run all of your tests on all browsers as configured in the playwright.config file

Tests run in headless mode so no test browser will open as the code is executed

# npx playwright test --ui

This will run all of your tests on all browsers as configured in the playwright.config file

Tests run in UI mode allow you to walk through each step of the test and visually see what was happening before, during and after each step

UI mode also comes with many other features such as the locator picker, watch mode and more

# npx playwright test --headed

This will run all of your tests on all browsers as configured in the playwright.config file

This will give you the ability to visually see how Playwright interacts with the website being tested

It is similar to UI mode though with far fewer features available

# npx playwright test --project webkit/firefox/chromium

This will run all of your tests on a specified browser i.e. Safari/Firefox/Chrome respectively

You can chain these commands to run on multiple browsers like so: npx playwright test --project webkit  --project firefox

# npx playwright test landing-page.spec.ts

This will run a single test file, pass in the name of the test file that you want to run

# Scripts

In the case of this particular project, I have created a script to run a specific suite of e2e tests as specified by the task. Simply execute the following command in the terminal: 

    npm run voucher-purchase-flow-headed

This will execute the e2e spec flow I have developed in headed mode on a Chrome browser so you can watch the tests in action