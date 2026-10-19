import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type TimelineDirection = 'ltr' | 'rtl'
export type TimelineOrientation = 'vertical' | 'horizontal'
export type TimelineVariant = 'default' | 'alternate'
export type TimelineStatus = 'completed' | 'active' | 'pending'

export interface TimelineState {
  dir: TimelineDirection
  orientation: TimelineOrientation
  variant: TimelineVariant
  /** The step in progress; when empty, every step is `pending`. */
  activeIndex?: number
}

export interface RegisteredItem {
  id: string
  // Pengambil elemennya, bukan ref-nya.
  //
  // `ref()` membuka bungkus ref yang bersarang di dalamnya, jadi menyimpan
  // `Ref<HTMLElement>` di dalam array reaktif menghasilkan `HTMLElement`
  // biasa — yang nilainya terkunci pada saat pendaftaran dan tidak pernah
  // ikut berubah. Fungsi tidak dibuka bungkusnya.
  /** A getter for the element rather than a ref, so it stays live inside reactive arrays. */
  getElement: () => HTMLElement | undefined
}

export interface ItemRegistry {
  /** The registered items, in registration order. */
  items: Ref<RegisteredItem[]>
  register: (id: string, getElement: () => HTMLElement | undefined) => void
  unregister: (id: string) => void
  /** An item's index by its position in the document, not its registration order. */
  getIndex: (id: string) => number
}

export interface TimelineContext {
  state: ComputedRef<TimelineState>
  registry: ItemRegistry
}

export const [provideTimelineContext, injectTimelineContext, injectTimelineContextOptional] = createContext<TimelineContext>('Timeline')

export interface TimelineItemContext {
  id: string
  status: TimelineStatus
  /** In the alternate variant, odd items fall on the opposite side. */
  isAlternateRight: boolean
}

export const [provideTimelineItemContext, injectTimelineItemContext, injectTimelineItemContextOptional] = createContext<ComputedRef<TimelineItemContext>>('TimelineItem')

/** An item's status, derived from its index relative to the active step. */
export function getItemStatus(index: number, activeIndex?: number): TimelineStatus {
  if (activeIndex === undefined) return 'pending'
  if (index < activeIndex) return 'completed'
  if (index === activeIndex) return 'active'
  return 'pending'
}
