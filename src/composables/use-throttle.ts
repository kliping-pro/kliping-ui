/**
 * Salinan sebuah nilai yang diperbarui paling sering sekali per jeda.
 *
 * Pasangan `useDebounce`, untuk kasus sebaliknya: nilai yang berubah terus
 * menerus dan tidak akan pernah "berhenti" — posisi pointer, jarak scroll,
 * ukuran jendela. Debounce di sana tidak pernah memicu apa pun sampai
 * gerakannya berhenti; throttle tetap memberi kabar sepanjang jalan.
 */
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { useThrottleFn } from '@/composables/use-throttle-fn'
import type { UseThrottleFnOptions } from '@/composables/use-throttle-fn'

/**
 * @param value Value to follow. May be a ref or getter.
 * @param wait Minimum milliseconds between updates. May be reactive.
 * @param options Leading and trailing edge settings.
 * @returns Copy of `value` updated at most once per `wait`. Reactive.
 */
export function useThrottle<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseThrottleFnOptions,
) {
  const throttled = ref(toValue(value)) as Ref<T>

  const { run, cancel } = useThrottleFn(
    (next: T) => {
      throttled.value = next
    },
    wait,
    options,
  )

  watch(() => toValue(value), next => run(next))

  if (getCurrentScope())
    onScopeDispose(cancel)

  return throttled
}
