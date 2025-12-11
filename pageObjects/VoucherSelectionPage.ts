import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class VoucherSelectionPage extends BasePage {

    // Locators
    readonly page: Page
    readonly PrimaryLocator: Locator;
    readonly GiftCardValueContainer: Locator;
    readonly GiftCardValueHeader: Locator;
    readonly GiftCardValueOption: Locator;
    readonly GiftCardCustomValueInput: Locator;
    readonly FormContainer: Locator;
    readonly FormOptionHeader: Locator;
    readonly FormYourEmailInputHeader: Locator;
    readonly FormYourEmailInput: Locator;
    readonly FormFirstNameInputHeader: Locator;
    readonly FormFirstNameInput: Locator;
    readonly FormLastNameInputHeader: Locator;
    readonly FormLastNameInput: Locator;
    readonly FormRecipientEmailInputHeader: Locator;
    readonly FormRecipientEmailInput: Locator;
    readonly MessageInputHeader: Locator;
    readonly MessageInput: Locator
    readonly GiftCardSection: Locator;
    readonly GiftCardImage: Locator;
    readonly GiftCardValueDisplay: Locator;
    readonly GiftCardProcessingFeeDisplay: Locator;
    readonly GiftCardTotalCostDisplay: Locator;
    readonly CheckoutButton: Locator;
    readonly ElementsToCheck: { locator: Locator; count: number; expectedText?: string }[];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.PrimaryLocator = page.locator('[data-application-checkout-title="Buy a Gift Card"] [data-controller="checkout"]');
        this.GiftCardValueContainer = this.PrimaryLocator.locator('.container').nth(1).locator('[data-amount-salon-id="demous"]');
        this.GiftCardValueHeader = this.GiftCardValueContainer.locator('span.font-semibold').filter({ hasText: 'Gift Card Value' });
        this.GiftCardValueOption = this.GiftCardValueContainer.locator('ul li');
        this.GiftCardCustomValueInput = this.GiftCardValueContainer.locator('ul li input[data-controller="amount"]');
        this.FormContainer = this.PrimaryLocator.locator('.container').nth(1).locator('[data-controller="email"]');
        this.FormOptionHeader = this.FormContainer.locator('nav a');
        this.FormYourEmailInputHeader = this.FormContainer.locator('.tabs-content .flex.items-end').filter({ hasText: 'Your Email Address' });
        this.FormYourEmailInput = this.FormContainer.locator('.tabs-content input[placeholder="the receipt will be sent here ..."]');
        this.FormFirstNameInputHeader = this.FormContainer.locator('.tabs-content .flex.items-end').filter({ hasText: 'First Name' });
        this.FormFirstNameInput = this.FormContainer.locator('.tabs-content input[placeholder="first name ..."]');
        this.FormLastNameInputHeader = this.FormContainer.locator('.tabs-content .flex.items-end').filter({ hasText: 'Last Name' });
        this.FormLastNameInput = this.FormContainer.locator('.tabs-content input[placeholder="last name ..."]');
        this.FormRecipientEmailInputHeader = this.FormContainer.locator('.tabs-content .flex.items-end').filter({ hasText: 'Recipient Email' });
        this.FormRecipientEmailInput = this.FormContainer.locator('.tabs-content input[placeholder="gift card will be sent here ..."]');
        this.MessageInputHeader = this.FormContainer.locator('.tabs-content .flex.items-end').filter({ hasText: 'Message for Recipient' });
        this.MessageInput = this.FormContainer.locator('.tabs-content input[placeholder="type your message here eg. Hi Mom, Happy Birthday! Love Karen"]');
        this.GiftCardSection = this.PrimaryLocator.locator('.container').nth(0);
        this.GiftCardImage = this.GiftCardSection.locator('svg.voucher');
        this.GiftCardValueDisplay = this.GiftCardSection.locator('.hidden .flex.justify-between').nth(0);
        this.GiftCardProcessingFeeDisplay = this.GiftCardSection.locator('.hidden .flex.justify-between').nth(1);
        this.GiftCardTotalCostDisplay = this.GiftCardSection.locator('.hidden .flex.justify-between').nth(2);
        this.CheckoutButton = this.GiftCardSection.locator('.hidden [data-target="checkout.checkoutButton"]');
        this.ElementsToCheck = [
            { locator: this.GiftCardValueHeader, count: 1, expectedText: 'Gift Card Value' },
            { locator: this.GiftCardValueOption, count: 4 },
            { locator: this.FormOptionHeader.nth(0), count: 1, expectedText: 'Send to me' },
            { locator: this.FormOptionHeader.nth(1), count: 1, expectedText: 'Send to someone else' },
            { locator: this.FormYourEmailInputHeader, count: 1, expectedText: 'Your Email Address' },
            { locator: this.FormFirstNameInputHeader, count: 1, expectedText: 'First Name' },
            { locator: this.FormLastNameInputHeader, count: 1, expectedText: 'Last Name' },
            { locator: this.GiftCardImage, count: 1 },
            { locator: this.GiftCardValueDisplay.locator('span').nth(0), count: 1, expectedText: 'Value of gift voucher' },
            { locator: this.GiftCardValueDisplay.locator('[data-target="checkout.voucherValue"]'), count: 1, expectedText: '$0.00' },
            { locator: this.GiftCardProcessingFeeDisplay.locator('span').nth(0), count: 1, expectedText: 'Processing fee (0%)' },
            { locator: this.GiftCardProcessingFeeDisplay.locator('[data-target="checkout.processingFee"]'), count: 1, expectedText: '$0.00' },
            { locator: this.GiftCardTotalCostDisplay, count: 1 },
            { locator: this.CheckoutButton, count: 1 },
        ]
    }

    static async create(page: Page): Promise<VoucherSelectionPage> {
        const newPage = new VoucherSelectionPage(page);
        await newPage.validateElements(newPage.ElementsToCheck);
        return newPage;
    }
}