/**
 * Apakah peramban merasa sedang tersambung.
 *
 * Perlu disebut supaya tidak dipercaya berlebihan: `navigator.onLine` cuma tahu
 * ada tidaknya sambungan jaringan, bukan ada tidaknya internet. Wi-Fi yang
 * tersambung ke router mati tetap dilaporkan `true`. Untuk keperluan yang
 * sungguh-sungguh, satu permintaan kecil ke server sendiri lebih bisa dipercaya
 * daripada nilai ini.
 *
 * Bernilai `true` saat dirender di server: menganggap orang tersambung sampai
 * terbukti sebaliknya lebih baik daripada mengedipkan pesan "Anda offline" pada
 * setiap pemuatan halaman pertama.
 */
import { readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

/**
 * @returns Whether the browser is online. Reactive, read-only.
 */
export function useIsOnline() {
  const isOnline = ref(true)

  const update = () => {
    if (isBrowser)
      isOnline.value = navigator.onLine
  }

  tryOnMounted(update)
  useEventListener(['online', 'offline'], update)

  return readonly(isOnline)
}
