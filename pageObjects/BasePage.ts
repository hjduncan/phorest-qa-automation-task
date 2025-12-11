import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    // Locators
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    protected async validateElements(elementsToCheck: { locator: Locator; count: number; expectedText?: string }[]) {
        // @ts-ignore
        const domObjects = elementsToCheck.map((element) => element.locator['_selector']);
        // Wait for all elements to be present in the DOM
        for (const selector of domObjects) {
            await this.page.waitForSelector(selector);
        }
        for (const { locator, count, expectedText } of elementsToCheck) {
            // Validate count
            const actualCount = await locator.count();
            // Assert the count matches the expected count
            expect(actualCount).toEqual(count);

            // Handle different validation methods dynamically
            if (expectedText) {
                const actualText = await locator.textContent();
                expect(actualText?.trim()).toContain(expectedText?.trim());
            }
        }
    }

    protected async safeFill(field: Locator, contents: string) {
        let fieldContent = '';
        while (fieldContent != contents) {
            await field.clear();
            await field.fill(contents);
            fieldContent = await field.inputValue();
        }
    }

    protected async safePressSequential(field: Locator, contents: string) {
        let fieldContent = '';
        while (fieldContent != contents) {
            await field.clear();
            await field.pressSequentially(contents);
            fieldContent = await field.inputValue();
        }
    }
}