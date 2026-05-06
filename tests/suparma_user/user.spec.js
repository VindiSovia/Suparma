import { test, expect } from '@playwright/test';
import { loginUser } from '../helpers/loginUser';

test.describe('User Authentication', () => {
  test('Should successfully login as User and show profile', async ({ page }) => {
    // Menggunakan helper loginUser yang mengambil kredensial dari .env
    // Validasi hilangnya tombol Masuk/Daftar dan munculnya profil sudah ada di dalam helper
    await loginUser(page);
    
    // Lanjutkan dengan flow user lainnya di sini
  });
});
