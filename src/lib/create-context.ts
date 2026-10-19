import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

// Membuat sepasang penyedia dan pembaca context untuk satu komponen majemuk.
//
// Ini pengganti pola yang lazim dipakai primitif majemuk di React:
// `createContext` ditambah sebuah store luar yang dilanggan tiap bagian lewat
// `useSyncExternalStore` dengan selektornya masing-masing. Store itu ada di
// sana untuk satu alasan — supaya bagian yang tidak memakai sebuah nilai tidak
// ikut render ulang saat nilai itu berubah.
//
// Vue tidak memerlukannya. Reaktivitasnya sudah melacak ketergantungan per
// nilai, jadi bagian yang cuma membaca `state` tidak ikut diperbarui saat
// `percentage` berganti — tanpa store, tanpa selektor, tanpa langganan. Yang
// tersisa `provide`/`inject` biasa, dan itu sebabnya berkas ini pendek
// sementara padanannya di sumber panjang.
//
// Yang tetap dipertahankan satu hal: galat yang menyebut nama. Bagian yang
// dipakai di luar induknya harus mengeluh dengan kalimat yang menyebut
// keduanya, bukan `undefined is not an object` di baris entah di mana.
/**
 * Creates a provider and injectors for a compound component's context.
 * @param rootName Name of the root component, used in the error when a part is outside it.
 * @returns `[provide, inject, injectOptional]`: inject throws outside the root, injectOptional returns `null`.
 */
export function createContext<T>(rootName: string) {
  const key = Symbol(rootName) as InjectionKey<T>

  function provideContext(value: T) {
    provide(key, value)
  }

  function injectContext(consumerName: string): T {
    const value = injectOptional()
    if (value === null)
      throw new Error(`\`${consumerName}\` must be used within \`${rootName}\`.`)
    return value
  }

  // Pembaca yang boleh tidak menemukan apa-apa.
  //
  // Ada untuk komponen yang sah dipakai di dalam maupun di luar induknya —
  // `Banner` berperilaku berbeda tergantung ada tidaknya antrean di atasnya,
  // dan bagi komponen seperti itu ketiadaan context bukan kesalahan.
  /** Injects the context, returning `null` when there is no provider above. */
  function injectOptional(): T | null {
    return inject(key, null)
  }

  return [provideContext, injectContext, injectOptional] as const
}
