/**
 * Apakah kode ini sedang berjalan di peramban.
 *
 * Dokumentasi Kliping dirender di server oleh VitePress. Satu sentuhan ke
 * `window` di tingkat modul membuat build gagal, bukan membuat halamannya
 * salah — jadi penjaganya harus berupa nilai yang bisa dibaca kapan saja,
 * termasuk saat modulnya baru dimuat.
 */
export const isBrowser = typeof window !== 'undefined'
