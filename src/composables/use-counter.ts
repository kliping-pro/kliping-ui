/**
 * Pencacah dengan aksi yang menyebut maksudnya.
 *
 * Sebuah `ref` dan empat fungsi biasa — tidak lebih.
 *
 * Sengaja tanpa `min`/`max`. Pembatasan yang dibutuhkan hampir selalu punya
 * aturannya sendiri: ada yang menjepit, ada yang berputar, ada yang menolak. Satu
 * pasang opsi tidak pernah cukup untuk ketiganya, dan menuliskannya di tempat
 * pemakaian jauh lebih jelas daripada menebak-nebak di sini.
 */
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * @param initialValue Starting count; read once. Default: 0.
 */
export function useCounter(initialValue: MaybeRefOrGetter<number> = 0) {
  const initial = toValue(initialValue)
  const count = ref(initial)

  const set = (value: number | ((current: number) => number)) => {
    count.value = typeof value === 'function' ? value(count.value) : value
  }

  return {
    /** The current count. Reactive. */
    count,
    /** Sets the count, or updates it from the current one. */
    set,
    /** Adds 1. */
    inc: () => { count.value += 1 },
    /** Subtracts 1. */
    dec: () => { count.value -= 1 },
    /** Restores the initial count. */
    reset: () => { count.value = initial },
  }
}
