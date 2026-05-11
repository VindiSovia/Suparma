import { expect } from '@playwright/test';
import { handleInitialPopup } from './handleInitialPopup';

export async function loginUser(page) {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set in .env');
  }
  await page.goto('https://suparma.venturo.pro/');

  await handleInitialPopup(page);

  // Klik tombol masuk
  const loginButton = page.locator('text=Masuk');
  await loginButton.click();

  // Scope locator ke dalam modal dialog agar spesifik (Playwright best practice)
  const loginModal = page.getByRole('dialog');
  const emailInput = loginModal.getByPlaceholder('Email', { exact: true });
  const passwordInput = loginModal.getByPlaceholder('Kata Sandi');
  const submitButton = loginModal.getByRole('button', { name: 'Masuk', exact: true });

  await emailInput.fill(email);
  await passwordInput.fill(password);
  await submitButton.click();

  // Tunggu beberapa saat agar proses login dan redirect selesai
  await page.waitForLoadState('networkidle');

  // Validasi
  // 1. Tetap di halaman https://suparma.venturo.pro/
  await expect(page).toHaveURL('https://suparma.venturo.pro/');

  // 2. Tombol Masuk dan Daftar hilang
  const masukButton = page.locator('text=Masuk');
  const daftarButton = page.locator('text=Daftar');
  await expect(masukButton).toBeHidden();
  await page.waitForTimeout(5000);
  await expect(daftarButton).toBeHidden();
  await page.waitForTimeout(5000);

  // 3. Elemen profil user muncul
  // Asumsi locator untuk profil user, silahkan disesuaikan dengan elemen asli di web
  const userProfile = page.locator('#tombol-profile');
  await expect(userProfile).toBeAttached();

} 
