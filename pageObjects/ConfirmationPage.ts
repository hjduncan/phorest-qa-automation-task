import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {

    // Locators
    readonly page: Page

    constructor(page: Page) {
        super(page);
        this.page = page;
    }
}