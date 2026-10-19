import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type MarqueeSide = 'left' | 'right' | 'top' | 'bottom'
export type MarqueeOrientation = 'horizontal' | 'vertical'
export type MarqueeDirection = 'ltr' | 'rtl'

export interface MarqueeState {
  side: MarqueeSide
  orientation: MarqueeOrientation
  dir: MarqueeDirection
  autoFill: boolean
  pauseOnHover: boolean
  reverse: boolean
  /** The width (or height) of the outer container, measured directly. */
  rootSize: number
}

export interface MarqueeContext {
  state: ComputedRef<MarqueeState>
  /** Set by `MarqueeContent` so the root can compute the duration. */
  contentSize: Ref<number>
}

export const [provideMarqueeContext, injectMarqueeContext, injectMarqueeContextOptional]
  = createContext<MarqueeContext>('Marquee')
