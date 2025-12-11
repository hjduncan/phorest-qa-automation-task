import { test } from '@playwright/test';
import { VoucherSelectionPage } from '../pageObjects/VoucherSelectionPage';
import { SummaryPage } from '../pageObjects/SummaryPage';
import { ConfirmationPage } from '../pageObjects/ConfirmationPage';

test.describe('Boilerplate Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto('https://gift-cards.phorest.com/salons/demous#');
  });

  test('Test 1 - ', async ({ page }) => {
    const voucherSelectionPage = await VoucherSelectionPage.create(page);
    await voucherSelectionPage.completeVoucherSelection({
        giftCardValue: '200',
        formOption: 'self',
        yourEmail: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
    });
    await voucherSelectionPage.CheckoutButton.click();

    const summaryPage = await SummaryPage.create(page);
    // const confirmationPage = await ConfirmationPage.create(page);
  });

  test('Test 2 - ', async ({ page }) => {
    const voucherSelectionPage = await VoucherSelectionPage.create(page);
    await voucherSelectionPage.completeVoucherSelection({
        giftCardValue: 'custom',
        customValue: '275',
        formOption: 'someoneElse',
        yourEmail: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        recipientEmail: 'recipient@example.com',
        message: 'Happy Birthday!'
    });
    await voucherSelectionPage.CheckoutButton.click();

    const summaryPage = await SummaryPage.create(page);
    // const confirmationPage = await ConfirmationPage.create(page);
  });
});