import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        // We use a specific item selector to ensure stability
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async verifyPageLoaded() {
        await expect(this.inventoryList).toBeVisible();
    }

    // This is the method that was missing!
    async addItemToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartLink.click();
    }
}