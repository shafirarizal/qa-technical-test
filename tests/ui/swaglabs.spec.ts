import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Web UI Automation Scenarios', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.navigate();
    });

    // POSITIVE: End-to-End Purchase
    test('UI_01: End-to-End Purchase Flow', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();
        
        // Click Checkout Button 
        await page.locator('[data-test="checkout"]').click();
        // ------------------------------------------

        await checkoutPage.checkout('Shafira', 'Rizal', '12345');
        await checkoutPage.finishCheckout();
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    // NEGATIVE: Locked Out User
    test('UI_02: Locked Out User Validation', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    // NEGATIVE: Checkout Validation
    test('UI_03: Checkout Form Validation', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();
        await page.locator('[data-test="checkout"]').click();
        
        // Attempt to continue empty
        await checkoutPage.clickContinue();
        
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });

    // EDGE: Cart Persistence (Session Break)
    test('UI_04: Cart Persistence (Session Break)', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart();
        
        // Simulate Session Break: Reload the page
        console.log('Reloading page to test persistence...');
        await page.reload();
        
        // Verify item is still there
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    // EDGE: Navigation Flow (Cancel Checkout)
    test('UI_05: Navigation Flow (Cancel Checkout)', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();
        await page.locator('[data-test="checkout"]').click();
        
        // Click Cancel
        await checkoutPage.clickCancel();
        
        // Verify we are redirected back to Cart URL
        await expect(page).toHaveURL(/.*cart\.html/);
        // Verify item is still in cart
        await expect(page.locator('.cart_item')).toBeVisible();
    });
});