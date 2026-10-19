import type { ComputedRef, Ref } from 'vue'
import type { ItemPosition } from './layout'
import { createContext } from '@/lib/create-context'

export interface MasonryState {
  /** The position of each item, in registration order. */
  positions: ItemPosition[]
  /** Measured at least once, so the positions can be trusted. */
  ready: boolean
}

export interface MasonryContext {
  state: ComputedRef<MasonryState>
  register: (id: string) => number
  unregister: (id: string) => void
  measure: (id: string, height: number) => void
  /** The registered ids in order, used by items to look up their own position. */
  order: Ref<string[]>
}

export const [provideMasonryContext, injectMasonryContext, injectMasonryContextOptional] = createContext<MasonryContext>('Masonry')
