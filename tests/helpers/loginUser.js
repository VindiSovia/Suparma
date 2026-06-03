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

  // Header login button
  const loginButton = page
    .getByRole('button', { name: /^Masuk$/ })
    .first();

  await expect(loginButton).toBeVisible();

  await loginButton.click();

  // Modal login
  const loginModal = page.getByRole('dialog');

  await expect(loginModal).toBeVisible();

  const emailInput = loginModal.getByPlaceholder('Email');
  const passwordInput = loginModal.getByPlaceholder('Kata Sandi');

  await emailInput.fill(email);
  await passwordInput.fill(password);

  // Klik tombol submit login
  await loginModal.getByRole('button', { name: /^Masuk$/ }).click();

  // Tunggu UI authenticated muncul
  await expect(
    page.getByText(/logout|akun|profile/i)
  ).toBeVisible({ timeout: 20000 });
}