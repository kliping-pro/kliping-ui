/**
 * Apakah halamannya sudah dihidrasi di peramban.
 *
 * Ini salah satu dari sedikit composable "lifecycle" yang **tetap perlu ada di
 * Vue**, tidak seperti `useMount` atau `useUpdateEffect` yang cuma menamai ulang
 * sesuatu yang sudah bawaan. Sebabnya nyata: dokumentasi Kliping dirender di
 * server, dan HTML yang dihasilkan harus sama persis dengan gambaran pertama di
 * peramban. Menggambar sesuatu yang cuma bisa diketahui di peramban — lebar
 * layar, isi `localStorage`, waktu setempat — membuat keduanya berbeda, dan Vue
 * membuang lalu menggambar ulang bagiannya.
 *
 * Polanya:
 *
 * ```vue
 * <button :disabled="!terhidrasi">Salin</button>
 * ```
 *
 * `onMounted` tidak pernah berjalan di server, jadi nilainya `false` saat
 * dirender di sana dan `false` juga pada gambaran pertama di peramban. Itulah
 * yang membuat keduanya cocok.
 */
import { readonly, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

/**
 * @returns Whether the app has hydrated on the client (`false` during SSR). Reactive, read-only.
 */
export function useIsHydrated() {
  const isHydrated = ref(false)

  tryOnMounted(() => {
    isHydrated.value = true
  })

  return readonly(isHydrated)
}
