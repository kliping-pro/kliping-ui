/**
 * Jalankan sesuatu setelah komponennya terpasang — atau sekarang juga, kalau
 * memang tidak ada komponennya.
 *
 * `onMounted` di luar `setup()` tidak melakukan apa-apa dan mencetak peringatan.
 * Itu jadi soal karena composable dipanggil dari dua tempat: dari komponen, dan
 * dari `effectScope()` lepas — termasuk di dalam uji, di mana peringatan itu
 * membanjiri keluaran tanpa menandakan kesalahan apa pun.
 *
 * Yang dijaga tetap sama di kedua jalur: pekerjaannya tidak pernah berjalan di
 * server. Di dalam komponen itu dijamin `onMounted` sendiri; di luar komponen,
 * `isBrowser` yang menjaganya.
 */
import { getCurrentInstance, onMounted } from 'vue'
import { isBrowser } from '@/lib/is-browser'

/**
 * @param fn Runs on mount inside a component, or right away in the browser outside one.
 */
export function tryOnMounted(fn: () => void) {
  if (getCurrentInstance()) {
    onMounted(fn)
    return
  }

  if (isBrowser)
    fn()
}
