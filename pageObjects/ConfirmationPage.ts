import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {

    // Locators
    readonly page: Page
    readonly PrimaryLocator: Locator;
    readonly ElementsToCheck: { locator: Locator; count: number; expectedText?: string }[];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.PrimaryLocator
        this.ElementsToCheck = [
            {}
        ]
    }

    static async create(page: Page): Promise<ConfirmationPage> {
        const newPage = new ConfirmationPage(page);
        await newPage.validateElements(newPage.ElementsToCheck);
        return newPage;
    }
}