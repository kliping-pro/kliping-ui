/**
 * Salinan sebuah nilai yang tertinggal beberapa saat di belakangnya.
 *
 * Dipakai untuk memisahkan yang cepat dari yang mahal: kotak pencarian
 * memperbarui `query` di tiap ketukan, sementara permintaan jaringannya
 * mengikuti `debouncedQuery` yang cuma berubah setelah pengetikan berhenti.
 *
 * Sumbernya boleh berupa nilai biasa, `ref`, atau getter — dibaca lewat
 * `toValue()`, jadi ketiganya bekerja tanpa pembungkus.
 */
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { useDebounceFn } from '@/composables/use-debounce-fn'
import type { UseDebounceFnOptions } from '@/composables/use-debounce-fn'

/**
 * @param value Value, ref, or getter to follow.
 * @param wait Delay in milliseconds; may be reactive. Default: 1000.
 * @param options Leading and trailing edge behaviour.
 * @returns Reactive copy of `value` that updates after `wait` ms of quiet.
 */
export function useDebounce<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseDebounceFnOptions,
) {
  const debounced = ref(toValue(value)) as Ref<T>

  const { run, cancel } = useDebounceFn(
    (next: T) => {
      debounced.value = next
    },
    wait,
    options,
  )

  watch(() => toValue(value), next => run(next))

  // `watch` sudah berhenti sendiri bersama scope-nya, tapi timer yang sedang
  // menunggu tidak. Tanpa baris ini, satu penulisan ke `ref` yang sudah tidak
  // dipakai lagi tetap terjadi setelah komponennya hilang.
  if (getCurrentScope())
    onScopeDispose(cancel)

  return debounced
}
