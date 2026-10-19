/**
 * Nilai sebelumnya dari sesuatu yang berubah.
 *
 * `flush: 'sync'` bukan pilihan gaya. Nilai sebelumnya paling sering dibaca dari
 * dalam `watch` lain yang memantau nilai yang sama, dan dengan flush bawaan
 * urutannya tidak dijamin — pembacanya bisa mendapat nilai yang sudah ikut
 * bergeser. Sinkron membuat "sebelumnya" benar-benar berarti sebelumnya.
 *
 * Panggilan pertama mengembalikan `undefined`, sama seperti sumbernya: belum ada
 * yang mendahului nilai awal.
 */
import { shallowRef, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export type PreviousComparator<T> = (previous: T | undefined, current: T) => boolean

const defaultShouldUpdate = <T>(previous: T | undefined, current: T) => !Object.is(previous, current)

/**
 * @param value Value to track. May be a ref or getter.
 * @param shouldUpdate Decides when the stored previous value moves; by default whenever the value changes (`Object.is`).
 * @returns Value before the latest change; `undefined` at first. Reactive.
 */
export function usePrevious<T>(
  value: MaybeRefOrGetter<T>,
  shouldUpdate: PreviousComparator<T> = defaultShouldUpdate,
) {
  const previousValue = shallowRef<T | undefined>(undefined)
  let current = toValue(value)

  watch(
    () => toValue(value),
    (next) => {
      if (!shouldUpdate(current, next))
        return
      previousValue.value = current
      current = next
    },
    { flush: 'sync' },
  )

  return previousValue
}
