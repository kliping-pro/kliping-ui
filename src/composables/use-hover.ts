/**
 * Apakah penunjuk sedang berada di atas sebuah elemen.
 *
 * `mouseenter` dan `mouseleave`, bukan `mouseover` dan `mouseout` — dua yang
 * terakhir ikut menyala saat penunjuk berpindah antar anak di dalam elemen yang
 * sama, dan hasilnya berkedip. Sama seperti sumbernya.
 */
import { useBoolean } from '@/composables/use-boolean'
import { useEventListener } from '@/composables/use-event-listener'
import type { BasicTarget } from '@/lib/target'

export interface UseHoverOptions {
  /** Called when the pointer enters. */
  onEnter?: () => void
  /** Called when the pointer leaves. */
  onLeave?: () => void
  /** Called on enter and leave with the new state. */
  onChange?: (isHovering: boolean) => void
}

/**
 * @param target Element, ref, or getter to watch.
 * @param options Enter, leave, and change callbacks.
 * @returns Reactive `true` while the pointer is over the target.
 */
export function useHover(target: BasicTarget, options: UseHoverOptions = {}) {
  const { onEnter, onLeave, onChange } = options
  const { value, setTrue, setFalse } = useBoolean(false)

  useEventListener('mouseenter', () => {
    onEnter?.()
    setTrue()
    onChange?.(true)
  }, { target })

  useEventListener('mouseleave', () => {
    onLeave?.()
    setFalse()
    onChange?.(false)
  }, { target })

  return value
}
