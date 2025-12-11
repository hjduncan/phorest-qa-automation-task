import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SummaryPage extends BasePage {

    // Locators
    readonly page: Page
    readonly PrimaryLocator: Locator;
    readonly SummaryHeader: Locator;
    readonly EditButton: Locator;
    readonly ValueLabel: Locator;
    readonly ValueAmount: Locator;
    readonly ProcessingFeeLabel: Locator;
    readonly ProcessingFeeAmount: Locator;
    readonly TotalCostLabel: Locator;
    readonly TotalCostAmount: Locator;
    readonly ReceiptLabel: Locator;
    readonly ReceiptEmail: Locator;
    readonly RecipientLabel: Locator;
    readonly RecipientEmail: Locator;
    readonly ConfirmationButton: Locator;
    readonly PaymentDetailsSection: Locator;
    readonly PaymentDetailsHeader: Locator;
    readonly PurchaseAgreementContainer: Locator;
    readonly StripePaymentDetailsField: Locator;
    readonly SubmitButton: Locator;
    readonly ElementsToCheck: { locator: Locator; count: number; expectedText?: string }[];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.PrimaryLocator = page.locator('[data-page-title="Summary"] [data-application-checkout-title="Buy a Gift Card"] .container [data-controller="confirm"]');
        this.SummaryHeader = this.PrimaryLocator.locator('h2');
        this.EditButton = this.PrimaryLocator.locator('button').filter({ hasText: 'Edit' });
        this.ValueLabel = this.PrimaryLocator.locator('p').filter({ hasText: 'Value of gift card' });
        this.ValueAmount = this.PrimaryLocator.locator('p#confirm-voucher-value');
        this.ProcessingFeeLabel = this.PrimaryLocator.locator('p').filter({ hasText: 'Processing fee (0%)' });
        this.ProcessingFeeAmount = this.PrimaryLocator.locator('p#confirm-processing-value');
        this.TotalCostLabel = this.PrimaryLocator.locator('p').filter({ hasText: 'Total cost' });
        this.TotalCostAmount = this.PrimaryLocator.locator('p#confirm-total-amount');
        this.ReceiptLabel = this.PrimaryLocator.locator('p').filter({ hasText: 'Send receipt to' });
        this.ReceiptEmail = this.PrimaryLocator.locator('p#confirm-purchaser-email');
        this.RecipientLabel = this.PrimaryLocator.locator('p').filter({ hasText: 'Send gift card to' });
        this.RecipientEmail = this.PrimaryLocator.locator('p#confirm-recipient-email');
        this.ConfirmationButton = this.PrimaryLocator.locator('button[data-action="confirm#confirmAction"]');
        this.PaymentDetailsSection = page.locator('[data-page-title="Checkout"] [data-application-checkout-title="Buy a Gift Card"] [data-controller="checkout"] .container [data-controller="stripe-purchase"]');
        this.PaymentDetailsHeader = this.PaymentDetailsSection.locator('.text-center').nth(0);
        this.PurchaseAgreementContainer = this.PaymentDetailsSection.locator('.text-center').nth(1);
        this.StripePaymentDetailsField = this.PaymentDetailsSection.locator('[data-controller="payment-method-tabs"] #stripe-form input');
        this.SubmitButton = this.PaymentDetailsSection.locator('button[data-action="stripe-purchase#confirmPayment"]');
        this.ElementsToCheck = [
            { locator: this.SummaryHeader, count: 1, expectedText: 'Summary' },
            { locator: this.EditButton, count: 1 },
            { locator: this.ValueLabel, count: 1 },
            { locator: this.ValueAmount, count: 1 },
            { locator: this.ProcessingFeeLabel, count: 1 },
            { locator: this.ProcessingFeeAmount, count: 1 },
            { locator: this.TotalCostLabel, count: 1 },
            { locator: this.TotalCostAmount, count: 1 },
            { locator: this.ReceiptLabel, count: 1 },
            { locator: this.ReceiptEmail, count: 1 },
            { locator: this.RecipientLabel, count: 1 },
            { locator: this.RecipientEmail, count: 1 },
            { locator: this.ConfirmationButton, count: 1 },
        ]
    }

    static async create(page: Page): Promise<SummaryPage> {
        const newPage = new SummaryPage(page);
        await newPage.validateElements(newPage.ElementsToCheck);
        return newPage;
    }

    public async confirmVoucherDetails(details: {
        value: string;
        purchaserEmail: string;
        recipientEmail?: string;
    }){
        const { value, purchaserEmail, recipientEmail } = details;
        const checks = [
            { locator: this.ValueAmount, expected: value },
            { locator: this.ReceiptEmail, expected: purchaserEmail },
            { locator: this.RecipientEmail, expected: recipientEmail || purchaserEmail }
        ];
        for (const check of checks) {
            const text = await check.locator.textContent();
            if (check.locator === this.ValueAmount){
                expect(text?.trim()).toEqual(`$${check.expected}.00`);
            } else {
                expect(text?.trim()).toEqual(check.expected);
            }
        }
        expect(await this.ProcessingFeeAmount.textContent()).toContain('$0.00');
    }
}