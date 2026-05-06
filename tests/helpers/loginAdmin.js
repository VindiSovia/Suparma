import { expect } from '@playwright/test';
import { handleInitialPopup } from './handleInitialPopup';

export async function loginAdmin(page) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
  }
  await page.goto('https://suparma.venturo.pro/');
  
  await handleInitialPopup(page);

  // Asumsi untuk masuk ke halaman login
  // Sesuaikan locator jika diperlukan (misal ke url /login khusus admin)
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

  // Validasi URL berubah ke /backoffice/home
  await page.waitForURL('**/backoffice/home');
  await expect(page).toHaveURL(/.*\/backoffice\/home/);
}
