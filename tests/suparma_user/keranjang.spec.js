import { test, expect } from '@playwright/test';
import { loginUser } from '../helpers/loginUser';

test.describe('Keranjang Belanja', () => {
    test('Menambahkan produk ke keranjang', async ({ page }) => {
        await loginUser(page);

        // // 1. Scroll ke section Produk Populer/Terlaris
        // const bestSellerSection = page.getByRole('heading', { name: /Produk (Populer|Terlaris)/i });
        // await bestSellerSection.scrollIntoViewIfNeeded();
        // await expect(bestSellerSection).toBeVisible();

        // // 2. Pilih produk dari Produk Terlaris (produk pertama)
        // const selectedProduct = page.getByRole('button', { name: /TOP 3/ }).first();
        // await expect(selectedProduct).toBeVisible({ timeout: 10000 });

        // // 3. Ambil nama produk dari heading h1 di dalam button
        // const productName = await selectedProduct.locator('h1').textContent();
        // console.log('Produk dipilih:', productName);

        // // 4. Klik produk untuk masuk ke halaman detail
        // await selectedProduct.click();
        // await expect(page).toHaveURL(/detail|produk/i, { timeout: 10000 });

        // // 5. Klik tombol Tambah Keranjang
        // const addToCartButton = page.getByRole('button', { name: /tambah.*keranjang/i });
        // await expect(addToCartButton).toBeVisible({ timeout: 10000 });
        // await addToCartButton.click();

        // // 6. Jika modal muncul kembali setelah produk ditambahkan, tutup modal tersebut
        // try {
        //     const modal = page.locator('.modal-content');
        //     await modal.waitFor({ state: 'visible', timeout: 3000 });
        //     if (await modal.isVisible()) {
        //         const closeButton = modal.locator('button[aria-label="Close"], button.close, button:has-text("×"), button:has-text("Close")').first();
        //         await closeButton.click();
        //     }
        // } catch (error) {
        //     // Modal tidak muncul, lanjutkan
        // }

        // // 7. Verifikasi toast sukses
        // const successToast = page.locator('text=/berhasil|ditambahkan ke keranjang/i');
        // await expect(successToast).toBeVisible({ timeout: 10000 });

        // // 7. Navigasi ke halaman keranjang dan verifikasi produk ada
        // await page.goto('https://suparma.venturo.pro/keranjang');
        // const cartProduct = page.locator('.cart-item, .product-cart');
        // await expect(cartProduct).toContainText(productName || '', { timeout: 10000 });
    });


    test('Update jumlah produk di keranjang', async ({ page }) => {

    });


    test('Menghapus produk dari keranjang', async ({ page }) => {

    });

    test('Membuat pesanan dari keranjang', async ({ page }) => {

    });

    test('Memastikan halaman keranjang memuat data yang benar', async ({ page }) => {

    });

}); 