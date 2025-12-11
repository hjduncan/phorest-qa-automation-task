import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class VoucherSelectionPage extends BasePage {

    // Locators
    readonly page: Page
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
    }
}