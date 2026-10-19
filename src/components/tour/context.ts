import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export interface TourStep {
  /** Step identifier. */
  id: string
  // Kosong berarti langkah tanpa sasaran.
  /** CSS selector of the highlighted element. */
  target?: string
  title?: string
  description?: string
  /** Side of the card relative to the target. */
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

/** Target rectangle in page coordinates, not viewport coordinates. */
export interface TargetRect {
  top: number
  left: number
  width: number
  height: number
}

export interface TourState {
  steps: TourStep[]
  /** Zero-based index of the active step. */
  index: number
  current: TourStep | undefined
  open: boolean
  isFirst: boolean
  isLast: boolean
  rect: TargetRect | null
}

export interface TourContext {
  state: ComputedRef<TourState>
  start: (from?: number) => void
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  complete: () => void
  skip: () => void
  // Untuk mengukur lebar dan tingginya saat menempatkan.
  /** The step card element. */
  card: Ref<HTMLElement | undefined>
}

export const [provideTourContext, injectTourContext, injectTourContextOptional] = createContext<TourContext>('Tour')
