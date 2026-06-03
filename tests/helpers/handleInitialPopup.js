export async function handleInitialPopup(page) {
  // 1. Handle Update Sistem
  const updateButton = page.locator('text=Perbarui Sistem');
  
  // Tunggu sebentar untuk memastikan jika tombol update muncul
  try {
    await updateButton.waitFor({ state: 'visible', timeout: 1000 });
    if (await updateButton.isVisible()) {
      await updateButton.click();
    }
  } catch (error) {
    // Tombol update tidak muncul dalam 3 detik, abaikan
  }

  // 2. Pilih Depo (HARDCODE: Jakarta)
  const modal = page.locator('.modal-content');
  await modal.waitFor({ state: 'visible' });

  const jakartaDepo = modal.locator('text=Jakarta');
  await jakartaDepo.click();

  // 3. Jika modal muncul lagi setelah klik Jakarta, klik close
  try {
    await modal.waitFor({ state: 'visible', timeout: 2000 });
    if (await modal.isVisible()) {
      const closeButton = modal.locator('button[aria-label="Close"], button.close, button:has-text("×"), button:has-text("Close")').first();
      await closeButton.click();
    }
  } catch (error) {
    // Modal tidak muncul lagi, lanjutkan
  }

} 
