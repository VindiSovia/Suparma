import { test, expect } from '@playwright/test';

test('login', async ({ page, context }) => {
  await page.goto('https://suparma.venturo.pro/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PT Suparma Tbk/);

  //perbaharui sistem
  const updateButton = page.locator('text=Perbarui Sistem');

  if (await updateButton.isVisible()) {
    await updateButton.click();
  }
  
  // pilih depo
  const modal = page.locator('.modal-content');
  await modal.waitFor();

  const depos = modal.locator('.depo-shadow:not(.selected-depo-modal)');
  await depos.first().waitFor();

  const depoCount = await depos.count();

  if (depoCount === 0) {
    throw new Error('Tidak ada depo tersedia');
  }

  const depoIndex = Math.floor(Math.random() * depoCount);

  const selectedDepo = await depos.nth(depoIndex).textContent();
  await depos.nth(depoIndex).click();

  console.log('Depo terpilih:', selectedDepo);

//login
  await page.getByRole('button', { name: 'Masuk' }).click();


  await page.getByPlaceholder('Email', { exact: true }).fill('xoxoline19@gmail.com');
  await page.getByPlaceholder('Kata Sandi').fill('Venturo2025*');
  await page.getByRole('button', { name: 'Masuk' }).click();

  // simpan session
  await context.storageState({ path: 'tests/suparma_user/auth.json' });


//   // pilih kategori
//   const categories = page.locator('.category-card');
//   await categories.first().waitFor();

//   const categoryCount = await categories.count();
//   const categoryIndex = Math.floor(Math.random() * categoryCount);

//   const selectedCategory = await categories.nth(categoryIndex).textContent();
//   await categories.nth(categoryIndex).click();

//   console.log('Kategori terpilih:', selectedCategory);

//   //pilih produk
//   const products = page.locator('.product-item'); // sesuaikan class
//   await products.first().waitFor();

//   const productCount = await products.count();

//   if (productCount === 0) {
//     throw new Error('Tidak ada produk tersedia');
//   }

//   const productIndex = Math.floor(Math.random() * productCount);

//   const selectedProduct = await products.nth(productIndex).textContent();
//   await products.nth(productIndex).click();

//   console.log('Produk terpilih:', selectedProduct);

}
);

// test('kategori', async ({ page }) => {
//   await page.goto('https://suparma.venturo.pro/');

//   const categories = page.locator('.category-card');
  
//   const count = await categories.count();
//   const randomIndex = Math.floor(Math.random() * count);

//   await categories.nth(randomIndex).click();
// }
// );
// test('get started link', async ({ page }) => {
//   await page.goto('https://suparma.venturo.pro/');

//   // Click the get started link.
//   // await page.getByRole('link', { name: 'Masuk' }).click();
  
  
//   if (await updateButton.isVisible()) {
//   await updateButton.click();
// }
// }
// );

// test('Pilih depo', async ({page}) => {
//   const depos = page.locator('text=Jakarta, Surabaya, Bandung, Bali, Jember, Malang');
// }

//   // // Expects page to have a heading with the name of Installation.
//   // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

// );