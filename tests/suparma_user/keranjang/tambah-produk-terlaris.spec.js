const { test, expect } = require('@playwright/test');
const { loginUser } = require('../../helpers/loginUser');

test.describe('Fitur Keranjang', () => {
    test('User berhasil menambahkan produk terlaris ke keranjang', async ({ page }) => {
        // Menggunakan helper login sesuai rule (untuk user)
        await loginUser(page);

        // 1. Scroll ke section Produk Populer/Terlaris
        const bestSellerSection = page.getByRole('heading', { name: /Produk (Populer|Terlaris)/i });
        await bestSellerSection.scrollIntoViewIfNeeded();
        await expect(bestSellerSection).toBeVisible();

        // 2. Pilih salah satu produk dari Produk Terlaris (produk pertama)
        const selectedProduct = page.getByRole('button', { name: /TOP 3/ }).first();
        await expect(selectedProduct).toBeVisible({ timeout: 10000 });

        // 3. Ambil nama produk untuk validasi akhir
        const productName = await selectedProduct.locator('h1').textContent();

        // 4. Klik produk untuk masuk ke halaman detail
        await selectedProduct.click();
        await expect(page).toHaveURL(/detail|produk/i, { timeout: 10000 });

        // 5. Klik tombol Tambah Keranjang
        const addToCartButton = page.getByRole('button', { name: 'Keranjang', exact: true });
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
        await expect(successToast).toBeVisible({ timeout: 90000 });

        // 8. Navigasi ke halaman keranjang untuk memastikan produk benar-benar masuk
        await page.goto('https://suparma.venturo.pro/keranjang');
        const cartProduct = page.locator('.cart-item, .product-cart');
        await expect(cartProduct).toContainText(productName || '', { timeout: 10000 });
    });
});
