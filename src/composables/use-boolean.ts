/**
 * Membalik nilai boolean, dengan nama aksi yang menyebut maksudnya.
 *
 * Tipis di atas `useToggle`. Gunanya bukan menambah kemampuan, melainkan
 * membuat pemanggilnya terbaca: `setFalse()` di tempat pemakaian lebih jelas
 * daripada `setLeft()`, dan lebih jelas daripada `set(false)` yang tidak
 * memberi tahu apa pun soal niatnya.
 */
import { useToggle } from '@/composables/use-toggle'

/**
 * @param defaultValue Initial value. Default: false.
 */
export function useBoolean(defaultValue = false) {
  const { value, set, toggle } = useToggle<boolean, boolean>(
    defaultValue,
    !defaultValue,
  )

  return {
    /** The current value. Reactive. */
    value,
    /** Sets the value. */
    set,
    /** Sets the value to `true`. */
    setTrue: () => set(true),
    /** Sets the value to `false`. */
    setFalse: () => set(false),
    /** Flips the value. */
    toggle,
  }
}
