import { test, expect } from '@playwright/test';
import { loginAdmin } from '../helpers/loginAdmin';

test.describe('Admin Authentication', () => {
  test('Should successfully login as Admin and redirect to backoffice', async ({ page }) => {
    // Menggunakan helper loginAdmin yang mengambil kredensial dari .env
    await loginAdmin(page);
    
    // Validasi tambahan bisa diletakkan di sini jika diperlukan
    // Halaman sudah divalidasi berada di /backoffice/home oleh helper
  });
});
