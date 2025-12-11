import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    // Locators
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    protected async validateElements(elementsToCheck: { locator: Locator; count: number; expectedText?: string }[]) {
        // Wait for all elements to be attached to the DOM concurrently
        await Promise.all(elementsToCheck.map(e => e.locator.first().waitFor()));

        for (const { locator, count, expectedText } of elementsToCheck) {
            // Validate count
            const actualCount = await locator.count();
            expect(actualCount).toEqual(count);

            // Validate text if provided
            if (expectedText) {
                const texts = await locator.allTextContents();
                // Check that at least one element contains the expected text
                const hasExpectedText = texts.some(text => text.trim().includes(expectedText.trim()));
                expect(hasExpectedText).toBe(true);
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