import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Swag Labs - End to End Purchase Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await checkoutPage.verifyCartItem('Sauce Labs Backpack');
    await checkoutPage.proceedToCheckout('Test', 'User', '12345');
    await checkoutPage.completePurchase();
    await checkoutPage.verifyOrderSuccess();
});