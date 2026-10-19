/**
 * Satu nilai yang bisa dikendalikan dari luar, atau mengurus dirinya sendiri.
 *
 * Untuk `v-model` biasa, **jangan pakai ini** — `defineModel()` bawaan Vue 3.4+
 * sudah menyelesaikannya dengan lebih sedikit kode. Composable ini untuk pola
 * yang tidak tercakup `defineModel`: pasangan prop seperti
 * `open` / `defaultOpen` / `onUpdate:open`, yaitu komponen yang harus bekerja
 * baik saat induknya ikut mengatur maupun saat dibiarkan sendiri.
 *
 * Penanda "terkendali" di sini adalah `!== undefined`, **bukan** memeriksa ada
 * tidaknya kunci. Objek `props` Vue selalu memuat semua kunci yang dideklarasikan,
 * dan yang tidak dikirim bernilai `undefined` — memeriksa keberadaan kuncinya akan
 * membuat setiap komponen dikira terkendali, dan tidak ada satu pun yang bisa
 * mengurus nilainya sendiri.
 *
 * Penandanya reaktif, jadi komponen yang berpindah dari tak terkendali jadi
 * terkendali di tengah jalan ikut terlayani.
 */
import { computed, ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface UseControllableValueOptions<T> {
  /** Used when neither the value prop nor the default-value prop is passed. */
  defaultValue?: T
  /** Name of the default-value prop. Default: `defaultValue`. */
  defaultValuePropName?: string
  /** Name of the controlled-value prop. Default: `value`. */
  valuePropName?: string
  /** Name of the change-notification prop. Default: `onChange`. */
  trigger?: string
}

/**
 * @param props The component's props, or a getter for them.
 * @param options Prop names to read and call, and the fallback value.
 */
export function useControllableValue<T = any>(
  props: MaybeRefOrGetter<Record<string, any>>,
  options: UseControllableValueOptions<T> = {},
) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options

  const readProps = () => toValue(props) ?? {}

  const isControlled = computed(() => readProps()[valuePropName] !== undefined)

  const initialValue = (): T => {
    const p = readProps()
    if (p[valuePropName] !== undefined)
      return p[valuePropName]
    if (p[defaultValuePropName] !== undefined)
      return p[defaultValuePropName]
    return defaultValue as T
  }

  const inner = ref(initialValue()) as { value: T }

  const state = computed<T>(() =>
    isControlled.value ? readProps()[valuePropName] : inner.value,
  )

  const setState = (value: T | ((current: T) => T), ...rest: any[]) => {
    const next = typeof value === 'function'
      ? (value as (current: T) => T)(state.value)
      : value

    // Saat terkendali, yang berhak mengubah nilainya adalah induknya. Yang
    // dilakukan di sini cuma memberi kabar; menulis ke state sendiri akan
    // membuat tampilannya menyimpang dari sumber kebenarannya.
    if (!isControlled.value)
      inner.value = next

    readProps()[trigger]?.(next, ...rest)
  }

  return {
    /** The parent's value when controlled, otherwise the inner value. Reactive. */
    state,
    /** Sets the value (or an updater function) and calls the `trigger` prop with it. */
    setState,
  }
}
