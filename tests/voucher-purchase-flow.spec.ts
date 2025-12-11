import { test } from '@playwright/test';
import { VoucherSelectionPage } from '../pageObjects/VoucherSelectionPage';

test.describe('Boilerplate Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    
  });

  test('Test 1 - ', async ({ page }) => {
    const voucherSelectionPage = new VoucherSelectionPage(page);
  });
});