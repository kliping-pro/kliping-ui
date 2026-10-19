/**
 * Posisi penunjuk, dengan dukungan sentuh.
 *
 * `type` menentukan sistem koordinat yang dipakai, dan pilihannya berpengaruh:
 *
 * - `page` — relatif terhadap dokumen, ikut bergeser saat halaman digulung
 * - `client` — relatif terhadap jendela, tidak terpengaruh gulungan
 * - `screen` — relatif terhadap layar fisik
 * - `movement` — selisih dari peristiwa sebelumnya, untuk pointer lock
 *
 * `sourceType` menyebut dari mana angkanya datang. Itu yang membedakan
 * "penunjuk di pojok kiri atas" dari "belum ada penunjuk sama sekali", yang
 * kalau tidak dibedakan akan membuat efek ikut-kursor melompat ke sudut saat
 * halaman baru dibuka.
 */
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { useEventListener } from '@/composables/use-event-listener'

export type CoordinateType = 'page' | 'client' | 'screen' | 'movement'
export type PointerSource = 'mouse' | 'touch' | null

export interface UseMouseOptions {
  /** Coordinate system. Default: `page`. */
  type?: CoordinateType
  /** Track touch events. Default: true. */
  touch?: MaybeRefOrGetter<boolean>
  /** Reset to the initial value when the touch ends. Default: false. */
  resetOnTouchEnds?: boolean
  /** Position before the first event, and after a touch ends when `resetOnTouchEnds`. Default: `{ x: 0, y: 0 }`. */
  initialValue?: { x: number, y: number }
}

const X_KEYS = { page: 'pageX', client: 'clientX', screen: 'screenX', movement: 'movementX' } as const
const Y_KEYS = { page: 'pageY', client: 'clientY', screen: 'screenY', movement: 'movementY' } as const

/**
 * @param options Tracking settings.
 */
export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
  } = options

  const x = ref(initialValue.x)
  const y = ref(initialValue.y)
  const sourceType = ref<PointerSource>(null)

  const fromMouse = (event: MouseEvent) => {
    x.value = event[X_KEYS[type]]
    y.value = event[Y_KEYS[type]]
    sourceType.value = 'mouse'
  }

  const fromTouch = (event: TouchEvent) => {
    const point = event.touches[0] ?? event.changedTouches[0]
    if (!point)
      return

    // Sentuhan tidak punya `movementX`/`movementY`. Yang paling mendekati
    // maksudnya adalah koordinat jendela, jadi itu yang dipakai.
    if (type === 'movement') {
      x.value = point.clientX
      y.value = point.clientY
    }
    else {
      x.value = point[X_KEYS[type] as 'pageX' | 'clientX' | 'screenX']
      y.value = point[Y_KEYS[type] as 'pageY' | 'clientY' | 'screenY']
    }

    sourceType.value = 'touch'
  }

  const touchEnabled = () => toValue(touch)

  useEventListener('mousemove', fromMouse, { passive: true })
  useEventListener('dragover', fromMouse, { passive: true })

  useEventListener('touchstart', fromTouch, { passive: true, enable: touchEnabled })
  useEventListener('touchmove', fromTouch, { passive: true, enable: touchEnabled })
  useEventListener('touchend', (event: TouchEvent) => {
    if (resetOnTouchEnds) {
      x.value = initialValue.x
      y.value = initialValue.y
      return
    }
    fromTouch(event)
  }, { passive: true, enable: touchEnabled })

  return {
    /** Horizontal position, in pixels, for the chosen `type`. Reactive. */
    x,
    /** Vertical position, in pixels, for the chosen `type`. Reactive. */
    y,
    /** Input that produced the last position: `mouse`, `touch`, or `null`. Reactive. */
    sourceType,
  }
}
