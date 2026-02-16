import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly backpackAddToCartButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async verifyPageLoaded() {
        await expect(this.pageTitle).toHaveText('Products');
    }

    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }

    async goToCart() {
        await this.cartLink.click();
    }
}