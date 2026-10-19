/**
 * State yang bisa dikembalikan ke nilai awalnya.
 *
 * **Pabrik nilai awalnya dipanggil ulang di tiap `reset`**, bukan sekali di awal.
 * Itu bagian terpenting dari composable ini.
 *
 * Di Vue, `state.value.nama = '...'` adalah pemakaian yang wajar — objek state
 * memang biasa diutak-atik di tempat. Kalau pabriknya cuma dipanggil sekali,
 * objek awalnya ikut termutasi, dan `reset` mengembalikan keadaan yang sudah
 * kotor: persis kebalikan dari yang diminta namanya.
 *
 * Nilai biasa yang bukan pabrik tetap disimpan apa adanya.
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * @param initialState Initial value, or a function returning it; `reset` restores it.
 */
export function useResetState<S>(initialState: S | (() => S)) {
  const createInitial = (): S =>
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState

  const state = ref(createInitial()) as Ref<S>

  return {
    /** Current state. Reactive. */
    state,
    /** Sets the state, or updates it from the current value. */
    set: (value: S | ((current: S) => S)) => {
      state.value = typeof value === 'function'
        ? (value as (current: S) => S)(state.value)
        : value
    },
    /** Restores the initial state. */
    reset: () => {
      state.value = createInitial()
    },
  }
}
