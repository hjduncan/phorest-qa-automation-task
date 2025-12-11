import { expect, test } from '@playwright/test';
import { VoucherSelectionPage } from '../pageObjects/VoucherSelectionPage';
import { SummaryPage } from '../pageObjects/SummaryPage';
import { ConfirmationPage } from '../pageObjects/ConfirmationPage';

test.describe('Boilerplate Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto('https://gift-cards.phorest.com/salons/demous#');
  });

  test('Test 1 - Preset Value, Self Recipient', async ({ page }) => {
    const voucherSelectionPage = await VoucherSelectionPage.create(page);
    const voucherDetails = {
        giftCardValue: '200' as const,
        formOption: 'self' as const,
        yourEmail: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
    }
    await voucherSelectionPage.completeVoucherSelection(voucherDetails);
    await voucherSelectionPage.CheckoutButton.click();

    const summaryPage = await SummaryPage.create(page);
    await summaryPage.confirmVoucherDetails({
        value: voucherDetails.giftCardValue,
        purchaserEmail: voucherDetails.yourEmail,
        recipientEmail: voucherDetails.yourEmail
    });
    await summaryPage.ConfirmationButton.click();
    await summaryPage.enterPaymentDetails({
        cardNumber: '4111111111111111',
        expiryDate: '12/26',
        cvc: '999'
    });
    await summaryPage.SubmitButton.click();
    const confirmationPage = await ConfirmationPage.create(page);
    await confirmationPage.confirmPurchaseDetails(voucherDetails.giftCardValue);
    await confirmationPage.DoneButton.click();
    expect(page.url()).toBe('https://gift-cards.phorest.com/salons/demous');
  });

  test('Test 2 - Custom Value, Someone Else Recipient', async ({ page }) => {
    const voucherSelectionPage = await VoucherSelectionPage.create(page);
    const voucherDetails = {
        giftCardValue: 'custom' as const,
        customValue: '275',
        formOption: 'someoneElse' as const,
        yourEmail: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        recipientEmail: 'recipient@example.com',
        message: 'Happy Birthday!'
    }
    await voucherSelectionPage.completeVoucherSelection(voucherDetails);
    await voucherSelectionPage.CheckoutButton.click();

    const summaryPage = await SummaryPage.create(page);
    await summaryPage.confirmVoucherDetails({
        value: voucherDetails.customValue,
        purchaserEmail: voucherDetails.yourEmail,
        recipientEmail: voucherDetails.recipientEmail
    });
    await summaryPage.ConfirmationButton.click();
    await summaryPage.enterPaymentDetails({
        cardNumber: '4111111111111111',
        expiryDate: '12/26',
        cvc: '999'
    });
    await summaryPage.SubmitButton.click();
    const confirmationPage = await ConfirmationPage.create(page);
    await confirmationPage.confirmPurchaseDetails(voucherDetails.customValue);
    await confirmationPage.DoneButton.click();
    expect(page.url()).toBe('https://gift-cards.phorest.com/salons/demous');
  });
});