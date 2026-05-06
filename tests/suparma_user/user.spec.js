import { test, expect } from '@playwright/test';
import { loginUser } from '../helpers/loginUser';

test.describe('User Authentication', () => {
  test('Should successfully login as User and show profile', async ({ page }) => {
    // TODO: Ganti dengan kredensial user yang sebenarnya
    const userEmail = 'user@example.com';
    const userPassword = 'passwordUser123';

    // Menggunakan helper loginUser
    // Validasi hilangnya tombol Masuk/Daftar dan munculnya profil sudah ada di dalam helper
    await loginUser(page, userEmail, userPassword);
    
    // Lanjutkan dengan flow user lainnya di sini
  });
});
