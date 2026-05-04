import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/suparma_user/auth.json' });

test('pilih kategori', async ({ page, context }) => {
   await page.goto('https://suparma.venturo.pro/katalog');

   //perbaharui sistem
  const updateButton = page.locator('text=Perbarui Sistem');

  if (await updateButton.isVisible()) {
    await updateButton.click();
  }

  // setelah pilih depo
  await page.waitForLoadState('networkidle');
  await page.locator('.product-card').first().waitFor();

  // pilih kategori
  await categories.nth(categoryIndex).click();

 // tunggu update lagi
  await page.waitForLoadState('networkidle');
  await page.locator('.product-card').first().waitFor();

  // baru ambil produk
  const products = page.locator('.product-card');

  await products.first().waitFor();

  const count = await products.count();
  const randomIndex = Math.floor(Math.random() * count);

  const selectedCategory = await products.nth(randomIndex).textContent();

  await products.nth(randomIndex).click();

  console.log('Kategori filter:', selectedCategory);

}
)