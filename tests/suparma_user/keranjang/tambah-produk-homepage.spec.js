const { test, expect } = require('@playwright/test');
const { loginUser } = require('../../helpers/loginUser');

test.describe('Fitur Tambah Keranjang dari Homepage', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange: Login sebelum setiap test case
        await loginUser(page);
    });

    test('User berhasil menambahkan produk dari Promo Spesial ke keranjang', async ({ page }) => {
        // 1. Scroll ke section Promo Spesial
        const promoSection = page.locator('h1:has-text("Promo Spesial")');
        await promoSection.scrollIntoViewIfNeeded();
        await expect(promoSection).toBeVisible();

        // 2. Pilih salah satu produk dari Promo Spesial (produk pertama)
        const selectedProduct = page.locator('.list-product .product-card').first();
        await expect(selectedProduct).toBeVisible({ timeout: 10000 });

        // 3. Ambil nama produk untuk validasi akhir
        const productName = await selectedProduct.locator('h1').first().textContent();

        // 4. Klik produk untuk masuk ke halaman detail
        await selectedProduct.click();
        await expect(page).toHaveURL(/detail|produk/i, { timeout: 10000 });

        // 5. Klik tombol Tambah Keranjang
        const addToCartButton = page.getByRole('button', { name: /Keranjang|Tambah/i });
        await expect(addToCartButton).toBeVisible({ timeout: 10000 });
        await addToCartButton.click();

        // 6. Handle jika muncul modal popup setelah produk ditambahkan ke keranjang
        try {
            const modal = page.locator('.modal-content');
            await modal.waitFor({ state: 'visible', timeout: 3000 });
            if (await modal.isVisible()) {
                const closeButton = modal.locator('button[aria-label="Close"], button.close, button:has-text("×"), button:has-text("Close")').first();
                await closeButton.click();
            }
        } catch (error) {
            // Jika modal tidak muncul, proses test akan tetap lanjut
        }

        // 7. Verifikasi toast/pesan sukses muncul
        const successToast = page.locator('text=/berhasil|ditambahkan ke keranjang/i');
        await expect(successToast).toBeVisible({ timeout: 15000 });

        // 8. Navigasi ke halaman keranjang untuk memastikan produk benar-benar masuk
        await page.goto('https://suparma.venturo.pro/keranjang');
        const cartProduct = page.locator('.cart-item, .product-cart');
        await expect(cartProduct).toContainText(productName || '', { timeout: 10000 });
    });

    test('User berhasil menambahkan produk dari Produk Terlaris ke keranjang', async ({ page }) => {
        // 1. Scroll ke section Produk Terlaris
        const bestSellerSection = page.locator('h1:has-text("Produk Terlaris")');
        await bestSellerSection.scrollIntoViewIfNeeded();
        await expect(bestSellerSection).toBeVisible();

        // 2. Pilih salah satu produk dari Produk Terlaris (produk pertama)
        const selectedProduct = page.locator('.list-product.terlaris .product-card').first();
        await expect(selectedProduct).toBeVisible({ timeout: 10000 });

        // 3. Ambil nama produk untuk validasi akhir
        const productName = await selectedProduct.locator('h1').first().textContent();

        // 4. Klik produk untuk masuk ke halaman detail
        await selectedProduct.click();
        await expect(page).toHaveURL(/detail|produk/i, { timeout: 10000 });

        // 5. Klik tombol Tambah Keranjang
        const addToCartButton = page.getByRole('button', { name: /Keranjang|Tambah/i });
        await expect(addToCartButton).toBeVisible({ timeout: 10000 });
        await addToCartButton.click();

        // 6. Handle jika muncul modal popup setelah produk ditambahkan ke keranjang
        try {
            const modal = page.locator('.modal-content');
            await modal.waitFor({ state: 'visible', timeout: 3000 });
            if (await modal.isVisible()) {
                const closeButton = modal.locator('button[aria-label="Close"], button.close, button:has-text("×"), button:has-text("Close")').first();
                await closeButton.click();
            }
        } catch (error) {
            // Jika modal tidak muncul, proses test akan tetap lanjut
        }

        // 7. Verifikasi toast/pesan sukses muncul
        const successToast = page.locator('text=/berhasil|ditambahkan ke keranjang/i');
        await expect(successToast).toBeVisible({ timeout: 15000 });

        // 8. Navigasi ke halaman keranjang untuk memastikan produk benar-benar masuk
        await page.goto('https://suparma.venturo.pro/keranjang');
        const cartProduct = page.locator('.cart-item, .product-cart');
        await expect(cartProduct).toContainText(productName || '', { timeout: 10000 });
    });

    test('User berhasil menambahkan produk dari Semua Produk ke keranjang', async ({ page }) => {
        // 1. Scroll ke section Semua Produk
        const allProductsSection = page.locator('h1:has-text("Semua Produk")');
        await allProductsSection.scrollIntoViewIfNeeded();
        await expect(allProductsSection).toBeVisible();

        // 2. Pilih salah satu produk dari Semua Produk (produk pertama)
        const selectedProduct = page.locator('a.product-card').first();
        await expect(selectedProduct).toBeVisible({ timeout: 10000 });

        // 3. Ambil nama produk untuk validasi akhir
        const productName = await selectedProduct.locator('h1').first().textContent();

        // 4. Klik produk untuk masuk ke halaman detail
        await selectedProduct.click();
        await expect(page).toHaveURL(/detail|produk/i, { timeout: 10000 });

        // 5. Klik tombol Tambah Keranjang
        const addToCartButton = page.getByRole('button', { name: /Keranjang|Tambah/i });
        await expect(addToCartButton).toBeVisible({ timeout: 10000 });
        await addToCartButton.click();

        // 6. Handle jika muncul modal popup setelah produk ditambahkan ke keranjang
        try {
            const modal = page.locator('.modal-content');
            await modal.waitFor({ state: 'visible', timeout: 3000 });
            if (await modal.isVisible()) {
                const closeButton = modal.locator('button[aria-label="Close"], button.close, button:has-text("×"), button:has-text("Close")').first();
                await closeButton.click();
            }
        } catch (error) {
            // Jika modal tidak muncul, proses test akan tetap lanjut
        }

        // 7. Verifikasi toast/pesan sukses muncul
        const successToast = page.locator('text=/berhasil|ditambahkan ke keranjang/i');
        await expect(successToast).toBeVisible({ timeout: 15000 });

        // 8. Navigasi ke halaman keranjang untuk memastikan produk benar-benar masuk
        await page.goto('https://suparma.venturo.pro/keranjang');
        const cartProduct = page.locator('.cart-item, .product-cart');
        await expect(cartProduct).toContainText(productName || '', { timeout: 10000 });
    });

});
