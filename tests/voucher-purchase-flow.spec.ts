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
  });
});