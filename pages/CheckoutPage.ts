import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successHeader: Locator;
    readonly cartItemName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successHeader = page.locator('[data-test="complete-header"]');
        this.cartItemName = page.locator('.inventory_item_name');
    }

    async verifyCartItem(itemName: string) {
        await expect(this.cartItemName).toHaveText(itemName);
    }

    async proceedToCheckout(fName: string, lName: string, zip: string) {
        await this.checkoutButton.click();
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.postalCode.fill(zip);
        await this.continueButton.click();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async verifyOrderSuccess() {
        await expect(this.successHeader).toHaveText('Thank you for your order!');
    }
}