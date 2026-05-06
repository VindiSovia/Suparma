import { test, expect } from '@playwright/test';
import { loginAdmin } from '../helpers/loginAdmin';

test.describe('Admin Authentication', () => {
  test('Should successfully login as Admin and redirect to backoffice', async ({ page }) => {
    // TODO: Ganti dengan kredensial admin yang sebenarnya
    const adminEmail = 'admin@suparma.com';
    const adminPassword = 'Venturo2025*';

    // Menggunakan helper loginAdmin
    await loginAdmin(page, adminEmail, adminPassword);
    
    // Validasi tambahan bisa diletakkan di sini jika diperlukan
    // Halaman sudah divalidasi berada di /backoffice/home oleh helper
  });
});
