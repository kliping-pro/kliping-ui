/**
 * Membalik sebuah nilai bolak-balik antara dua kemungkinan.
 *
 * Isinya sengaja setipis mungkin: sebuah `ref` dan empat fungsi biasa. `setup()`
 * berjalan sekali, jadi keduanya sudah stabil dengan sendirinya — tidak ada yang
 * perlu dibungkus atau dijaga identitasnya.
 *
 * Nilai kiri dan kanannya dikunci sekali saat composable ini dipanggil. Yang
 * bolak-balik adalah nilainya, bukan batas-batasnya.
 */
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

/**
 * @param defaultValue Initial value, and the left value. Default: `false`.
 * @param reverseValue The right value; defaults to the opposite of `defaultValue`.
 */
export function useToggle<D = boolean, R = boolean>(
  defaultValue: MaybeRefOrGetter<D> = false as D,
  reverseValue?: MaybeRefOrGetter<R>,
) {
  const left = toValue(defaultValue) as D
  const right = (
    reverseValue === undefined ? !left : toValue(reverseValue)
  ) as R

  const value = ref(left) as Ref<D | R>

  const set = (next: D | R) => {
    value.value = next
  }

  // `Object.is`, bukan `===`. Bedanya cuma terasa di `NaN` dan `-0`, tapi
  // keduanya nilai yang sah untuk dibolak-balik, dan `===` diam-diam membuat
  // toggle berhenti bekerja di sana.
  const toggle = () => {
    value.value = Object.is(value.value, left) ? right : left
  }

  return {
    /** Current value. Reactive. */
    value,
    /** Switches between the two values. */
    toggle,
    /** Sets either value. */
    set,
    /** Sets the left (default) value. */
    setLeft: () => set(left),
    /** Sets the right (reverse) value. */
    setRight: () => set(right),
  }
}
