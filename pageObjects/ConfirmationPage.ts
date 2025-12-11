import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {

    // Locators
    readonly page: Page
    readonly PrimaryLocator: Locator;
    readonly GreenCheckmarkIcon: Locator;
    readonly ConfirmationHeader: Locator
    readonly ConfirmationMessage: Locator;
    readonly GiftCardCodeLabel: Locator;
    readonly GiftCardCodeNumber: Locator;
    readonly GiftCardValueHeader: Locator;
    readonly GiftCardValueAmount: Locator;
    readonly PurchaseValueHeader: Locator;
    readonly PurchaseValueAmount: Locator;
    readonly DoneButton: Locator;
    readonly ElementsToCheck: { locator: Locator; count: number; expectedText?: string }[];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.PrimaryLocator = page.locator('[data-page-title="Purchase Complete"] [data-application-checkout-title="Buy a Gift Card"] [data-controller="success"].container');
        this.GreenCheckmarkIcon = this.PrimaryLocator.locator('svg[data-icon="check-circle"]');
        this.ConfirmationHeader = this.PrimaryLocator.locator('p').nth(0);
        this.ConfirmationMessage = this.PrimaryLocator.locator('p').nth(1);
        this.GiftCardCodeLabel = this.PrimaryLocator.locator('p').nth(2);
        this.GiftCardCodeNumber = this.PrimaryLocator.locator('p[data-controller="stripe-serial"]');
        this.GiftCardValueHeader = this.PrimaryLocator.locator('p').nth(4);
        this.GiftCardValueAmount = this.PrimaryLocator.locator('p').nth(5);
        this.PurchaseValueHeader = this.PrimaryLocator.locator('p').nth(6);
        this.PurchaseValueAmount = this.PrimaryLocator.locator('p').nth(7);
        this.DoneButton = this.PrimaryLocator.locator('button[data-action="application#doneAction"]');
        this.ElementsToCheck = [
            { locator: this.GreenCheckmarkIcon, count: 1 },
            { locator: this.ConfirmationHeader, count: 1, expectedText: 'Payment accepted, thank you!' },
            { locator: this.ConfirmationMessage, count: 1 , expectedText: ' Your gift card has been sent.  We\'ve also sent you a receipt.' }, 
            { locator: this.GiftCardCodeLabel, count: 1, expectedText: 'Your gift card code is:' },
            { locator: this.GiftCardCodeNumber, count: 1 },
            { locator: this.GiftCardValueHeader, count: 1, expectedText: 'Your gift card value is:' },
            { locator: this.GiftCardValueAmount, count: 1 },
            { locator: this.PurchaseValueHeader, count: 1, expectedText: 'Your purchase total was:' },
            { locator: this.PurchaseValueAmount, count: 1 },
            { locator: this.DoneButton, count: 1 },
        ]
    }

    static async create(page: Page): Promise<ConfirmationPage> {
        const newPage = new ConfirmationPage(page);
        await newPage.validateElements(newPage.ElementsToCheck);
        return newPage;
    }
}